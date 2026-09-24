import { roomMetadata } from '@/lib/meta';
import { setRequestLocale } from 'next-intl/server';
import RoomDetailPage from '@/components/RoomDetailPage';
import { getGermanPageContent } from '@/lib/markdown';
import { ContentBody } from '@/components/SeoContent';
import { generateAlternates, generateOgMeta, generateBreadcrumbSchema, generateRoomSchema } from '@/lib/seo';
import { ROOMS } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const room = ROOMS[2];
  return roomMetadata(2, room.code, room.capacity, room.slug, locale);
}

export default async function ST5300({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getGermanPageContent(locale, 'zimmer-st5-300');
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
      <RoomDetailPage roomKey="st5300" images={[...room.images]}>
        {content && <ContentBody nodes={content.body} faq={content.faq} faqTitle={content.faqTitle} />}
      </RoomDetailPage>
    </>
  );
}
