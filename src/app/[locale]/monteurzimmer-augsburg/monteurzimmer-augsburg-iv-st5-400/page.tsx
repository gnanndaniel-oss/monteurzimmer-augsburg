import { setRequestLocale } from 'next-intl/server';
import RoomDetailPage from '@/components/RoomDetailPage';
import { generateAlternates, generateOgMeta, generateBreadcrumbSchema, generateRoomSchema } from '@/lib/seo';
import { ROOMS } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../../messages/${locale}.json`)).default;
  const title = `${m.rooms.st5400.name} – ${m.rooms.st5400.code}`;
  const desc = m.rooms.st5400.desc;
  return {
    title,
    description: desc,
    alternates: generateAlternates('monteurzimmer-augsburg/monteurzimmer-augsburg-iv-st5-400', locale),
    openGraph: generateOgMeta(title, desc, 'monteurzimmer-augsburg/monteurzimmer-augsburg-iv-st5-400', locale),
  };
}

export default async function ST5400({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const m = (await import(`../../../../../messages/${locale}.json`)).default;
  const room = ROOMS[3];
  const breadcrumb = generateBreadcrumbSchema([
    { name: m.nav.home, path: '' },
    { name: m.nav.rooms, path: 'monteurzimmer-augsburg' },
    { name: m.rooms.st5400.name },
  ], locale);
  const roomSchema = generateRoomSchema({
    name: m.rooms.st5400.name,
    description: m.rooms.st5400.desc,
    code: room.code,
    capacity: room.capacity,
    images: [...room.images],
    slug: room.slug,
  }, locale);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(roomSchema) }} />
      <RoomDetailPage roomKey="st5400" images={[...room.images]} />
    </>
  );
}
