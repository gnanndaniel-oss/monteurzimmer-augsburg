import { setRequestLocale } from 'next-intl/server';
import RoomDetailPage from '@/components/RoomDetailPage';
import { generateAlternates, generateOgMeta, generateBreadcrumbSchema, generateRoomSchema } from '@/lib/seo';
import { ROOMS } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../../messages/${locale}.json`)).default;
  const title = `${m.rooms.st5300.name} – ${m.rooms.st5300.code}`;
  const desc = m.rooms.st5300.desc;
  return {
    title,
    description: desc,
    alternates: generateAlternates('monteurzimmer-augsburg/monteurzimmer-augsburg-iii-st5-300', locale),
    openGraph: generateOgMeta(title, desc, 'monteurzimmer-augsburg/monteurzimmer-augsburg-iii-st5-300', locale),
  };
}

export default async function ST5300({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const m = (await import(`../../../../../messages/${locale}.json`)).default;
  const room = ROOMS[2];
  const breadcrumb = generateBreadcrumbSchema([
    { name: m.nav.home, path: '' },
    { name: m.nav.rooms, path: 'monteurzimmer-augsburg' },
    { name: m.rooms.st5300.name },
  ], locale);
  const roomSchema = generateRoomSchema({
    name: m.rooms.st5300.name,
    description: m.rooms.st5300.desc,
    code: room.code,
    capacity: room.capacity,
    images: [...room.images],
    slug: room.slug,
  }, locale);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(roomSchema) }} />
      <RoomDetailPage roomKey="st5300" images={[
        '/attachments/Image/ST5_300-1030843.jpg',
        '/data/imagegallery/81417c56-b208-882f-7038-9dbebef92cc0/5210d324-0a14-95a1-a399-4bed55403e8b.jpg',
        '/data/imagegallery/81417c56-b208-882f-7038-9dbebef92cc0/66d4b41b-a37b-c0f6-3e2a-3de7d39a8dc8.jpg',
        '/data/imagegallery/81417c56-b208-882f-7038-9dbebef92cc0/a7c6c1eb-5ba4-846c-691e-b70ba7edcba2.jpg',
        '/data/imagegallery/81417c56-b208-882f-7038-9dbebef92cc0/cf2fc5d8-5618-dc2a-1f80-75b7c7d5889e.jpg',
        '/data/imagegallery/81417c56-b208-882f-7038-9dbebef92cc0/fa103a08-80b5-2fd6-15a6-916fbe9823f3.jpg',
      ]} />
    </>
  );
}
