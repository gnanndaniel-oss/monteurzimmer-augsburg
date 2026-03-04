import { SITE_URL } from './constants';

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
