import { setRequestLocale } from 'next-intl/server';
import CategoryPage from '@/components/CategoryPage';
import {  generateAlternates, generateOgMeta , generateBreadcrumbSchema } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../messages/${locale}.json`)).default;
  const title = m.meta.titleApartment; const desc = m.apartmentPage.desc; return { title, description: desc, alternates: generateAlternates('monteurwohnung-augsburg', locale), openGraph: generateOgMeta(title, desc, 'monteurwohnung-augsburg', locale) };
}

export default async function MonteurwohnungPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../messages/${locale}.json`)).default;
  const breadcrumb = generateBreadcrumbSchema([
    { name: m.nav.home, path: '' },
    { name: m.nav.apartment },
  ], locale);
  setRequestLocale(locale);
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    <CategoryPage
      titleKey="apartmentPage.title"
      descKey="apartmentPage.desc"
      images={[
        '/attachments/Image/monteurwohnung-augsburg-ansicht.jpg',
        '/attachments/Image/monteurwohnung-augsburg-zimmer.jpg',
      ]}
      pricing={[
        { labelKey: 'pricing.apt4', priceKey: 'pricing.apt4Price' },
        { labelKey: 'pricing.apt6', priceKey: 'pricing.apt6Price' },
        { labelKey: 'pricing.apt10', priceKey: 'pricing.apt10Price' },
        { labelKey: 'pricing.apt20', priceKey: 'pricing.apt20Price' },
      ]}
    />
    </>
    );
}
