import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import { SITE_URL, CONTACT } from '@/lib/constants';
import '@/app/globals.css';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = messages.meta;

  return {
    title: t.title,
    description: t.description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: SITE_URL,
      languages: {
        de: SITE_URL,
        en: `${SITE_URL}/en/`,
        pl: `${SITE_URL}/pl/`,
        cs: `${SITE_URL}/cs/`,
        ro: `${SITE_URL}/ro/`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: SITE_URL,
      siteName: 'Monteurzimmer Augsburg',
      locale: locale === 'de' ? 'de_DE' : locale,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: 'Monteurzimmer Augsburg',
    description: 'Günstige Monteurzimmer & Monteurwohnungen in Augsburg',
    url: SITE_URL,
    telephone: CONTACT.phone,
    faxNumber: CONTACT.fax,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Barfüßerstraße 7',
      addressLocality: 'Augsburg',
      postalCode: '86150',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.3656,
      longitude: 10.8986,
    },
    priceRange: '€12 - €50',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Bank Transfer',
    openingHours: 'Mo-Su 08:00-20:00',
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Parking', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Kitchen', value: true },
    ],
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
