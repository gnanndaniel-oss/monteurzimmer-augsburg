import { setRequestLocale } from 'next-intl/server';
import RoomDetailPage from '@/components/RoomDetailPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../../messages/${locale}.json`)).default;
  return { title: `${m.rooms.st5400.name} – ${m.rooms.st5400.code}`, description: m.rooms.st5400.desc };
}

export default async function ST5400({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RoomDetailPage roomKey="st5400" images={['ST5_400-main.jpg', 'ST5_400-room1.jpg', 'ST5_400-room2.jpg', 'ST5_400-room3.jpg', 'ST5_400-bath.jpg', 'ST5_400-kitchen.jpg']} />;
}
