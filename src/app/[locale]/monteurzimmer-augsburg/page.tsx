import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ROOMS } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  return { title: messages.meta.titleRooms, description: messages.meta.description };
}

export default async function RoomsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RoomsContent />;
}

function RoomsContent() {
  const t = useTranslations();

  const rooms = [
    { ...ROOMS[0], tKey: 'st5100' as const },
    { ...ROOMS[1], tKey: 'st5200' as const },
    { ...ROOMS[2], tKey: 'st5300' as const },
    { ...ROOMS[3], tKey: 'st5400' as const },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 to-brand-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">{t('rooms.title')}</h1>
          <p className="text-slate-300 text-lg max-w-2xl">{t('rooms.subtitle')}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rooms.map((room) => (
              <Link
                key={room.id}
                href={`/monteurzimmer-augsburg/${room.slug}/` as any}
                className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-brand-300 hover:shadow-xl transition-all"
              >
                <div className="aspect-[16/9] bg-slate-200 relative overflow-hidden">
                  <img
                    src={room.images[0]}
                    alt={t(`rooms.${room.tKey}.name`)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 bg-slate-900/80 text-white text-sm font-bold px-3 py-1.5 rounded-lg">
                    {room.code}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {t(`rooms.${room.tKey}.name`)}
                  </h2>
                  <p className="text-slate-600 mb-4">{t(`rooms.${room.tKey}.desc`)}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                      {t(`rooms.${room.tKey}.capacity`)}
                    </span>
                    <span className="text-sm font-semibold text-brand-600 group-hover:translate-x-1 transition-transform">
                      {t('rooms.details')} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-2">{t('rooms.address')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
