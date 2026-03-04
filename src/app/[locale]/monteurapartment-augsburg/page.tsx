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
      images={[
        '/data/imagegallery/96abf438-98e4-3f79-1848-c6b174da0aea/13203ff6-bdcf-8477-2f37-1abc034a0ebd.jpg',
        '/data/imagegallery/96abf438-98e4-3f79-1848-c6b174da0aea/2f46b116-ead0-7316-fb27-13502df86481.jpg',
        '/data/imagegallery/96abf438-98e4-3f79-1848-c6b174da0aea/57cb3386-a202-49f9-5312-ba603ef090db.jpg',
        '/data/imagegallery/96abf438-98e4-3f79-1848-c6b174da0aea/ff2269b6-a1a2-456d-5a65-430857651d8c.jpg',
      ]}
      pricing={[
        { labelKey: 'pricing.aptSingle', priceKey: 'pricing.aptSinglePrice' },
        { labelKey: 'pricing.apt2', priceKey: 'pricing.apt2Price' },
        { labelKey: 'pricing.apt4Small', priceKey: 'pricing.apt4SmallPrice' },
      ]}
    />
  );
}
