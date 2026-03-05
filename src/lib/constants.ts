export const SITE_URL = 'https://www.monteurzimmer.augsburg-apartments.de';

export const CONTACT = {
  phone: '+49 (0) 821 419028-28',
  phoneTel: 'tel:+4982141902828',
  fax: '+49 (0) 821 419028-13',
  address: 'Barfüßerstraße 7, 86150 Augsburg',
  company: 'Gnann Verwaltung GmbH',
  ceo: 'Daniel Gnann',
} as const;

export const ROOMS = [
  {
    id: 'st5100',
    slug: 'monteurzimmer-augsburg-i-st5-100',
    code: 'ST5-100',
    capacity: 6,
    images: [
      '/attachments/Image/monteurzimmer-augsburg-st5-100-hauptbild.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-i-st5-100/monteurzimmer-augsburg-i-st5-100-bild-1.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-i-st5-100/monteurzimmer-augsburg-i-st5-100-bild-2.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-i-st5-100/monteurzimmer-augsburg-i-st5-100-bild-3.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-i-st5-100/monteurzimmer-augsburg-i-st5-100-bild-4.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-i-st5-100/monteurzimmer-augsburg-i-st5-100-bild-5.jpg',
    ],
  },
  {
    id: 'st5200',
    slug: 'monteurzimmer-augsburg-ii-st5-200',
    code: 'ST5-200',
    capacity: 7,
    images: [
      '/attachments/Image/monteurzimmer-augsburg-st5-200-hauptbild.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-ii-st5-200/monteurzimmer-augsburg-ii-st5-200-bild-1.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-ii-st5-200/monteurzimmer-augsburg-ii-st5-200-bild-2.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-ii-st5-200/monteurzimmer-augsburg-ii-st5-200-bild-3.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-ii-st5-200/monteurzimmer-augsburg-ii-st5-200-bild-4.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-ii-st5-200/monteurzimmer-augsburg-ii-st5-200-bild-5.jpg',
    ],
  },
  {
    id: 'st5300',
    slug: 'monteurzimmer-augsburg-iii-st5-300',
    code: 'ST5-300',
    capacity: 7,
    images: [
      '/attachments/Image/monteurzimmer-augsburg-st5-300-hauptbild.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-iii-st5-300/monteurzimmer-augsburg-iii-st5-300-bild-1.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-iii-st5-300/monteurzimmer-augsburg-iii-st5-300-bild-2.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-iii-st5-300/monteurzimmer-augsburg-iii-st5-300-bild-3.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-iii-st5-300/monteurzimmer-augsburg-iii-st5-300-bild-4.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-iii-st5-300/monteurzimmer-augsburg-iii-st5-300-bild-5.jpg',
    ],
  },
  {
    id: 'st5400',
    slug: 'monteurzimmer-augsburg-iv-st5-400',
    code: 'ST5-400',
    capacity: 12,
    images: [
      '/attachments/Image/monteurzimmer-augsburg-st5-400-hauptbild.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-iv-st5-400/monteurzimmer-augsburg-iv-st5-400-bild-1.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-iv-st5-400/monteurzimmer-augsburg-iv-st5-400-bild-2.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-iv-st5-400/monteurzimmer-augsburg-iv-st5-400-bild-3.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-iv-st5-400/monteurzimmer-augsburg-iv-st5-400-bild-4.jpg',
      '/data/imagegallery/monteurzimmer-augsburg-iv-st5-400/monteurzimmer-augsburg-iv-st5-400-bild-5.jpg',
    ],
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
