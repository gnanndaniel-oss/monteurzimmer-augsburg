'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CONTACT } from '@/lib/constants';

type Props = {
  roomKey: 'st5100' | 'st5200' | 'st5300' | 'st5400';
  images: string[];
};

export default function RoomDetailPage({ roomKey, images }: Props) {
  const t = useTranslations();

  const amenities = ['wifi', 'tv', 'kitchen', 'cleaning', 'washing', 'parking'];

  const pricingItems = [
    { label: t('pricing.shared'), price: t('pricing.sharedPrice') },
    { label: t('pricing.multi'), price: t('pricing.multiPrice') },
    { label: t('pricing.double'), price: t('pricing.doublePrice') },
    { label: t('pricing.single'), price: t('pricing.singlePrice') },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 to-brand-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/monteurzimmer-augsburg/" className="hover:text-brand-400 transition-colors">
              {t('nav.rooms')}
            </Link>
            <span>/</span>
            <span className="text-white">{t(`rooms.${roomKey}.code`)}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
            {t(`rooms.${roomKey}.name`)}
          </h1>
          <p className="text-slate-300 text-lg">{t(`rooms.${roomKey}.desc`)}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Image Gallery */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('rooms.gallery')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img, i) => (
                <div key={i} className="aspect-[4/3] bg-slate-200 rounded-xl overflow-hidden">
                  <img
                    src={img}
                    alt={`${t(`rooms.${roomKey}.name`)} - ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Amenities */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('rooms.amenities')}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
                {amenities.map((key) => (
                  <div key={key} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-8 h-8 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{t(`features.${key}`)}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{t(`features.${key}Desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Location */}
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('rooms.location')}</h2>
              <p className="text-slate-600 mb-4">{t('rooms.address')}</p>
              <div className="rounded-xl overflow-hidden border border-slate-200 aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2656.5!2d10.8960!3d48.3656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sStiermannstra%C3%9Fe+5%2C+86154+Augsburg!5e0!3m2!1sde!2sde"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Google Maps"
                />
              </div>
            </div>

            {/* Right: Pricing sidebar */}
            <div>
              <div className="sticky top-24 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{t('pricing.title')}</h3>
                <div className="space-y-3 mb-6">
                  {pricingItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                      <span className="text-sm text-slate-600">{item.label}</span>
                      <span className="font-bold text-slate-900">{item.price}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mb-6">{t('pricing.seasonNote')}</p>

                <Link
                  href="/reservierung-monterwohungaugsburg/"
                  className="block w-full text-center px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors mb-3"
                >
                  {t('nav.bookNow')}
                </Link>
                <a
                  href={CONTACT.phoneTel}
                  className="block w-full text-center px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
