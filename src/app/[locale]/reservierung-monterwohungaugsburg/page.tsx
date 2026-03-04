import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';
import { CONTACT } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = (await import(`../../../../messages/${locale}.json`)).default;
  return { title: m.meta.titleReservation, description: m.form.subtitle };
}

export default async function ReservationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ReservationContent />;
}

function ReservationContent() {
  const t = useTranslations();

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 to-brand-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">{t('form.title')}</h1>
          <p className="text-slate-300 text-lg">{t('form.subtitle')}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">{t('contact.title')}</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-slate-700 mb-1">Telefon</p>
                    <a href={CONTACT.phoneTel} className="text-brand-600 hover:underline font-medium">{CONTACT.phone}</a>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
