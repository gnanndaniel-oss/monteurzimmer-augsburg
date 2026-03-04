import { setRequestLocale } from 'next-intl/server';
import CategoryPage from '@/components/CategoryPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../messages/${locale}.json`)).default;
  return { title: m.meta.titleApartment, description: m.apartmentPage.desc };
}

export default async function MonteurwohnungPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <CategoryPage
      titleKey="apartmentPage.title"
      descKey="apartmentPage.desc"
      images={['Monteurwohnung_Augsburg__1-13.jpg']}
      pricing={[
        { labelKey: 'pricing.apt4', priceKey: 'pricing.apt4Price' },
        { labelKey: 'pricing.apt6', priceKey: 'pricing.apt6Price' },
        { labelKey: 'pricing.apt10', priceKey: 'pricing.apt10Price' },
        { labelKey: 'pricing.apt20', priceKey: 'pricing.apt20Price' },
      ]}
    />
  );
}
