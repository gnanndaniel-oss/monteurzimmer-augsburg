/**
 * Kleine UI-Texte, die bisher fest auf Deutsch im Code standen
 * (Galerie-Titel, Kontakt-Kacheln, Ratgeber-Oberfläche).
 */
export type Loc = 'de' | 'en' | 'pl' | 'cs' | 'ro';

export const LOCS: Loc[] = ['de', 'en', 'pl', 'cs', 'ro'];

/** Sprachen, in denen der Ratgeber übersetzt vorliegt. */
export const BLOG_LOCALES = ['de', 'en', 'pl'] as const;
export type BlogLoc = (typeof BLOG_LOCALES)[number];

export function asLoc(locale: string): Loc {
  return (LOCS as string[]).includes(locale) ? (locale as Loc) : 'de';
}

export function isBlogLocale(locale: string): locale is BlogLoc {
  return (BLOG_LOCALES as readonly string[]).includes(locale);
}

/** Pfad mit Sprachpräfix (DE ohne Präfix). */
export function localePath(locale: string, path: string): string {
  return locale === 'de' ? path : `/${locale}${path}`;
}

type UiStrings = {
  galleryApartment: string;
  galleryStudio: string;
  phone: string;
  address: string;
  hours: string;
  faqFallback: string;
};

export const UI: Record<Loc, UiStrings> = {
  de: {
    galleryApartment: 'Fotos: So wohnen Monteure bei uns',
    galleryStudio: 'Fotos: Einblick in unsere Apartments',
    phone: 'Telefon',
    address: 'Adresse',
    hours: 'Mo–Fr 8–18 Uhr',
    faqFallback: 'Häufige Fragen',
  },
  en: {
    galleryApartment: "Photos: how workers live with us",
    galleryStudio: 'Photos: a look inside our apartments',
    phone: 'Phone',
    address: 'Address',
    hours: 'Mon–Fri 8 am–6 pm',
    faqFallback: 'Frequently asked questions',
  },
  pl: {
    galleryApartment: 'Zdjęcia: tak mieszkają u nas monterzy',
    galleryStudio: 'Zdjęcia: wnętrza naszych apartamentów',
    phone: 'Telefon',
    address: 'Adres',
    hours: 'pn.–pt. 8:00–18:00',
    faqFallback: 'Najczęściej zadawane pytania',
  },
  cs: {
    galleryApartment: 'Fotografie: takhle u nás bydlí montéři',
    galleryStudio: 'Fotografie: pohled do našich apartmánů',
    phone: 'Telefon',
    address: 'Adresa',
    hours: 'po–pá 8:00–18:00',
    faqFallback: 'Často kladené otázky',
  },
  ro: {
    galleryApartment: 'Fotografii: așa locuiesc muncitorii la noi',
    galleryStudio: 'Fotografii: interiorul apartamentelor noastre',
    phone: 'Telefon',
    address: 'Adresă',
    hours: 'luni–vineri 8:00–18:00',
    faqFallback: 'Întrebări frecvente',
  },
};

type BlogStrings = {
  home: string;
  guides: string;
  breadcrumbLabel: string;
  readingTime: (min: number) => string;
  ctaTitle: string;
  ctaText: (company: string) => string;
  ctaButton: string;
  more: string;
  readMore: string;
  indexH1: string;
  indexLead: string;
  indexName: string;
  dateLocale: string;
  inLanguage: string;
  footerLabel: string;
  germanNote?: string;
};

export const BLOG_UI: Record<BlogLoc, BlogStrings> = {
  de: {
    home: 'Startseite',
    guides: 'Ratgeber',
    breadcrumbLabel: 'Brotkrumen',
    readingTime: (m) => `${m} Min. Lesezeit`,
    ctaTitle: 'Unterkunft für Ihr Team in Augsburg anfragen',
    ctaText: (c) =>
      `Monteurzimmer ab 12 € pro Person/Nacht, Wohnungen und Häuser für bis zu 20 Personen – direkt bei der ${c}.`,
    ctaButton: 'Jetzt anfragen',
    more: 'Weitere Ratgeber',
    readMore: 'Weiterlesen →',
    indexH1: 'Ratgeber für Monteure, Handwerker & Firmen',
    indexLead:
      'Praxiswissen rund um Montage in Augsburg: Steuern und Abrechnung, Buchung für Montageteams, Zimmer oder Wohnung, Parken mit Firmenfahrzeug, Einkauf von Material, Alltag und Sport nach Feierabend.',
    indexName: 'Ratgeber – Monteurzimmer Augsburg',
    dateLocale: 'de-DE',
    inLanguage: 'de-DE',
    footerLabel: 'Ratgeber',
  },
  en: {
    home: 'Home',
    guides: 'Guides',
    breadcrumbLabel: 'Breadcrumb',
    readingTime: (m) => `${m} min read`,
    ctaTitle: 'Request accommodation for your team in Augsburg',
    ctaText: (c) =>
      `Workers' rooms from €12 per person per night, apartments and houses for up to 20 people – booked directly with ${c}.`,
    ctaButton: 'Send an enquiry',
    more: 'More guides',
    readMore: 'Read more →',
    indexH1: 'Guides for fitters, tradespeople & companies',
    indexLead:
      'Practical know-how for jobs in Augsburg: tax and invoicing, booking for installation teams, room or apartment, parking with a company van, buying materials, everyday life and sport after work.',
    indexName: "Guides – Monteurzimmer Augsburg",
    dateLocale: 'en-GB',
    inLanguage: 'en',
    footerLabel: 'Guides',
  },
  pl: {
    home: 'Strona główna',
    guides: 'Poradnik',
    breadcrumbLabel: 'Ścieżka nawigacji',
    readingTime: (m) => `${m} min czytania`,
    ctaTitle: 'Zapytaj o nocleg dla swojej ekipy w Augsburgu',
    ctaText: (c) =>
      `Pokoje dla monterów od 12 € za osobę za noc, mieszkania i domy dla maksymalnie 20 osób – bezpośrednio u ${c}.`,
    ctaButton: 'Wyślij zapytanie',
    more: 'Więcej poradników',
    readMore: 'Czytaj dalej →',
    indexH1: 'Poradnik dla monterów, fachowców i firm',
    indexLead:
      'Praktyczna wiedza o pracy w Augsburgu: podatki i rozliczenia, rezerwacja dla ekip montażowych, pokój czy mieszkanie, parkowanie busem firmowym, zakup materiałów, codzienność i sport po pracy.',
    indexName: 'Poradnik – Monteurzimmer Augsburg',
    dateLocale: 'pl-PL',
    inLanguage: 'pl',
    footerLabel: 'Poradnik',
  },
};

/** Übersetzte alt-Texte der eigenen Fotos (Schlüssel = Bildpfad). */
export const PHOTO_ALT: Record<Exclude<Loc, 'de'>, Record<string, string>> = {
  en: {
    'monteurwohnung-augsburg-wohnkueche-esstisch': "Open-plan kitchen with a large dining table in a workers' apartment in Augsburg",
    'monteurwohnung-augsburg-kueche': "Fully equipped kitchen with hob, oven and fridge in a workers' apartment in Augsburg",
    'monteurwohnung-augsburg-dreibettzimmer': "Triple room with single beds in a workers' apartment in Augsburg",
    'monteurwohnung-augsburg-zweibettzimmer': "Twin room with single beds and a table in a workers' apartment in Augsburg",
    'monteurwohnung-augsburg-zweibettzimmer-dachschraege': "Twin room with sloping ceiling in a workers' apartment in Augsburg",
    'monteurwohnung-augsburg-einzelzimmer': "Single room with wardrobe, desk and TV in a workers' apartment in Augsburg",
    'monteurwohnung-augsburg-zimmer-mit-tisch': "Room with two beds and a dining table in a workers' apartment in Augsburg",
    'monteurwohnung-augsburg-waschraum': "Washroom with several basins in a workers' apartment in Augsburg",
    'monteurapartment-augsburg-wohnbereich': 'Living area with sofa and dining space in a furnished apartment in Augsburg',
    'monteurapartment-augsburg-kueche': 'Kitchen with hob, oven and microwave in a furnished apartment in Augsburg',
    'monteurapartment-augsburg-schlafzimmer': 'Bedroom with double bed and TV in a furnished apartment in Augsburg',
    'monteurapartment-augsburg-einzelzimmer': 'Single room in a furnished apartment in Augsburg',
    'monteurapartment-augsburg-bad-waschmaschine': 'Bathroom with shower and washing machine in a furnished apartment in Augsburg',
  },
  pl: {
    'monteurwohnung-augsburg-wohnkueche-esstisch': 'Kuchnia z dużym stołem jadalnym w mieszkaniu dla monterów w Augsburgu',
    'monteurwohnung-augsburg-kueche': 'W pełni wyposażona kuchnia z płytą, piekarnikiem i lodówką w mieszkaniu dla monterów w Augsburgu',
    'monteurwohnung-augsburg-dreibettzimmer': 'Pokój 3-osobowy z pojedynczymi łóżkami w mieszkaniu dla monterów w Augsburgu',
    'monteurwohnung-augsburg-zweibettzimmer': 'Pokój 2-osobowy z pojedynczymi łóżkami i stołem w mieszkaniu dla monterów w Augsburgu',
    'monteurwohnung-augsburg-zweibettzimmer-dachschraege': 'Pokój 2-osobowy ze skosem w mieszkaniu dla monterów w Augsburgu',
    'monteurwohnung-augsburg-einzelzimmer': 'Pokój 1-osobowy z szafą, biurkiem i telewizorem w mieszkaniu dla monterów w Augsburgu',
    'monteurwohnung-augsburg-zimmer-mit-tisch': 'Pokój z dwoma łóżkami i stołem w mieszkaniu dla monterów w Augsburgu',
    'monteurwohnung-augsburg-waschraum': 'Łazienka z kilkoma umywalkami w mieszkaniu dla monterów w Augsburgu',
    'monteurapartment-augsburg-wohnbereich': 'Część dzienna z sofą i stołem w umeblowanym apartamencie w Augsburgu',
    'monteurapartment-augsburg-kueche': 'Kuchnia z płytą, piekarnikiem i mikrofalówką w umeblowanym apartamencie w Augsburgu',
    'monteurapartment-augsburg-schlafzimmer': 'Sypialnia z łóżkiem podwójnym i telewizorem w umeblowanym apartamencie w Augsburgu',
    'monteurapartment-augsburg-einzelzimmer': 'Pokój 1-osobowy w umeblowanym apartamencie w Augsburgu',
    'monteurapartment-augsburg-bad-waschmaschine': 'Łazienka z prysznicem i pralką w umeblowanym apartamencie w Augsburgu',
  },
  cs: {
    'monteurwohnung-augsburg-wohnkueche-esstisch': 'Obytná kuchyně s velkým jídelním stolem v bytě pro montéry v Augsburgu',
    'monteurwohnung-augsburg-kueche': 'Plně vybavená kuchyně se sporákem, troubou a lednicí v bytě pro montéry v Augsburgu',
    'monteurwohnung-augsburg-dreibettzimmer': 'Třílůžkový pokoj s jednolůžky v bytě pro montéry v Augsburgu',
    'monteurwohnung-augsburg-zweibettzimmer': 'Dvoulůžkový pokoj s jednolůžky a stolem v bytě pro montéry v Augsburgu',
    'monteurwohnung-augsburg-zweibettzimmer-dachschraege': 'Dvoulůžkový pokoj se šikmým stropem v bytě pro montéry v Augsburgu',
    'monteurwohnung-augsburg-einzelzimmer': 'Jednolůžkový pokoj se skříní, psacím stolem a televizí v bytě pro montéry v Augsburgu',
    'monteurwohnung-augsburg-zimmer-mit-tisch': 'Pokoj se dvěma lůžky a jídelním stolem v bytě pro montéry v Augsburgu',
    'monteurwohnung-augsburg-waschraum': 'Umývárna s několika umyvadly v bytě pro montéry v Augsburgu',
    'monteurapartment-augsburg-wohnbereich': 'Obývací část s pohovkou a jídelním koutem v zařízeném apartmánu v Augsburgu',
    'monteurapartment-augsburg-kueche': 'Kuchyně s varnou deskou, troubou a mikrovlnkou v zařízeném apartmánu v Augsburgu',
    'monteurapartment-augsburg-schlafzimmer': 'Ložnice s manželskou postelí a televizí v zařízeném apartmánu v Augsburgu',
    'monteurapartment-augsburg-einzelzimmer': 'Jednolůžkový pokoj v zařízeném apartmánu v Augsburgu',
    'monteurapartment-augsburg-bad-waschmaschine': 'Koupelna se sprchou a pračkou v zařízeném apartmánu v Augsburgu',
  },
  ro: {
    'monteurwohnung-augsburg-wohnkueche-esstisch': 'Bucătărie cu masă mare de luat masa într-un apartament pentru muncitori din Augsburg',
    'monteurwohnung-augsburg-kueche': 'Bucătărie complet utilată cu plită, cuptor și frigider într-un apartament pentru muncitori din Augsburg',
    'monteurwohnung-augsburg-dreibettzimmer': 'Cameră triplă cu paturi single într-un apartament pentru muncitori din Augsburg',
    'monteurwohnung-augsburg-zweibettzimmer': 'Cameră dublă cu paturi single și masă într-un apartament pentru muncitori din Augsburg',
    'monteurwohnung-augsburg-zweibettzimmer-dachschraege': 'Cameră dublă la mansardă într-un apartament pentru muncitori din Augsburg',
    'monteurwohnung-augsburg-einzelzimmer': 'Cameră single cu dulap, birou și TV într-un apartament pentru muncitori din Augsburg',
    'monteurwohnung-augsburg-zimmer-mit-tisch': 'Cameră cu două paturi și masă într-un apartament pentru muncitori din Augsburg',
    'monteurwohnung-augsburg-waschraum': 'Spălător cu mai multe chiuvete într-un apartament pentru muncitori din Augsburg',
    'monteurapartment-augsburg-wohnbereich': 'Living cu canapea și loc de luat masa într-un apartament mobilat din Augsburg',
    'monteurapartment-augsburg-kueche': 'Bucătărie cu plită, cuptor și microunde într-un apartament mobilat din Augsburg',
    'monteurapartment-augsburg-schlafzimmer': 'Dormitor cu pat dublu și TV într-un apartament mobilat din Augsburg',
    'monteurapartment-augsburg-einzelzimmer': 'Cameră single într-un apartament mobilat din Augsburg',
    'monteurapartment-augsburg-bad-waschmaschine': 'Baie cu duș și mașină de spălat într-un apartament mobilat din Augsburg',
  },
};

/** Liefert das Foto mit alt-Text in der jeweiligen Sprache. */
export function localizePhoto<T extends { src: string; alt: string }>(photo: T, locale: string): T {
  const loc = asLoc(locale);
  if (loc === 'de') return photo;
  const key = photo.src.split('/').pop()!.replace(/\.[a-z]+$/, '');
  return { ...photo, alt: PHOTO_ALT[loc][key] ?? photo.alt };
}
