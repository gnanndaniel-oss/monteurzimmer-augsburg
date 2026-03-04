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
  return <RoomDetailPage roomKey="st5100" images={['ST5_100-1030823.jpg', 'ST5_100-hallway.jpg', 'ST5_100-kitchen.jpg', 'ST5_100-kitchenette.jpg', 'ST5_100-kitchen2.jpg']} />;
}
