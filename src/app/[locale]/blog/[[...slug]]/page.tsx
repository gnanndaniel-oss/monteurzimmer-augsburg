import { notFound, redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { POSTS, getPost } from '@/content/blog/posts';
import { parseContent, readContent, countWords } from '@/lib/markdown';
import { germanOnlyMetadata } from '@/lib/meta';
import { generateBreadcrumbSchema } from '@/lib/seo';
import { ContentBody } from '@/components/SeoContent';
import { SITE_URL, CONTACT } from '@/lib/constants';

/**
 * Ratgeber/Blog – existiert nur auf Deutsch.
 * /blog/           → Übersicht (slug = [])
 * /blog/<slug>/    → Beitrag
 * Für andere Sprachen werden keine Seiten erzeugt.
 */

export const dynamicParams = false;

type Params = { locale: string; slug?: string[] };

// Hinweis: Next 15 bricht den Export ab, wenn generateStaticParams für einzelne
// Sprachen [] liefert. Deshalb werden die Pfade für alle Sprachen erzeugt; nicht-
// deutsche Varianten leiten per redirect() auf die deutsche URL um (noindex).
export function generateStaticParams() {
  return [{ slug: [] }, ...POSTS.map((p) => ({ slug: [p.slug] }))];
}

const INDEX_META = {
  title: 'Ratgeber für Monteure & Firmen – Monteurzimmer Augsburg',
  description:
    'Ratgeber von Monteurzimmer Augsburg: Steuern, Buchung und Planung von Monteurunterkünften für Firmen, Montageteams und Handwerker – praxisnah und konkret.',
};

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  const post = slug && slug.length ? getPost(slug[0]) : undefined;
  const meta = post
    ? germanOnlyMetadata({ title: post.metaTitle, description: post.description }, `blog/${post.slug}`)
    : germanOnlyMetadata(INDEX_META, 'blog');
  if (locale !== 'de') return { ...meta, robots: { index: false, follow: true } };
  return meta;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default async function BlogPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (locale !== 'de') redirect(slug && slug.length ? `/blog/${slug[0]}/` : '/blog/');
  setRequestLocale(locale);

  if (!slug || slug.length === 0) return <BlogIndex />;
  const post = getPost(slug[0]);
  if (!post || slug.length > 1) notFound();

  const md = readContent(`blog/${post.slug}.md`);
  const { intro, body, faq, faqTitle } = parseContent(md);
  const minutes = Math.max(1, Math.round(countWords(md) / 200));
  const url = `${SITE_URL}/blog/${post.slug}/`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: 'de-DE',
    mainEntityOfPage: url,
    url,
    image: `${SITE_URL}/attachments/Image/monteurwohnung-augsburg-ansicht.jpg`,
    author: { '@type': 'Organization', name: CONTACT.company, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: CONTACT.company,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/attachments/Image/augsburg-apartments-logo.jpg` },
    },
    about: 'Monteurzimmer Augsburg',
  };
  const breadcrumb = generateBreadcrumbSchema(
    [{ name: 'Startseite', path: '' }, { name: 'Ratgeber', path: 'blog' }, { name: post.title }],
    'de'
  );
  const others = POSTS.filter((p) => p.slug !== post.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <section className="bg-gradient-to-br from-slate-900 to-brand-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-slate-400 mb-4" aria-label="Brotkrumen">
            <a href="/" className="hover:text-brand-300">Startseite</a> <span>/</span>{' '}
            <a href="/blog/" className="hover:text-brand-300">Ratgeber</a>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">{post.title}</h1>
          <p className="text-slate-300 text-sm">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {minutes} Min. Lesezeit · {CONTACT.company}
          </p>
        </div>
      </section>
      {intro.length > 0 && (
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-2 mz-prose">{intro}</div>
        </section>
      )}
      <ContentBody nodes={body} faq={faq} faqTitle={faqTitle} />
      <section className="pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-brand-700 text-white p-8">
            <h2 className="text-2xl font-bold mb-2">Unterkunft für Ihr Team in Augsburg anfragen</h2>
            <p className="text-brand-100 mb-6">
              Monteurzimmer ab 12 € pro Person/Nacht, Wohnungen und Häuser für bis zu 20 Personen – direkt bei der {CONTACT.company}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/reservierung-monterwohungaugsburg/" className="inline-flex justify-center px-6 py-3 bg-white text-brand-700 font-bold rounded-xl hover:bg-brand-50">
                Jetzt anfragen
              </a>
              <a href={CONTACT.phoneTel} className="inline-flex justify-center px-6 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-500">
                {CONTACT.phone}
              </a>
            </div>
          </div>
          {others.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Weitere Ratgeber</h2>
              <ul className="space-y-3">
                {others.map((p) => (
                  <li key={p.slug}>
                    <a href={`/blog/${p.slug}/`} className="text-brand-700 font-semibold hover:underline">{p.title}</a>
                    <p className="text-sm text-slate-500">{p.excerpt}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function BlogIndex() {
  const breadcrumb = generateBreadcrumbSchema([{ name: 'Startseite', path: '' }, { name: 'Ratgeber' }], 'de');
  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Ratgeber – Monteurzimmer Augsburg',
    url: `${SITE_URL}/blog/`,
    inLanguage: 'de-DE',
    publisher: { '@type': 'Organization', name: CONTACT.company, url: SITE_URL },
    blogPost: POSTS.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}/`,
      datePublished: p.date,
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />
      <section className="bg-gradient-to-br from-slate-900 to-brand-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">Ratgeber für Monteure, Handwerker &amp; Firmen</h1>
          <p className="text-slate-300 text-lg">
            Praxiswissen rund um Monteurunterkünfte in Augsburg: Steuern und Abrechnung, Buchung für Montageteams und die Frage, ob Zimmer oder Wohnung besser passt.
          </p>
        </div>
      </section>
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {POSTS.map((p) => (
            <article key={p.slug} className="border border-slate-200 rounded-2xl p-6 hover:border-brand-300 transition-colors">
              <p className="text-xs text-slate-500 mb-2">
                <time dateTime={p.date}>{formatDate(p.date)}</time>
              </p>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                <a href={`/blog/${p.slug}/`} className="hover:text-brand-700">{p.title}</a>
              </h2>
              <p className="text-slate-600 mb-3">{p.excerpt}</p>
              <a href={`/blog/${p.slug}/`} className="text-sm font-semibold text-brand-700 hover:underline">Weiterlesen →</a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
