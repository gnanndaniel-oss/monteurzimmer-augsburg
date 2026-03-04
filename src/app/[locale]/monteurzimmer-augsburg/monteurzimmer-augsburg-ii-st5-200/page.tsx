import { setRequestLocale } from 'next-intl/server';
import RoomDetailPage from '@/components/RoomDetailPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../../messages/${locale}.json`)).default;
  return { title: `${m.rooms.st5200.name} – ${m.rooms.st5200.code}`, description: m.rooms.st5200.desc };
}

export default async function ST5200({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RoomDetailPage roomKey="st5200" images={['ST5_200-main.jpg', 'ST5_200-room1.jpg', 'ST5_200-room2.jpg', 'ST5_200-kitchen.jpg', 'ST5_200-bath.jpg']} />;
}
