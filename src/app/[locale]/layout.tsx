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
    icons: {
      icon: '/favicon.ico',
    },
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
      images: [
        {
          url: `${SITE_URL}/attachments/Image/Monteurwohnung_Augsburg__1-13.jpg`,
          width: 1200,
          height: 630,
          alt: 'Monteurzimmer Augsburg',
        },
      ],
    },
    other: {
      'geo.region': 'DE-BY',
      'geo.placename': 'Augsburg',
      'geo.position': '48.3656;10.8986',
      'ICBM': '48.3656, 10.8986',
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
    alternateName: 'Augsburg Apartments - Monteurzimmer',
    description: 'Günstige Monteurzimmer & Monteurwohnungen in Augsburg ab 12€/Nacht. Voll ausgestattet mit WLAN, Küche, TV. Ideal für Monteure, Handwerker und Geschäftsreisende.',
    url: SITE_URL,
    telephone: CONTACT.phone,
    faxNumber: CONTACT.fax,
    email: 'info@augsburg-apartments.de',
    image: `${SITE_URL}/attachments/Image/Monteurwohnung_Augsburg__1-13.jpg`,
    logo: `${SITE_URL}/attachments/Image/Augsburg_Apartments_Logo.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Barfüßerstraße 7',
      addressLocality: 'Augsburg',
      addressRegion: 'Bayern',
      postalCode: '86150',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.3656,
      longitude: 10.8986,
    },
    hasMap: 'https://www.google.com/maps?q=Barfüßerstraße+7,+86150+Augsburg',
    priceRange: '€12 - €50',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Bank Transfer',
    openingHours: 'Mo-Su 08:00-20:00',
    starRating: {
      '@type': 'Rating',
      ratingValue: '4',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Kitchen', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'TV', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Washing Machine', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Weekly Cleaning', value: true },
    ],
    numberOfRooms: 4,
    petsAllowed: false,
    checkinTime: '14:00',
    checkoutTime: '11:00',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 48.3656,
        longitude: 10.8986,
      },
      geoRadius: '50000',
    },
    sameAs: [
      'https://www.apartment-augsburg.de',
      'https://www.wohnbaron.de',
      'https://www.relocation-augsburg.de',
      'https://www.goldener-falke.de',
    ],
  };

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Monteurzimmer Augsburg',
    image: `${SITE_URL}/attachments/Image/Monteurwohnung_Augsburg__1-13.jpg`,
    telephone: CONTACT.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Barfüßerstraße 7',
      addressLocality: 'Augsburg',
      addressRegion: 'Bayern',
      postalCode: '86150',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.3656,
      longitude: 10.8986,
    },
    url: SITE_URL,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
    },
  };

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="geo.region" content="DE-BY" />
        <meta name="geo.placename" content="Augsburg" />
        <meta name="geo.position" content="48.3656;10.8986" />
        <meta name="ICBM" content="48.3656, 10.8986" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
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
