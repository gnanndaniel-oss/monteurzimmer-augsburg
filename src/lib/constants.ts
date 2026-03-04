export const SITE_URL = 'https://www.monteurzimmer.augsburg-apartments.de';

export const CONTACT = {
  phone: '+49 (0) 821 419028-28',
  phoneTel: 'tel:+498214190288',
  fax: '+49 (0) 821 419028-13',
  address: 'Barfüßerstraße 7, 86150 Augsburg',
  company: 'Gnann Verwaltung GmbH',
  ceo: 'Norbert Gnann',
} as const;

export const ROOMS = [
  {
    id: 'st5100',
    slug: 'monteurzimmer-augsburg-i-st5-100',
    code: 'ST5-100',
    capacity: 6,
    images: ['ST5_100-1030823.jpg'],
  },
  {
    id: 'st5200',
    slug: 'monteurzimmer-augsburg-ii-st5-200',
    code: 'ST5-200',
    capacity: 7,
    images: ['ST5_200-main.jpg'],
  },
  {
    id: 'st5300',
    slug: 'monteurzimmer-augsburg-iii-st5-300',
    code: 'ST5-300',
    capacity: 7,
    images: ['ST5_300-1030843.jpg'],
  },
  {
    id: 'st5400',
    slug: 'monteurzimmer-augsburg-iv-st5-400',
    code: 'ST5-400',
    capacity: 12,
    images: ['ST5_400-main.jpg'],
  },
] as const;

export const LOCALE_FLAGS: Record<string, string> = {
  de: '🇩🇪',
  en: '🇬🇧',
  pl: '🇵🇱',
  cs: '🇨🇿',
  ro: '🇷🇴',
};

export const LOCALE_NAMES: Record<string, string> = {
  de: 'Deutsch',
  en: 'English',
  pl: 'Polski',
  cs: 'Čeština',
  ro: 'Română',
};
