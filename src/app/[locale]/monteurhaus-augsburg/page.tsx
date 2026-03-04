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
      images={[
        '/data/imagegallery/e3d1cc21-026d-19d0-8906-f4eb92719829/0ae12ac0-2a6e-557e-8f91-fb4aaf8b8622.jpg',
        '/data/imagegallery/e3d1cc21-026d-19d0-8906-f4eb92719829/34e0a6b1-8c0c-ca22-b11d-63113c308397.jpg',
        '/data/imagegallery/e3d1cc21-026d-19d0-8906-f4eb92719829/44ca1c91-84e8-f6d3-fa2c-293fc899855e.jpg',
        '/data/imagegallery/e3d1cc21-026d-19d0-8906-f4eb92719829/6fa9478a-4442-be9b-6193-ddc15cd8d1f2.jpg',
      ]}
      pricing={[
        { labelKey: 'pricing.house7', priceKey: 'pricing.house7Price' },
        { labelKey: 'pricing.house13', priceKey: 'pricing.house13Price' },
        { labelKey: 'pricing.house16', priceKey: 'pricing.house16Price' },
      ]}
    />
  );
}
