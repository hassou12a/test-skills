/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { defaultContent } from '../data/defaultContent';

const STORAGE_KEY = 'portal-content-v1';

function readContent() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return structuredClone(defaultContent);
  }

  try {
    return JSON.parse(raw);
  } catch {
    return structuredClone(defaultContent);
  }
}

const PortalContext = createContext(null);

export function PortalProvider({ children }) {
  const [content, setContent] = useState(readContent);

  const persist = (next) => {
    setContent(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const updateProfile = (profilePatch) => {
    const next = {
      ...content,
      profile: {
        ...content.profile,
        ...profilePatch,
      },
    };

    persist(next);
  };

  const addResource = (domainId, category, resource) => {
    const next = {
      ...content,
      domains: content.domains.map((domain) => {
        if (domain.id !== domainId) {
          return domain;
        }

        return {
          ...domain,
          resources: {
            ...domain.resources,
            [category]: [...domain.resources[category], resource],
          },
        };
      }),
    };

    persist(next);
  };

  const addUsefulResource = (resource) => {
    const next = {
      ...content,
      usefulResources: [resource, ...content.usefulResources],
    };
    persist(next);
  };

  const value = {
    content,
    updateProfile,
    addResource,
    addUsefulResource,
  };

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used inside PortalProvider');
  }
  return context;
}
