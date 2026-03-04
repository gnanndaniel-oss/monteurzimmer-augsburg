import { SITE_URL, CONTACT } from './constants';

const LOCALES = ['de', 'en', 'pl', 'cs', 'ro'] as const;

/**
 * Generate canonical URL and hreflang alternates for any page path.
 * @param path - Page path without locale prefix, e.g. 'monteurzimmer-augsburg/' or '' for homepage
 * @param locale - Current locale
 */
export function generateAlternates(path: string, locale: string) {
  const cleanPath = path ? `/${path.replace(/^\/|\/$/g, '')}/` : '/';

  const canonical =
    locale === 'de'
      ? `${SITE_URL}${cleanPath}`
      : `${SITE_URL}/${locale}${cleanPath}`;

  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[loc] =
      loc === 'de'
        ? `${SITE_URL}${cleanPath}`
        : `${SITE_URL}/${loc}${cleanPath}`;
  }
  languages['x-default'] = `${SITE_URL}${cleanPath}`;

  return { canonical, languages };
}

/**
 * Generate OpenGraph metadata for a page.
 */
export function generateOgMeta(
  title: string,
  description: string,
  path: string,
  locale: string,
  image?: string
) {
  const cleanPath = path ? `/${path.replace(/^\/|\/$/g, '')}/` : '/';
  const url =
    locale === 'de'
      ? `${SITE_URL}${cleanPath}`
      : `${SITE_URL}/${locale}${cleanPath}`;

  return {
    title,
    description,
    url,
    siteName: 'Monteurzimmer Augsburg',
    locale: locale === 'de' ? 'de_DE' : locale,
    type: 'website' as const,
    images: [
      {
        url: image || `${SITE_URL}/attachments/Image/Monteurwohnung_Augsburg__1-13.jpg`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };
}

/**
 * Generate BreadcrumbList JSON-LD schema.
 */
export function generateBreadcrumbSchema(
  items: { name: string; path?: string }[],
  locale: string
) {
  const prefix = locale === 'de' ? SITE_URL : `${SITE_URL}/${locale}`;

  const listItems = items.map((item, i) => ({
    '@type': 'ListItem' as const,
    position: i + 1,
    name: item.name,
    ...(item.path !== undefined
      ? { item: `${prefix}${item.path ? `/${item.path}/` : '/'}` }
      : {}),
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: listItems,
  };
}

/**
 * Generate HotelRoom JSON-LD schema for individual room detail pages.
 */
export function generateRoomSchema(room: {
  name: string;
  description: string;
  code: string;
  capacity: number;
  images: string[];
  slug: string;
}, locale: string) {
  const prefix = locale === 'de' ? SITE_URL : `${SITE_URL}/${locale}`;
  const url = `${prefix}/monteurzimmer-augsburg/${room.slug}/`;

  return {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: room.name,
    description: room.description,
    identifier: room.code,
    url,
    image: room.images.map((img) => `${SITE_URL}${img}`),
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: room.capacity,
      unitText: 'persons',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Kitchen', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'TV', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Washing Machine', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Weekly Cleaning', value: true },
    ],
    bed: {
      '@type': 'BedDetails',
      typeOfBed: 'Single, Double, Triple',
      numberOfBeds: room.capacity,
    },
    containedInPlace: {
      '@type': 'LodgingBusiness',
      name: 'Monteurzimmer Augsburg',
      url: SITE_URL,
      telephone: CONTACT.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Barfüßerstraße 7',
        addressLocality: 'Augsburg',
        addressRegion: 'Bayern',
        postalCode: '86150',
        addressCountry: 'DE',
      },
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: '12',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      url,
      description: 'Ab 12€ pro Person pro Nacht',
    },
  };
}
