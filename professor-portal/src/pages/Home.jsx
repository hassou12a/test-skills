import { useNavigate } from 'react-router-dom';
import { ArrowRight, Monitor, Shield, Wrench, GraduationCap, Mail, Phone, MapPin, Send, ExternalLink, Search } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { useEffect, useState } from 'react';

const labels = {
  lessons: (t) => t.lessons,
  books: (t) => t.books,
  files: (t) => t.files,
  videos: (t) => t.videos,
};

function HeroSection() {
  const { content, t, language } = useSite();

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <GraduationCap size={14} />
          {t.heroBadge}
        </div>
        <h1 className="hero-title">
          {content.profile.fullName}
          <br />
          <span className="gradient-text">{content.profile.role[language]} CIP</span>
        </h1>
        <div className="hero-subtitle">{content.profile.welcome[language]}</div>
        <p className="hero-desc">
          {t.domainsDesc}
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => document.getElementById('domains')?.scrollIntoView({ behavior: 'smooth' })}>
            {t.explore} <ArrowRight size={16} />
          </button>
          <a href="#contact" className="btn-secondary">{t.contact}</a>
        </div>
      </div>
      <div className="hero-avatar-container" style={{ pointerEvents: 'none' }}>
        <div className="avatar-ring"></div>
        <img src="/avatar.png" alt="Profile" className="hero-avatar" style={{ pointerEvents: 'auto' }} />
      </div>
    </section>
  );
}

function DomainsSection() {
  const navigate = useNavigate(); const { content, t, language } = useSite();
  const icons = [Monitor, Shield, Wrench];

  return (
    <section className="section" id="domains">
      <div className="section-header">
        <h2 className="section-title">{t.domainsTitle}</h2>
        <p className="section-desc">{t.domainsDesc}</p>
      </div>
      <div className="domains-grid">
        {content.domains.map((domain, i) => {
          const Icon = icons[i] || Monitor;
          return (
            <div key={domain.id} className={`glass-card domain-card ${domain.colorClass}`} onClick={() => navigate(`/domain/${domain.id}`)}>
              <div className={`domain-icon ${domain.colorClass}`}><Icon size={26} /></div>
              <h3 className="domain-title">{domain.title[language]}</h3>
              <p className="domain-desc">{domain.description[language]}</p>
              <div className="domain-modules">
                {Object.keys(domain.resources).map((key) => (
                  <span className="module-tag" key={key}><span className="module-dot" />{labels[key](t)}: {domain.resources[key].length}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function UsefulResourcesSection() {
  const { content, t, language } = useSite();
  const [resourceFilter, setResourceFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState('best');

  const resourceMetaById = {
    'res-edraak': { rating: 4.8, popularity: 90, free: true, arabic: true, certificate: true },
    'res-rwaq': { rating: 4.6, popularity: 82, free: true, arabic: true, certificate: false },
    'res-maharatech': { rating: 4.7, popularity: 85, free: true, arabic: true, certificate: true },
    'res-satr': { rating: 4.7, popularity: 80, free: true, arabic: true, certificate: false },
    'res-khan-ar': { rating: 4.8, popularity: 95, free: true, arabic: true, certificate: false },
    'res-freecodecamp': { rating: 4.9, popularity: 98, free: true, arabic: false, certificate: true },
    'res-coursera': { rating: 4.7, popularity: 99, free: false, arabic: false, certificate: true },
    'res-edx': { rating: 4.7, popularity: 93, free: false, arabic: false, certificate: true },
  };

  const getResourceType = (item) => {
    const text = `${item.name} ${item.category}`.toLowerCase();
    if (text.includes('program') || text.includes('code') || text.includes('tech') || text.includes('برمج')) return 'programming';
    if (text.includes('career') || text.includes('skills') || text.includes('مهارات') || text.includes('professional')) return 'career';
    return 'general';
  };

  const filterLabels = {
    ar: { all: 'الكل', programming: 'برمجة وتقنية', career: 'مهارات مهنية', general: 'تعلم عام' },
    en: { all: 'All', programming: 'Programming', career: 'Career Skills', general: 'General Learning' },
    fr: { all: 'Tous', programming: 'Programmation', career: 'Competences pro', general: 'Apprentissage general' },
  };
  const labelsByLang = filterLabels[language] || filterLabels.en;
  const filterOptions = [
    { id: 'all', label: labelsByLang.all },
    { id: 'programming', label: labelsByLang.programming },
    { id: 'career', label: labelsByLang.career },
    { id: 'general', label: labelsByLang.general },
  ];

  const sortLabels = {
    ar: { best: 'الأفضل أولًا', popular: 'الأكثر شهرة', free: 'المجاني أولًا', rating: 'الأعلى تقييمًا' },
    en: { best: 'Best First', popular: 'Most Popular', free: 'Free First', rating: 'Top Rated' },
    fr: { best: 'Meilleurs d abord', popular: 'Plus populaires', free: 'Gratuit d abord', rating: 'Mieux notes' },
  };
  const labelsSort = sortLabels[language] || sortLabels.en;

  const enrichedResources = content.usefulResources
    .filter((item) => resourceFilter === 'all' || getResourceType(item) === resourceFilter)
    .filter((item) => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;
      const text = `${item.name} ${item.category} ${item.url}`.toLowerCase();
      return text.includes(q);
    })
    .map((item) => {
      const meta = resourceMetaById[item.id] || {};
      return {
        ...item,
        rating: meta.rating ?? 4.5,
        popularity: meta.popularity ?? 75,
        free: meta.free ?? /free|مجاني/i.test(item.category),
        arabic: meta.arabic ?? /arabic|عربي|arab/i.test(item.name + item.category),
        certificate: meta.certificate ?? /cert|شهادة/i.test(item.category),
      };
    })
    .sort((a, b) => {
      if (sortMode === 'popular') return b.popularity - a.popularity;
      if (sortMode === 'free') return Number(b.free) - Number(a.free) || b.rating - a.rating;
      if (sortMode === 'rating') return b.rating - a.rating;
      const scoreA = a.rating * 10 + a.popularity + (a.free ? 8 : 0) + (a.arabic ? 6 : 0);
      const scoreB = b.rating * 10 + b.popularity + (b.free ? 8 : 0) + (b.arabic ? 6 : 0);
      return scoreB - scoreA;
    });

  const getInitials = (name) => {
    const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    return (parts[0]?.[0] || 'R') + (parts[1]?.[0] || '');
  };

  const getFallbackLogo = (name) => {
    const initials = getInitials(name).toUpperCase();
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='#0ea5e9'/><stop offset='100%' stop-color='#2563eb'/></linearGradient></defs><rect width='120' height='120' rx='24' fill='url(#g)'/><text x='60' y='72' text-anchor='middle' font-size='40' font-family='Arial, sans-serif' fill='white' font-weight='700'>${initials}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  const getLogo = (item) => {
    if (item.logo) return item.logo;
    try {
      const host = new URL(item.url).hostname;
      return `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(host)}`;
    } catch {
      return 'https://www.google.com/s2/favicons?sz=128&domain_url=example.com';
    }
  };

  return (
    <section className="section" id="resources">
      <div className="section-header">
        <h2 className="section-title">{t.usefulTitle}</h2>
        <p className="section-desc">{t.usefulDesc}</p>
      </div>
      <div className="resource-filters">
        {filterOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`resource-filter-btn${resourceFilter === option.id ? ' active' : ''}`}
            onClick={() => setResourceFilter(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="resource-toolbar">
        <div className="resource-search-wrap">
          <Search size={15} />
          <input
            className="resource-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ar' ? 'ابحث عن منصة...' : language === 'fr' ? 'Rechercher une plateforme...' : 'Search platforms...'}
          />
        </div>
        <select className="resource-sort-select" value={sortMode} onChange={(e) => setSortMode(e.target.value)}>
          <option value="best">{labelsSort.best}</option>
          <option value="popular">{labelsSort.popular}</option>
          <option value="free">{labelsSort.free}</option>
          <option value="rating">{labelsSort.rating}</option>
        </select>
      </div>
      <div className="domains-grid">
        {enrichedResources.map((item) => (
          <a className="glass-card domain-card" key={item.id} href={item.url} target="_blank" rel="noreferrer">
            <div className="resource-head">
              <img
                className="resource-logo"
                src={getLogo(item)}
                alt={`${item.name} logo`}
                loading="lazy"
                onError={(e) => {
                  if (e.currentTarget.dataset.failed === '1') return;
                  e.currentTarget.dataset.failed = '1';
                  e.currentTarget.src = getFallbackLogo(item.name);
                }}
              />
              <div>
                <h3 className="domain-title">{item.name}</h3>
                <p className="domain-desc">{item.category}</p>
              </div>
            </div>
            <div className="module-tag"><ExternalLink size={14} /> {t.open}</div>
            <div className="resource-meta-row">
              <span className="resource-rating">★ {item.rating.toFixed(1)}</span>
              {item.free ? <span className="resource-badge free">{language === 'ar' ? 'مجاني' : language === 'fr' ? 'Gratuit' : 'Free'}</span> : null}
              {item.arabic ? <span className="resource-badge arabic">{language === 'ar' ? 'عربي' : language === 'fr' ? 'Arabe' : 'Arabic'}</span> : null}
              {item.certificate ? <span className="resource-badge cert">{language === 'ar' ? 'شهادة' : language === 'fr' ? 'Certificat' : 'Certificate'}</span> : null}
            </div>
          </a>
        ))}
      </div>
      {!enrichedResources.length ? (
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '1rem' }}>
          {language === 'ar' ? 'لا توجد نتائج مطابقة للبحث.' : language === 'fr' ? 'Aucun resultat correspondant.' : 'No matching resources found.'}
        </p>
      ) : null}
    </section>
  );
}

function ContactSection() {
  const { content, t, language } = useSite();
  const [submitState, setSubmitState] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [formStartedAt, setFormStartedAt] = useState(Date.now());

  useEffect(() => {
    setFormStartedAt(Date.now());
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const honeypot = String(form.get('_gotcha') || '').trim();
    const elapsedMs = Date.now() - formStartedAt;

    // Bots usually fill hidden fields or submit unrealistically fast.
    if (honeypot || elapsedMs < 2500) {
      setSubmitState('error');
      setSubmitMessage(
        language === 'ar'
          ? 'تعذر إرسال الرسالة. حاول مرة أخرى بعد ثوانٍ.'
          : language === 'fr'
            ? 'Envoi bloque. Reessayez dans quelques secondes.'
            : 'Submission blocked. Please retry in a few seconds.'
      );
      return;
    }

    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      subject: form.get('subject'),
      message: form.get('message'),
      _subject: `New Contact Message - ${form.get('subject')}`,
      _captcha: 'false',
      _template: 'table',
    };

    setSubmitState('loading');
    setSubmitMessage('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(content.profile.email)}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Request failed');

      setSubmitState('success');
      setSubmitMessage(
        language === 'ar'
          ? 'تم إرسال الرسالة بنجاح إلى بريدك الإلكتروني.'
          : language === 'fr'
            ? 'Le message a ete envoye avec succes a votre e-mail.'
            : 'Message sent successfully to your email.'
      );
      e.currentTarget.reset();
      setFormStartedAt(Date.now());
    } catch {
      setSubmitState('error');
      setSubmitMessage(
        language === 'ar'
          ? 'فشل الإرسال. حاول مرة أخرى بعد قليل.'
          : language === 'fr'
            ? 'Echec de l envoi. Reessayez plus tard.'
            : 'Sending failed. Please try again later.'
      );
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-header">
        <h2 className="section-title">{t.contactTitle}</h2>
        <p className="section-desc">{t.contactDesc}</p>
      </div>
      <div className="contact-grid">
        <div className="contact-info">
          {[
            { icon: <Mail size={18} />, label: 'Email', value: content.profile.email },
            { icon: <Phone size={18} />, label: 'Phone', value: content.profile.phone },
            { icon: <MapPin size={18} />, label: 'Location', value: content.profile.location },
          ].map((item, i) => (
            <div className="glass-card contact-item" key={i}>
              <div className="contact-icon">{item.icon}</div>
              <div>
                <div className="contact-label">{item.label}</div>
                <div className="contact-value">{item.value}</div>
              </div>
            </div>
          ))}
          {content.profile.links.map((link) => (
            <a key={link.id} className="btn-secondary" href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
          ))}
        </div>

        <form className="glass-card contact-form" onSubmit={onSubmit}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>{t.contact}</h3>
          <input
            name="_gotcha"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
          />
          <input className="form-input" name="name" placeholder={t.fullName} required />
          <input className="form-input" type="email" name="email" placeholder="Email" required />
          <input className="form-input" name="subject" placeholder={t.subject} required />
          <textarea className="form-textarea" name="message" placeholder={t.message} required />
          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={submitState === 'loading'}>
            <Send size={16} /> {submitState === 'loading' ? '...' : t.send}
          </button>
          {submitMessage ? (
            <p style={{ fontSize: '0.85rem', color: submitState === 'success' ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
              {submitMessage}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <DomainsSection />
      <UsefulResourcesSection />
      <ContactSection />
    </main>
  );
}









