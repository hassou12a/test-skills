import { useState } from 'react';
import { useSite } from '../context/SiteContext';

const categories = ['lessons', 'books', 'files', 'videos'];
const types = ['pdf', 'video', 'link', 'file'];

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const { t, content, addDomainResource, addUsefulResource, updateProfile, deleteDomainResource, deleteUsefulResource } = useSite();
  const [file, setFile] = useState(null);
  const [resource, setResource] = useState({ domainId: content.domains[0]?.id || '', category: 'lessons', type: 'link', title: '', description: '', url: '' });
  const [useful, setUseful] = useState({ name: '', category: '', url: '' });
  const [profile, setProfile] = useState({ email: content.profile.email, phone: content.profile.phone });

  const submitResource = async (e) => {
    e.preventDefault();
    let finalUrl = resource.url;
    if (file) finalUrl = await fileToDataUrl(file);

    addDomainResource(resource.domainId, resource.category, {
      id: `res-${Date.now()}`,
      title: resource.title,
      description: resource.description,
      type: resource.type,
      url: finalUrl,
    });

    setResource((p) => ({ ...p, title: '', description: '', url: '' }));
    setFile(null);
  };

  const submitUseful = (e) => {
    e.preventDefault();
    addUsefulResource({ id: `use-${Date.now()}`, ...useful });
    setUseful({ name: '', category: '', url: '' });
  };

const submitProfile = (e) => {
    e.preventDefault();
    updateProfile({ email: profile.email, phone: profile.phone });
  };

  const handleDeleteResource = (domainId, category, resourceId) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      deleteDomainResource(domainId, category, resourceId);
    }
  };

  const handleDeleteUseful = (resourceId) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      deleteUsefulResource(resourceId);
    }
  };

  return (
    <main className="domain-page">
      <div className="glass-card domain-page-header" style={{ flexDirection: 'column', gap: '1rem' }}>
        <h1>{t.adminTitle}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>{t.adminDesc}</p>
      </div>

      <div className="contact-grid">
        <form className="glass-card contact-form" onSubmit={submitProfile}>
          <h3>{t.saveProfile}</h3>
          <input className="form-input" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} placeholder="Email" required />
          <input className="form-input" value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} placeholder="Phone" required />
          <button className="btn-primary">{t.saveProfile}</button>
        </form>

        <form className="glass-card contact-form" onSubmit={submitUseful}>
          <h3>{t.addUseful}</h3>
          <input className="form-input" value={useful.name} onChange={(e) => setUseful((p) => ({ ...p, name: e.target.value }))} placeholder="Name" required />
          <input className="form-input" value={useful.category} onChange={(e) => setUseful((p) => ({ ...p, category: e.target.value }))} placeholder={t.category} required />
          <input className="form-input" value={useful.url} onChange={(e) => setUseful((p) => ({ ...p, url: e.target.value }))} placeholder="https://..." required />
          <button className="btn-primary">{t.addUseful}</button>
        </form>
      </div>

      <form className="glass-card contact-form" onSubmit={submitResource} style={{ marginTop: '1.5rem' }}>
        <h3>{t.addResource}</h3>
        <select className="form-input" value={resource.domainId} onChange={(e) => setResource((p) => ({ ...p, domainId: e.target.value }))}>
          {content.domains.map((d) => <option key={d.id} value={d.id}>{d.title.ar}</option>)}
        </select>
        <select className="form-input" value={resource.category} onChange={(e) => setResource((p) => ({ ...p, category: e.target.value }))}>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="form-input" value={resource.type} onChange={(e) => setResource((p) => ({ ...p, type: e.target.value }))}>
          {types.map((tp) => <option key={tp} value={tp}>{tp}</option>)}
        </select>
        <input className="form-input" value={resource.title} onChange={(e) => setResource((p) => ({ ...p, title: e.target.value }))} placeholder={t.title} required />
        <textarea className="form-textarea" value={resource.description} onChange={(e) => setResource((p) => ({ ...p, description: e.target.value }))} placeholder={t.description} required />
        <input className="form-input" value={resource.url} onChange={(e) => setResource((p) => ({ ...p, url: e.target.value }))} placeholder="https://..." />
        <input className="form-input" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
<button className="btn-primary">{t.addResource}</button>
      </form>

      <div className="glass-card" style={{ marginTop: '2rem' }}>
        <h3>Existing Resources</h3>
        {content.domains.map((domain) => (
          <div key={domain.id} style={{ marginTop: '1rem' }}>
            <h4 style={{ color: 'var(--accent)' }}>{domain.title.ar}</h4>
            {categories.map((cat) => (
              <div key={cat} style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>
                <strong>{cat}</strong>
                {domain.resources[cat]?.map((r) => (
                  <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.25rem', borderBottom: '1px solid var(--glass-border)', marginTop: '0.25rem' }}>
                    <span style={{ flex: 1 }}>{r.title}</span>
                    <button className="btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => handleDeleteResource(domain.id, cat, r.id)}>Delete</button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ marginTop: '2rem' }}>
        <h3>Useful Resources</h3>
        {content.usefulResources.map((r) => (
          <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>
            <span style={{ flex: 1 }}>{r.name}</span>
            <button className="btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => handleDeleteUseful(r.id)}>Delete</button>
          </div>
        ))}
      </div>
    </main>
  );
}
