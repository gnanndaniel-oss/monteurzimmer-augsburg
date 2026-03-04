import { setRequestLocale } from 'next-intl/server';
import CategoryPage from '@/components/CategoryPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../messages/${locale}.json`)).default;
  return { title: m.meta.titleHouse, description: m.housePage.desc };
}

export default async function MonteurhausPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <CategoryPage
      titleKey="housePage.title"
      descKey="housePage.desc"
      images={[]}
      pricing={[
        { labelKey: 'pricing.house7', priceKey: 'pricing.house7Price' },
        { labelKey: 'pricing.house13', priceKey: 'pricing.house13Price' },
        { labelKey: 'pricing.house16', priceKey: 'pricing.house16Price' },
      ]}
    />
  );
}
