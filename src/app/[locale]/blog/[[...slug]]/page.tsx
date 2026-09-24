import { notFound, redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { POSTS, getPost, localizePost } from '@/content/blog/posts';
import { parseContent, readContent, countWords, localizeLinks } from '@/lib/markdown';
import { blogMetadata } from '@/lib/meta';
import { generateBreadcrumbSchema } from '@/lib/seo';
import { ContentBody } from '@/components/SeoContent';
import { SITE_URL, CONTACT } from '@/lib/constants';
import { BLOG_UI, isBlogLocale, localePath, type BlogLoc } from '@/lib/ui-i18n';

/**
 * Ratgeber/Blog – Deutsch (Original), Englisch und Polnisch (Übersetzungen).
 * /blog/           → Übersicht (slug = [])
 * /blog/<slug>/    → Beitrag
 * cs/ro: kein übersetzter Ratgeber – Weiterleitung auf die deutsche URL (noindex).
 */

export const dynamicParams = false;

type Params = { locale: string; slug?: string[] };

// Hinweis: Next 15 bricht den Export ab, wenn generateStaticParams für einzelne
// Sprachen [] liefert. Deshalb werden die Pfade für alle Sprachen erzeugt; cs/ro
// leiten per redirect() auf die deutsche URL um (noindex).
export function generateStaticParams() {
  return [{ slug: [] }, ...POSTS.map((p) => ({ slug: [p.slug] }))];
}

const INDEX_META: Record<BlogLoc, { title: string; description: string }> = {
  de: {
    title: 'Ratgeber für Monteure & Firmen – Monteurzimmer Augsburg',
    description:
      'Ratgeber von Monteurzimmer Augsburg: Steuern, Buchung und Planung von Monteurunterkünften für Firmen, Montageteams und Handwerker – praxisnah und konkret.',
  },
  en: {
    title: 'Guides for Workers and Companies – Monteurzimmer Augsburg',
    description:
      'Guides from Monteurzimmer Augsburg: tax, booking and planning of accommodation for companies, installation teams and tradespeople working in Augsburg.',
  },
  pl: {
    title: 'Poradnik dla monterów i firm – Monteurzimmer Augsburg',
    description:
      'Poradnik Monteurzimmer Augsburg: podatki, rezerwacja i planowanie noclegów dla monterów – dla firm, ekip montażowych i fachowców pracujących w Augsburgu.',
  },
};

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  const loc: BlogLoc = isBlogLocale(locale) ? locale : 'de';
  const raw = slug && slug.length ? getPost(slug[0]) : undefined;
  const post = raw ? localizePost(raw, loc) : undefined;
  const meta = post
    ? blogMetadata(
        { title: post.metaTitle, description: post.description },
        `blog/${post.slug}`,
        loc,
        `${SITE_URL}${post.image.src}`
      )
    : blogMetadata(INDEX_META[loc], 'blog', loc);
  if (!isBlogLocale(locale)) return { ...meta, robots: { index: false, follow: true } };
  return meta;
}

export default async function BlogPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!isBlogLocale(locale)) redirect(slug && slug.length ? `/blog/${slug[0]}/` : '/blog/');
  setRequestLocale(locale);

  if (!slug || slug.length === 0) return <BlogIndex locale={locale} />;
  const raw = getPost(slug[0]);
  if (!raw || slug.length > 1) notFound();
  const post = localizePost(raw, locale);
  const ui = BLOG_UI[locale];
  const lp = (p: string) => localePath(locale, p);

  const file = locale === 'de' ? `blog/${post.slug}.md` : `blog/${locale}/${post.slug}.md`;
  const md = localizeLinks(readContent(file), locale);
  const { intro, body, faq, faqTitle } = parseContent(md);
  const minutes = Math.max(1, Math.round(countWords(md) / 200));
  const url = `${SITE_URL}${lp(`/blog/${post.slug}/`)}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: ui.inLanguage,
    mainEntityOfPage: url,
    url,
    image: `${SITE_URL}${post.image.src}`,
    author: { '@type': 'Organization', name: CONTACT.company, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: CONTACT.company,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/attachments/Image/augsburg-apartments-logo.jpg` },
    },
    about: 'Monteurzimmer Augsburg',
    ...(locale !== 'de'
      ? { translationOfWork: { '@type': 'BlogPosting', url: `${SITE_URL}/blog/${post.slug}/`, inLanguage: 'de-DE' } }
      : {}),
  };
  const breadcrumb = generateBreadcrumbSchema(
    [{ name: ui.home, path: '' }, { name: ui.guides, path: 'blog' }, { name: post.title }],
    locale
  );
  const others = POSTS.filter((p) => p.slug !== post.slug).map((p) => localizePost(p, locale));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <section className="bg-gradient-to-br from-slate-900 to-brand-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-slate-400 mb-4" aria-label={ui.breadcrumbLabel}>
            <a href={lp('/')} className="hover:text-brand-300">{ui.home}</a> <span>/</span>{' '}
            <a href={lp('/blog/')} className="hover:text-brand-300">{ui.guides}</a>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">{post.title}</h1>
          <p className="text-slate-300 text-sm">
            <time dateTime={post.date}>{formatDate(post.date, ui.dateLocale)}</time> · {ui.readingTime(minutes)} · {CONTACT.company}
          </p>
        </div>
      </section>
      <section className="bg-white">
        <figure className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <img
            src={post.image.src}
            alt={post.image.alt}
            width={post.image.width}
            height={post.image.height}
            fetchPriority="high"
            decoding="async"
            className="w-full max-h-[420px] object-cover rounded-2xl"
          />
          <figcaption className="text-xs text-slate-500 mt-2">{post.image.alt}</figcaption>
        </figure>
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
            <h2 className="text-2xl font-bold mb-2">{ui.ctaTitle}</h2>
            <p className="text-brand-100 mb-6">{ui.ctaText(CONTACT.company)}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={lp('/reservierung-monterwohungaugsburg/')} className="inline-flex justify-center px-6 py-3 bg-white text-brand-700 font-bold rounded-xl hover:bg-brand-50">
                {ui.ctaButton}
              </a>
              <a href={CONTACT.phoneTel} className="inline-flex justify-center px-6 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-500">
                {CONTACT.phone}
              </a>
            </div>
          </div>
          {others.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">{ui.more}</h2>
              <ul className="space-y-3">
                {others.map((p) => (
                  <li key={p.slug}>
                    <a href={lp(`/blog/${p.slug}/`)} className="text-brand-700 font-semibold hover:underline">{p.title}</a>
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

function formatDate(iso: string, dateLocale: string) {
  return new Date(iso).toLocaleDateString(dateLocale, { day: '2-digit', month: 'long', year: 'numeric' });
}

function BlogIndex({ locale }: { locale: BlogLoc }) {
  const ui = BLOG_UI[locale];
  const lp = (p: string) => localePath(locale, p);
  const posts = POSTS.map((p) => localizePost(p, locale));
  const breadcrumb = generateBreadcrumbSchema([{ name: ui.home, path: '' }, { name: ui.guides }], locale);
  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: ui.indexName,
    url: `${SITE_URL}${lp('/blog/')}`,
    inLanguage: ui.inLanguage,
    publisher: { '@type': 'Organization', name: CONTACT.company, url: SITE_URL },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}${lp(`/blog/${p.slug}/`)}`,
      datePublished: p.date,
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />
      <section className="bg-gradient-to-br from-slate-900 to-brand-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">{ui.indexH1}</h1>
          <p className="text-slate-300 text-lg">{ui.indexLead}</p>
        </div>
      </section>
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {posts.map((p) => (
            <article key={p.slug} className="border border-slate-200 rounded-2xl p-6 hover:border-brand-300 transition-colors">
              <p className="text-xs text-slate-500 mb-2">
                <time dateTime={p.date}>{formatDate(p.date, ui.dateLocale)}</time>
              </p>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                <a href={lp(`/blog/${p.slug}/`)} className="hover:text-brand-700">{p.title}</a>
              </h2>
              <p className="text-slate-600 mb-3">{p.excerpt}</p>
              <a href={lp(`/blog/${p.slug}/`)} className="text-sm font-semibold text-brand-700 hover:underline">{ui.readMore}</a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
