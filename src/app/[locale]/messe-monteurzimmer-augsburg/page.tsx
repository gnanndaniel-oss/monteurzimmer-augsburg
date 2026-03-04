import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { CONTACT } from '@/lib/constants';
import { generateAlternates, generateOgMeta } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../messages/${locale}.json`)).default;
  const title = m.meta.titleFair; const desc = m.fair.desc; return { title, description: desc, alternates: generateAlternates('messe-monteurzimmer-augsburg', locale), openGraph: generateOgMeta(title, desc, 'messe-monteurzimmer-augsburg', locale) };
}

export default async function FairPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FairContent />;
}

function FairContent() {
  const t = useTranslations();

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 to-brand-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">{t('fair.title')}</h1>
          <p className="text-slate-300 text-lg max-w-3xl">{t('fair.desc')}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">{t('fair.advantages')}</h2>
            <div className="space-y-4 mb-12">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-brand-50 rounded-xl">
                  <div className="w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center shrink-0 font-bold text-sm">
                    {i}
                  </div>
                  <span className="font-medium text-slate-800">{t(`fair.adv${i}`)}</span>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">{t('pricing.title')}</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { l: 'pricing.single', p: 'pricing.singlePrice' },
                  { l: 'pricing.double', p: 'pricing.doublePrice' },
                  { l: 'pricing.multi', p: 'pricing.multiPrice' },
                  { l: 'pricing.shared', p: 'pricing.sharedPrice' },
                ].map((item, i) => (
                  <div key={i} className="text-center p-3 bg-white rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">{t(item.l)}</p>
                    <p className="font-bold text-slate-900">{t(item.p)}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mb-6">{t('pricing.seasonNote')}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/reservierung-monterwohungaugsburg/" className="flex-1 text-center px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors">
                  {t('nav.bookNow')}
                </Link>
                <a href={CONTACT.phoneTel} className="flex-1 text-center px-6 py-3 bg-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-300 transition-colors">
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
