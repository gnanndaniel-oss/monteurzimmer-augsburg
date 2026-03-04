import { setRequestLocale } from 'next-intl/server';
import RoomDetailPage from '@/components/RoomDetailPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../../messages/${locale}.json`)).default;
  return { title: `${m.rooms.st5300.name} – ${m.rooms.st5300.code}`, description: m.rooms.st5300.desc };
}

export default async function ST5300({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RoomDetailPage roomKey="st5300" images={['ST5_300-1030843.jpg', 'ST5_300-bath.jpg', 'ST5_300-room2.jpg', 'ST5_300-room3.jpg', 'ST5_300-living.jpg', 'ST5_300-kitchen.jpg']} />;
}
