import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { CONTACT } from '@/lib/constants';
import { generateAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../messages/${locale}.json`)).default;
  return { title: m.meta.titleImprint, alternates: generateAlternates('impressum-montuerzimmer-augsburg', locale) };
}

export default async function ImprintPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ImprintContent />;
}

function ImprintContent() {
  const t = useTranslations('imprint');

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-10">{t('title')}</h1>

        <div className="prose prose-slate max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('responsible')}</h2>
            <p className="text-slate-600 leading-relaxed">
              {CONTACT.company}<br />
              {CONTACT.ceo}<br />
              {CONTACT.address}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('contact')}</h2>
            <p className="text-slate-600 leading-relaxed">
              Telefon: <a href={CONTACT.phoneTel} className="text-brand-600 hover:underline">{CONTACT.phone}</a><br />
              Fax: {CONTACT.fax}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('register')}</h2>
            <p className="text-slate-600 leading-relaxed">
              {t('registerCourt')}<br />
              HRB 19649
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('vatId')}</h2>
            <p className="text-slate-600 leading-relaxed">
              {t('vatNote')}<br />
              DE 258 801 058
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('dispute')}</h2>
            <p className="text-slate-600 leading-relaxed">{t('disputeText')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
