import { setRequestLocale } from 'next-intl/server';
import RoomDetailPage from '@/components/RoomDetailPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../../messages/${locale}.json`)).default;
  return { title: `${m.rooms.st5100.name} – ${m.rooms.st5100.code}`, description: m.rooms.st5100.desc };
}

export default async function ST5100({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RoomDetailPage roomKey="st5100" images={[
    '/attachments/Image/ST5_100-1030823.jpg',
    '/data/imagegallery/772f3136-e8ec-45fd-2fa1-f4f7e236c62d/00420915-d56c-1acc-6112-0cc70fc40f03.jpg',
    '/data/imagegallery/772f3136-e8ec-45fd-2fa1-f4f7e236c62d/14754b0e-795a-b339-ea2e-3c7bfe968431.jpg',
    '/data/imagegallery/772f3136-e8ec-45fd-2fa1-f4f7e236c62d/62a0d615-f853-c38e-c57e-7f9b593b52fb.jpg',
    '/data/imagegallery/772f3136-e8ec-45fd-2fa1-f4f7e236c62d/68370a01-9a2b-bbcc-ac7c-2bf7f043a8b3.jpg',
    '/data/imagegallery/772f3136-e8ec-45fd-2fa1-f4f7e236c62d/6a650cbd-684d-a2b1-98fa-25d90d74941f.jpg',
  ]} />;
}
