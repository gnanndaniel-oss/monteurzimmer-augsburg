'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CONTACT } from '@/lib/constants';

type PricingItem = { labelKey: string; priceKey: string };

type Props = {
  titleKey: string;
  descKey: string;
  pricing: PricingItem[];
  images: string[];
};

export default function CategoryPage({ titleKey, descKey, pricing, images }: Props) {
  const t = useTranslations();

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 to-brand-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">{t(titleKey)}</h1>
          <p className="text-slate-300 text-lg max-w-3xl">{t(descKey)}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Images */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {images.map((img, i) => (
                    <div key={i} className="aspect-[4/3] bg-slate-200 rounded-xl overflow-hidden">
                      <img src={`/images/${img}`} alt={`${t(titleKey)} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              )}

              {/* Amenities */}
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('rooms.amenities')}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
                {['wifi', 'tv', 'kitchen', 'cleaning', 'washing', 'parking'].map((key) => (
                  <div key={key} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <svg className="w-5 h-5 text-brand-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-medium text-slate-700">{t(`features.${key}`)}</span>
                  </div>
                ))}
              </div>

              {/* Location */}
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('rooms.location')}</h2>
              <p className="text-slate-600 mb-4">{t('contact.address')}</p>
              <div className="rounded-xl overflow-hidden border border-slate-200 aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2656.5!2d10.8960!3d48.3656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBarfu%C3%9Ferstra%C3%9Fe+7%2C+86150+Augsburg!5e0!3m2!1sde!2sde"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Maps"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{t('pricing.title')}</h3>
                <div className="space-y-3 mb-6">
                  {pricing.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                      <span className="text-sm text-slate-600">{t(item.labelKey)}</span>
                      <span className="font-bold text-slate-900">{t(item.priceKey)}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mb-6">{t('pricing.seasonNote')}</p>
                <Link href="/reservierung-monterwohungaugsburg/" className="block w-full text-center px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors mb-3">
                  {t('nav.bookNow')}
                </Link>
                <a href={CONTACT.phoneTel} className="block w-full text-center px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors">
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
