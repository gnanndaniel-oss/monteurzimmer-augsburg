import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ROOMS, CONTACT } from '@/lib/constants';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations();

  const features = [
    { key: 'wifi', icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0' },
    { key: 'tv', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { key: 'kitchen', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { key: 'cleaning', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
    { key: 'washing', icon: 'M4 4v16h16V4H4zm8 11a3 3 0 100-6 3 3 0 000 6zm-5-8h2m2 0h2' },
    { key: 'parking', icon: 'M8 7h4a4 4 0 110 8H8V7zm0 8v4' },
  ];

  const pricingItems = [
    { label: t('pricing.shared'), price: t('pricing.sharedPrice') },
    { label: t('pricing.multi'), price: t('pricing.multiPrice') },
    { label: t('pricing.double'), price: t('pricing.doublePrice') },
    { label: t('pricing.single'), price: t('pricing.singlePrice') },
  ];

  const rooms = [
    { ...ROOMS[0], tKey: 'st5100' as const },
    { ...ROOMS[1], tKey: 'st5200' as const },
    { ...ROOMS[2], tKey: 'st5300' as const },
    { ...ROOMS[3], tKey: 'st5400' as const },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(/attachments/Image/Monteurwohnung_Augsburg__1-13.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-4">
              {t('hero.subtitle')}
            </p>
            <p className="inline-block bg-brand-600/20 border border-brand-500/30 text-brand-300 font-semibold px-4 py-2 rounded-full text-lg mb-8">
              {t('hero.fromPrice')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/reservierung-monterwohungaugsburg/"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-500 transition-colors text-lg"
              >
                {t('hero.cta')}
              </Link>
              <a
                href={CONTACT.phoneTel}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors text-lg"
              >
                {t('nav.callUs')}: {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {features.map((f) => (
              <div key={f.key} className="text-center p-4">
                <div className="w-12 h-12 mx-auto mb-3 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{t(`features.${f.key}`)}</h3>
                <p className="text-xs text-slate-500">{t(`features.${f.key}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-slate-50" id="preise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{t('pricing.title')}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t('pricing.subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {pricingItems.map((item, i) => (
              <div key={i} className={`rounded-xl p-6 text-center ${i === 0 ? 'bg-brand-600 text-white' : 'bg-white border border-slate-200'}`}>
                <p className={`text-sm font-medium mb-2 ${i === 0 ? 'text-brand-100' : 'text-slate-500'}`}>{item.label}</p>
                <p className={`text-2xl sm:text-3xl font-extrabold mb-1 ${i === 0 ? 'text-white' : 'text-slate-900'}`}>{item.price}</p>
                <p className={`text-xs ${i === 0 ? 'text-brand-200' : 'text-slate-400'}`}>{t('pricing.perPerson')}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-6">{t('pricing.seasonNote')}</p>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-16 bg-white" id="zimmer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{t('rooms.title')}</h2>
            <p className="text-slate-600">{t('rooms.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <Link
                key={room.id}
                href={`/monteurzimmer-augsburg/${room.slug}/` as any}
                className="group bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all"
              >
                <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden">
                  <img
                    src={room.images[0]}
                    alt={t(`rooms.${room.tKey}.name`)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                    {room.code}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">
                    {t(`rooms.${room.tKey}.name`)}
                  </h3>
                  <p className="text-sm text-slate-500 mb-3">{t(`rooms.${room.tKey}.desc`)}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
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
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-slate-50" id="lage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('location.title')}</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">{t('location.desc')}</p>
              <div className="space-y-4">
                {['nearFair', 'nearCenter', 'nearTransport', 'nearHighway'].map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700 font-medium">{t(`location.${key}`)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/3]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2656.5!2d10.8960!3d48.3656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479eb0f1a00d1b67%3A0x0!2sBarfu%C3%9Ferstra%C3%9Fe+7%2C+86150+Augsburg!5e0!3m2!1sde!2sde!4v1709500000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps - Monteurzimmer Augsburg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">{t('faq.title')}</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <details key={i} className="group bg-slate-50 rounded-xl border border-slate-200">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-semibold text-slate-900 select-none">
                  {t(`faq.q${i}`)}
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-slate-600 text-sm leading-relaxed">
                  {t(`faq.a${i}`)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-600 to-brand-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('hero.cta')}</h2>
          <p className="text-brand-100 text-lg mb-8">{t('hero.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reservierung-monterwohungaugsburg/"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-colors"
            >
              {t('nav.bookNow')}
            </Link>
            <a
              href={CONTACT.phoneTel}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-500 text-white font-bold rounded-xl hover:bg-brand-400 transition-colors"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
