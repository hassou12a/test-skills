import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ExternalLink, Eye, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const categoryOrder = ['lessons', 'books', 'files', 'videos'];
const arabicRegex = /[\u0600-\u06FF]/;
const coverPool = [
  '/book-covers/cover-1.svg',
  '/book-covers/cover-2.svg',
  '/book-covers/cover-3.svg',
  '/book-covers/cover-4.svg',
  '/book-covers/cover-5.svg',
  '/book-covers/cover-6.svg',
];

export default function DomainPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { content, t, language } = useSite();

  const [previewItem, setPreviewItem] = useState(null);
  const [previewSrc, setPreviewSrc] = useState('');
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState('');
  const blobUrlRef = useRef('');

  const domain = content.domains.find((d) => d.id === id);

  useEffect(() => {
    return () => {
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    };
  }, []);

  useEffect(() => {
    let active = true;

    const cleanupBlob = () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = '';
      }
    };

    const buildPreview = async () => {
      if (!previewItem) {
        setPreviewSrc('');
        setPreviewLoading(false);
        setPreviewError('');
        return;
      }

      cleanupBlob();
      setPreviewLoading(true);
      setPreviewError('');

      if (previewItem.type !== 'pdf') {
        if (!active) return;
        setPreviewSrc(previewItem.url);
        setPreviewLoading(false);
        return;
      }

      try {
        const response = await fetch(previewItem.url);
        if (!response.ok) throw new Error('fetch failed');
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        blobUrlRef.current = blobUrl;
        if (!active) return;
        setPreviewSrc(blobUrl);
      } catch {
        if (!active) return;
        setPreviewSrc(`https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(previewItem.url)}`);
        setPreviewError(
          language === 'ar'
            ? 'بعض الملفات تمنع المعاينة المباشرة من المصدر. يمكنك استخدام زر التحميل.'
            : language === 'fr'
              ? 'Certains fichiers bloquent l apercu direct. Utilisez le bouton de telechargement.'
              : 'Some files block direct preview. You can use the download button.'
        );
      } finally {
        if (active) setPreviewLoading(false);
      }
    };

    buildPreview();

    return () => {
      active = false;
    };
  }, [previewItem, language]);

  if (!domain) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Not Found</h2>
        <button className="btn-primary" onClick={() => navigate('/')}>Back</button>
      </div>
    );
  }

  const labels = { lessons: t.lessons, books: t.books, files: t.files, videos: t.videos };

  const hashIndex = (text) => {
    const str = String(text || 'book');
    let hash = 0;
    for (let i = 0; i < str.length; i += 1) hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
    return hash % coverPool.length;
  };

  const getBookCover = (item) => {
    if (item.cover) return item.cover;
    return coverPool[hashIndex(item.title)];
  };

  const onPreview = (item) => {
    // Many external ebook pages block iframe embedding.
    if (item.type !== 'pdf') {
      window.open(item.url, '_blank', 'noopener,noreferrer');
      return;
    }
    setPreviewItem(item);
  };

  const closePreview = () => {
    setPreviewItem(null);
    setPreviewSrc('');
    setPreviewLoading(false);
    setPreviewError('');
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = '';
    }
  };

  return (
    <main className="domain-page">
      <nav className="breadcrumb">
        <Link to="/">{t.home}</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-secondary)' }}>{domain.title[language]}</span>
      </nav>

      <div className="glass-card domain-page-header">
        <div style={{ width: 72, height: 72, borderRadius: 16, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
          {domain.icon}
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>{domain.title[language]}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>{domain.description[language]}</p>
        </div>
        <button className="btn-secondary" style={{ alignSelf: 'flex-start', flexShrink: 0 }} onClick={() => navigate('/')}>
          <ArrowLeft size={15} /> {t.home}
        </button>
      </div>

      {categoryOrder.map((category) => (
        <section key={category} style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>{labels[category]}</h2>
          <div className="chapters-grid">
            {domain.resources[category].length === 0 ? <div className="glass-card chapter-card">{t.noItems}</div> : null}
            {(category === 'books'
              ? [...domain.resources[category]].sort((a, b) => {
                  const aArabic = arabicRegex.test(`${a.title} ${a.description}`) ? 1 : 0;
                  const bArabic = arabicRegex.test(`${b.title} ${b.description}`) ? 1 : 0;
                  return bArabic - aArabic;
                })
              : domain.resources[category]
            ).map((item) => (
              <div key={item.id} className="glass-card chapter-card">
                {category === 'books' ? (
                  <img className="book-cover-img" src={getBookCover(item)} alt={`${item.title} cover`} loading="lazy" />
                ) : null}
                <div className="chapter-title">{item.title}</div>
                <div className="chapter-desc">{item.description}</div>
                <div className="chapter-footer">
                  <span className="chapter-level level-intermediate">{item.type}</span>
                  {item.url ? (
                    <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="btn-secondary"
                        style={{ padding: '0.4rem 0.6rem' }}
                        onClick={() => onPreview(item)}
                      >
                        {t.preview} <Eye size={13} />
                      </button>
                      {item.type === 'pdf' ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-secondary"
                          style={{ padding: '0.4rem 0.6rem' }}
                          download={`${item.title}.pdf`}
                        >
                          {t.download} <ExternalLink size={13} />
                        </a>
                      ) : (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-secondary"
                          style={{ padding: '0.4rem 0.6rem' }}
                        >
                          {t.open} <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.noItems}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {previewItem ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(3, 9, 20, 0.82)',
            backdropFilter: 'blur(3px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            className="glass-card"
            style={{
              width: 'min(1100px, 96vw)',
              height: 'min(86vh, 920px)',
              padding: '0.9rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.7rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.96rem' }}>{previewItem.title}</div>
              <div style={{ display: 'flex', gap: '0.45rem' }}>
                <a
                  href={previewItem.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ padding: '0.4rem 0.65rem' }}
                  download={previewItem.type === 'pdf' ? `${previewItem.title}.pdf` : undefined}
                >
                  {previewItem.type === 'pdf' ? t.download : t.open} <ExternalLink size={13} />
                </a>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ padding: '0.4rem 0.65rem' }}
                  onClick={closePreview}
                >
                  {t.close} <X size={13} />
                </button>
              </div>
            </div>

            {previewLoading ? (
              <div style={{ display: 'grid', placeItems: 'center', height: '100%', color: 'var(--text-secondary)' }}>
                {language === 'ar' ? 'جاري تجهيز المعاينة...' : language === 'fr' ? 'Preparation de l apercu...' : 'Preparing preview...'}
              </div>
            ) : null}

            {previewError ? (
              <div style={{ fontSize: '0.82rem', color: 'var(--accent-amber)' }}>{previewError}</div>
            ) : null}

            {!previewLoading && previewSrc ? (
              <iframe
                title={previewItem.title}
                src={previewSrc}
                style={{ width: '100%', height: '100%', border: '1px solid var(--border-glass)', borderRadius: '10px', background: '#fff' }}
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </main>
  );
}
