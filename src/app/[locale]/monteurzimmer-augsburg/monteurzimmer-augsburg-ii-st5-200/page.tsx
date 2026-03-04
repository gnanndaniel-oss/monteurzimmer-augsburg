import { setRequestLocale } from 'next-intl/server';
import RoomDetailPage from '@/components/RoomDetailPage';
import { generateAlternates, generateOgMeta } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../../messages/${locale}.json`)).default;
  const title = `${m.rooms.st5200.name} – ${m.rooms.st5200.code}`; const desc = m.rooms.st5200.desc; return { title, description: desc, alternates: generateAlternates('monteurzimmer-augsburg/monteurzimmer-augsburg-ii-st5-200', locale), openGraph: generateOgMeta(title, desc, 'monteurzimmer-augsburg/monteurzimmer-augsburg-ii-st5-200', locale) };
}

export default async function ST5200({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RoomDetailPage roomKey="st5200" images={[
    '/data/imagegallery/80f0cebb-b7c4-e4af-d3af-e47c489bbd8f/06cfde35-8a94-d46d-f895-d39e54f95d5f.jpg',
    '/data/imagegallery/80f0cebb-b7c4-e4af-d3af-e47c489bbd8f/0719b876-bda5-08f6-fff3-717d7775cd76.jpg',
    '/data/imagegallery/80f0cebb-b7c4-e4af-d3af-e47c489bbd8f/353b151f-6fc1-38d6-3207-b6d1740245fd.jpg',
    '/data/imagegallery/80f0cebb-b7c4-e4af-d3af-e47c489bbd8f/391757c2-88f5-1edb-17ce-321a78836131.jpg',
    '/data/imagegallery/80f0cebb-b7c4-e4af-d3af-e47c489bbd8f/6e049229-5939-ad26-ad1f-1cb4834e30d0.jpg',
    '/data/imagegallery/80f0cebb-b7c4-e4af-d3af-e47c489bbd8f/bccf5bfb-46c8-2619-0c29-6b1e09f87674.jpg',
  ]} />;
}
