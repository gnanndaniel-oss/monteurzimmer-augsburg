import { setRequestLocale } from 'next-intl/server';
import CategoryPage from '@/components/CategoryPage';
import {  generateAlternates, generateOgMeta , generateBreadcrumbSchema } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../messages/${locale}.json`)).default;
  const title = m.meta.titleMonteurapartment; const desc = m.monteurapartmentPage.desc; return { title, description: desc, alternates: generateAlternates('monteurapartment-augsburg', locale), openGraph: generateOgMeta(title, desc, 'monteurapartment-augsburg', locale) };
}

export default async function MonteurapartmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../messages/${locale}.json`)).default;
  const breadcrumb = generateBreadcrumbSchema([
    { name: m.nav.home, path: '' },
    { name: m.nav.monteurapartment },
  ], locale);
  setRequestLocale(locale);
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    <CategoryPage
      titleKey="monteurapartmentPage.title"
      descKey="monteurapartmentPage.desc"
      images={[
        '/data/imagegallery/monteurapartment-augsburg/monteurapartment-augsburg-bild-1.jpg',
        '/data/imagegallery/monteurapartment-augsburg/monteurapartment-augsburg-bild-2.jpg',
        '/data/imagegallery/monteurapartment-augsburg/monteurapartment-augsburg-bild-3.jpg',
        '/data/imagegallery/monteurapartment-augsburg/monteurapartment-augsburg-bild-4.jpg',
      ]}
      pricing={[
        { labelKey: 'pricing.aptSingle', priceKey: 'pricing.aptSinglePrice' },
        { labelKey: 'pricing.apt2', priceKey: 'pricing.apt2Price' },
        { labelKey: 'pricing.apt4Small', priceKey: 'pricing.apt4SmallPrice' },
      ]}
    />
    </>
    );
}
