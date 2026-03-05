import { setRequestLocale } from 'next-intl/server';
import CategoryPage from '@/components/CategoryPage';
import {  generateAlternates, generateOgMeta , generateBreadcrumbSchema } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../messages/${locale}.json`)).default;
  const title = m.meta.titleHouse; const desc = m.housePage.desc; return { title, description: desc, alternates: generateAlternates('monteurhaus-augsburg', locale), openGraph: generateOgMeta(title, desc, 'monteurhaus-augsburg', locale) };
}

export default async function MonteurhausPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../messages/${locale}.json`)).default;
  const breadcrumb = generateBreadcrumbSchema([
    { name: m.nav.home, path: '' },
    { name: m.nav.house },
  ], locale);
  setRequestLocale(locale);
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    <CategoryPage
      titleKey="housePage.title"
      descKey="housePage.desc"
      images={[
        '/data/imagegallery/monteurhaus-augsburg/monteurhaus-augsburg-bild-1.jpg',
        '/data/imagegallery/monteurhaus-augsburg/monteurhaus-augsburg-bild-2.jpg',
        '/data/imagegallery/monteurhaus-augsburg/monteurhaus-augsburg-bild-3.jpg',
        '/data/imagegallery/monteurhaus-augsburg/monteurhaus-augsburg-bild-4.jpg',
      ]}
      pricing={[
        { labelKey: 'pricing.house7', priceKey: 'pricing.house7Price' },
        { labelKey: 'pricing.house13', priceKey: 'pricing.house13Price' },
        { labelKey: 'pricing.house16', priceKey: 'pricing.house16Price' },
      ]}
    />
    </>
    );
}
