import { setRequestLocale } from 'next-intl/server';
import RoomDetailPage from '@/components/RoomDetailPage';
import { generateAlternates, generateOgMeta } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../../messages/${locale}.json`)).default;
  const title = `${m.rooms.st5400.name} – ${m.rooms.st5400.code}`; const desc = m.rooms.st5400.desc; return { title, description: desc, alternates: generateAlternates('monteurzimmer-augsburg/monteurzimmer-augsburg-iv-st5-400', locale), openGraph: generateOgMeta(title, desc, 'monteurzimmer-augsburg/monteurzimmer-augsburg-iv-st5-400', locale) };
}

export default async function ST5400({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RoomDetailPage roomKey="st5400" images={[
    '/data/imagegallery/8fe64f03-9b24-03cf-8e4e-9073c9c884db/28b7263b-635e-b239-0892-4d84fe418771.jpg',
    '/data/imagegallery/8fe64f03-9b24-03cf-8e4e-9073c9c884db/4f2045f4-e9be-bff7-944a-7a138a94563d.jpg',
    '/data/imagegallery/8fe64f03-9b24-03cf-8e4e-9073c9c884db/7545b6c3-4c72-9726-d118-4c26306b027e.jpg',
    '/data/imagegallery/8fe64f03-9b24-03cf-8e4e-9073c9c884db/75fced4e-4759-4f9c-556b-aeba47ecf0a3.jpg',
    '/data/imagegallery/8fe64f03-9b24-03cf-8e4e-9073c9c884db/777612af-6a41-9a89-c3da-9a44d217c66c.jpg',
    '/data/imagegallery/8fe64f03-9b24-03cf-8e4e-9073c9c884db/82542219-334a-47f3-6ef5-a80ed96f91c6.jpg',
  ]} />;
}
