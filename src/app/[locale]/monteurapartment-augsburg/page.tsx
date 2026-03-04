import { setRequestLocale } from 'next-intl/server';
import CategoryPage from '@/components/CategoryPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../messages/${locale}.json`)).default;
  return { title: m.meta.titleMonteurapartment, description: m.monteurapartmentPage.desc };
}

export default async function MonteurapartmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <CategoryPage
      titleKey="monteurapartmentPage.title"
      descKey="monteurapartmentPage.desc"
      images={[]}
      pricing={[
        { labelKey: 'pricing.aptSingle', priceKey: 'pricing.aptSinglePrice' },
        { labelKey: 'pricing.apt2', priceKey: 'pricing.apt2Price' },
        { labelKey: 'pricing.apt4Small', priceKey: 'pricing.apt4SmallPrice' },
      ]}
    />
  );
}
