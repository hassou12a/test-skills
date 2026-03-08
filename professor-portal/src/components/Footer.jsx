import { useSite } from '../context/SiteContext';

export default function Footer() {
  const { content } = useSite();
  return (
    <footer className="footer">
      <p>© 2026 <span>{content.profile.fullName}</span> - Ingenierie Pedagogique en Formation Professionnelle. Tous droits reserves.</p>
    </footer>
  );
}
