import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';
import { CONTACT } from '@/lib/constants';
import { generateAlternates, generateOgMeta, generateBreadcrumbSchema } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../messages/${locale}.json`)).default;
  const title = m.meta.titleContact;
  const desc = m.form.subtitle;
  return {
    title,
    description: desc,
    alternates: generateAlternates('kontakt', locale),
    openGraph: generateOgMeta(title, desc, 'kontakt', locale),
  };
}

export default async function KontaktPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../messages/${locale}.json`)).default;
  const breadcrumb = generateBreadcrumbSchema([
    { name: m.nav.home, path: '' },
    { name: m.nav.contact },
  ], locale);
  setRequestLocale(locale);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <KontaktContent />
    </>
  );
}

function KontaktContent() {
  const t = useTranslations();

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 to-brand-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">{t('contact.title')}</h1>
          <p className="text-slate-300 text-lg">{t('form.subtitle')}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">{t('contact.title')}</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-slate-700 mb-1">Telefon</p>
                    <a href={CONTACT.phoneTel} className="text-brand-600 hover:underline font-medium text-base">{CONTACT.phone}</a>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700 mb-1">Fax</p>
                    <p className="text-slate-600">{CONTACT.fax}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700 mb-1">Adresse</p>
                    <p className="text-slate-600">{CONTACT.address}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700 mb-1">{t('contact.company')}</p>
                    <p className="text-slate-600">{CONTACT.company}</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-600 rounded-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">{t('nav.callUs')}</h3>
                <a
                  href={CONTACT.phoneTel}
                  className="text-2xl font-bold hover:text-brand-200 transition-colors block"
                >
                  {CONTACT.phone}
                </a>
                <p className="text-brand-100 text-sm mt-2">Mo–Fr 8–18 Uhr</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
