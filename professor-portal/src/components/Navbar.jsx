import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, Mail, ChevronRight, Globe, LayoutDashboard } from 'lucide-react';
import { useSite } from '../context/SiteContext';

function scrollToSection(navigate, location, id) {
  if (location.pathname !== '/') {
    navigate('/');
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120);
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useSite();

  return (
    <nav className="navbar">
      <a className="navbar-brand" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
        <div className="brand-icon">🎓</div>
        <div>
          <div className="brand-text">Houssam A. Mrameria</div>
          <div className="brand-sub">Pedagogical Engineering</div>
        </div>
      </a>

      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end>
          <GraduationCap size={15} /> {t.home}
        </NavLink>
        <button className="nav-link" onClick={() => scrollToSection(navigate, location, 'domains')}><BookOpen size={15} /> {t.domains}</button>
        <button className="nav-link" onClick={() => scrollToSection(navigate, location, 'resources')}><Globe size={15} /> {t.resources}</button>
        <button className="nav-link" onClick={() => scrollToSection(navigate, location, 'contact')}><Mail size={15} /> {t.contact}</button>
        <NavLink to="/admin" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          <LayoutDashboard size={15} /> {t.admin}
        </NavLink>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t.language}</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            background: 'rgba(255,255,255,0.05)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-glass)',
            borderRadius: '8px',
            padding: '0.35rem 0.5rem',
          }}
        >
          <option value="ar">العربية</option>
          <option value="en">English</option>
          <option value="fr">Francais</option>
        </select>
      </div>

      <button className="nav-cta" onClick={() => scrollToSection(navigate, location, 'domains')}>
        {t.explore} <ChevronRight size={14} />
      </button>
    </nav>
  );
}
