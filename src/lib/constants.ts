export const SITE_URL = 'https://www.monteurzimmer.augsburg-apartments.de';

export const CONTACT = {
  phone: '+49 (0) 821 419028-28',
  phoneTel: 'tel:+498214190288',
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
      '/attachments/Image/ST5_100-1030823.jpg',
      '/data/imagegallery/772f3136-e8ec-45fd-2fa1-f4f7e236c62d/00420915-d56c-1acc-6112-0cc70fc40f03.jpg',
      '/data/imagegallery/772f3136-e8ec-45fd-2fa1-f4f7e236c62d/14754b0e-795a-b339-ea2e-3c7bfe968431.jpg',
      '/data/imagegallery/772f3136-e8ec-45fd-2fa1-f4f7e236c62d/62a0d615-f853-c38e-c57e-7f9b593b52fb.jpg',
      '/data/imagegallery/772f3136-e8ec-45fd-2fa1-f4f7e236c62d/68370a01-9a2b-bbcc-ac7c-2bf7f043a8b3.jpg',
    ],
  },
  {
    id: 'st5200',
    slug: 'monteurzimmer-augsburg-ii-st5-200',
    code: 'ST5-200',
    capacity: 7,
    images: [
      '/data/imagegallery/80f0cebb-b7c4-e4af-d3af-e47c489bbd8f/06cfde35-8a94-d46d-f895-d39e54f95d5f.jpg',
      '/data/imagegallery/80f0cebb-b7c4-e4af-d3af-e47c489bbd8f/0719b876-bda5-08f6-fff3-717d7775cd76.jpg',
      '/data/imagegallery/80f0cebb-b7c4-e4af-d3af-e47c489bbd8f/353b151f-6fc1-38d6-3207-b6d1740245fd.jpg',
      '/data/imagegallery/80f0cebb-b7c4-e4af-d3af-e47c489bbd8f/391757c2-88f5-1edb-17ce-321a78836131.jpg',
      '/data/imagegallery/80f0cebb-b7c4-e4af-d3af-e47c489bbd8f/6e049229-5939-ad26-ad1f-1cb4834e30d0.jpg',
    ],
  },
  {
    id: 'st5300',
    slug: 'monteurzimmer-augsburg-iii-st5-300',
    code: 'ST5-300',
    capacity: 7,
    images: [
      '/attachments/Image/ST5_300-1030843.jpg',
      '/data/imagegallery/81417c56-b208-882f-7038-9dbebef92cc0/5210d324-0a14-95a1-a399-4bed55403e8b.jpg',
      '/data/imagegallery/81417c56-b208-882f-7038-9dbebef92cc0/66d4b41b-a37b-c0f6-3e2a-3de7d39a8dc8.jpg',
      '/data/imagegallery/81417c56-b208-882f-7038-9dbebef92cc0/a7c6c1eb-5ba4-846c-691e-b70ba7edcba2.jpg',
      '/data/imagegallery/81417c56-b208-882f-7038-9dbebef92cc0/cf2fc5d8-5618-dc2a-1f80-75b7c7d5889e.jpg',
    ],
  },
  {
    id: 'st5400',
    slug: 'monteurzimmer-augsburg-iv-st5-400',
    code: 'ST5-400',
    capacity: 12,
    images: [
      '/data/imagegallery/8fe64f03-9b24-03cf-8e4e-9073c9c884db/28b7263b-635e-b239-0892-4d84fe418771.jpg',
      '/data/imagegallery/8fe64f03-9b24-03cf-8e4e-9073c9c884db/4f2045f4-e9be-bff7-944a-7a138a94563d.jpg',
      '/data/imagegallery/8fe64f03-9b24-03cf-8e4e-9073c9c884db/7545b6c3-4c72-9726-d118-4c26306b027e.jpg',
      '/data/imagegallery/8fe64f03-9b24-03cf-8e4e-9073c9c884db/75fced4e-4759-4f9c-556b-aeba47ecf0a3.jpg',
      '/data/imagegallery/8fe64f03-9b24-03cf-8e4e-9073c9c884db/777612af-6a41-9a89-c3da-9a44d217c66c.jpg',
      '/data/imagegallery/8fe64f03-9b24-03cf-8e4e-9073c9c884db/82542219-334a-47f3-6ef5-a80ed96f91c6.jpg',
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
