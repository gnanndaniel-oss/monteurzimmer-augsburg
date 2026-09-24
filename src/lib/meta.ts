import { generateAlternates, generateOgMeta } from './seo';

/**
 * Zentrale Titles & Meta-Descriptions pro Seite und Sprache.
 * Regeln: Title ≤ 60 Zeichen (absolut, ohne Template-Suffix), Keyword vorn;
 * Description 140–160 Zeichen; pro Seite einzigartig.
 */

type Meta = { title: string; description: string };
type Loc = 'de' | 'en' | 'pl' | 'cs' | 'ro';

export type PageKey =
  | 'home'
  | 'rooms'
  | 'apartment'
  | 'monteurapartment'
  | 'house'
  | 'fair'
  | 'reservation'
  | 'contact'
  | 'imprint'
  | 'privacy';

const META: Record<PageKey, Record<Loc, Meta>> = {
  home: {
    de: {
      title: 'Monteurzimmer Augsburg ab 12 €/Nacht – direkt vom Vermieter',
      description:
        'Monteurzimmer & Monteurwohnungen in Augsburg ab 12 € pro Person/Nacht: möbliert, Küche, WLAN, kostenlose Parkplätze. Für 1–20 Personen, direkt beim Vermieter.',
    },
    en: {
      title: "Workers' Accommodation Augsburg from €12/night",
      description:
        "Furnished workers' rooms and apartments in Augsburg, Germany, from €12 per person per night: kitchen, Wi-Fi, free parking. For 1–20 guests, booked directly.",
    },
    pl: {
      title: 'Pokoje dla monterów Augsburg od 12 €/noc – bez pośrednika',
      description:
        'Umeblowane pokoje i mieszkania dla monterów w Augsburgu od 12 € za osobę/noc: kuchnia, Wi-Fi, bezpłatny parking. Dla 1–20 osób, rezerwacja bezpośrednio.',
    },
    cs: {
      title: 'Ubytování pro montéry Augsburg od 12 €/noc',
      description:
        'Zařízené pokoje a byty pro montéry v Augsburgu od 12 € za osobu a noc: kuchyně, Wi-Fi, parkování zdarma. Pro 1–20 osob, rezervace přímo u pronajímatele.',
    },
    ro: {
      title: 'Cazare muncitori Augsburg de la 12 €/noapte',
      description:
        'Camere și apartamente mobilate pentru muncitori în Augsburg de la 12 € de persoană/noapte: bucătărie, Wi-Fi, parcare gratuită. Pentru 1–20 persoane, direct.',
    },
  },
  rooms: {
    de: {
      title: 'Monteurzimmer Augsburg – Einzel-, Doppel- & Dreibettzimmer',
      description:
        'Monteurzimmer Augsburg I–IV in der Stiermannstraße 5: Einzel-, Doppel- und Dreibettzimmer, 6 bis 12 Personen je Einheit, ab 12 € pro Person und Nacht buchbar.',
    },
    en: {
      title: "Workers' Rooms Augsburg – Single, Double & Triple Rooms",
      description:
        "Workers' rooms Augsburg I–IV at Stiermannstraße 5: single, double and triple rooms, 6 to 12 guests per unit, from €12 per person per night. Book directly.",
    },
    pl: {
      title: 'Pokoje dla monterów Augsburg – 1-, 2- i 3-osobowe',
      description:
        'Pokoje dla monterów Augsburg I–IV przy Stiermannstraße 5: pokoje 1-, 2- i 3-osobowe, od 6 do 12 osób na jednostkę, od 12 € za osobę za noc. Bez pośrednika.',
    },
    cs: {
      title: 'Pokoje pro montéry Augsburg – 1, 2 a 3lůžkové pokoje',
      description:
        'Pokoje pro montéry Augsburg I–IV ve Stiermannstraße 5: jedno-, dvou- a třílůžkové pokoje, 6 až 12 osob na jednotku, od 12 € za osobu a noc. Rezervace napřímo.',
    },
    ro: {
      title: 'Camere muncitori Augsburg – single, duble și triple',
      description:
        'Camere pentru muncitori Augsburg I–IV, Stiermannstraße 5: camere single, duble și triple, 6–12 persoane pe unitate, de la 12 € de persoană/noapte. Direct.',
    },
  },
  apartment: {
    de: {
      title: 'Monteurwohnung Augsburg – möbliert für 4 bis 20 Personen',
      description:
        'Monteurwohnung in Augsburg mieten: komplett möbliert für 4–20 Personen, ab 60 € pro Tag. Eigene Küche, WLAN, wöchentliche Reinigung, Parkplätze. Ab 1 Nacht.',
    },
    en: {
      title: "Workers' Apartments Augsburg – Furnished for 4–20 People",
      description:
        "Rent a furnished workers' apartment in Augsburg for 4–20 people from €60 per day. Own kitchen, Wi-Fi, weekly cleaning and parking. Stays from one night.",
    },
    pl: {
      title: 'Mieszkanie dla monterów Augsburg – dla 4 do 20 osób',
      description:
        'Umeblowane mieszkania dla monterów w Augsburgu dla 4–20 osób od 60 € dziennie. Własna kuchnia, Wi-Fi, cotygodniowe sprzątanie i parking. Już od jednej nocy.',
    },
    cs: {
      title: 'Byt pro montéry Augsburg – zařízený pro 4 až 20 osob',
      description:
        'Zařízené byty pro montéry v Augsburgu pro 4–20 osob od 60 € za den. Vlastní kuchyně, Wi-Fi, týdenní úklid a parkování. Pronájem již od jedné noci, i na déle.',
    },
    ro: {
      title: 'Apartament muncitori Augsburg – mobilat, 4–20 persoane',
      description:
        'Apartamente mobilate pentru muncitori în Augsburg pentru 4–20 persoane de la 60 € pe zi. Bucătărie proprie, Wi-Fi, curățenie săptămânală și parcare.',
    },
  },
  monteurapartment: {
    de: {
      title: 'Monteurapartment Augsburg – für 1 bis 4 Personen ab 30 €',
      description:
        'Monteurapartment in Augsburg: möblierte Apartments für 1–4 Personen ab 30 €/Tag – ideal für Einzelreisende und kleine Teams. Küche, WLAN, Parkplatz inklusive.',
    },
    en: {
      title: "Small Workers' Apartments Augsburg – 1–4 People from €30",
      description:
        'Furnished apartments in Augsburg for 1–4 people from €30 per day – ideal for individual workers and small teams. Kitchen, Wi-Fi and parking are included.',
    },
    pl: {
      title: 'Apartament dla monterów Augsburg – 1–4 osoby od 30 €',
      description:
        'Umeblowane apartamenty w Augsburgu dla 1–4 osób od 30 € dziennie – idealne dla pojedynczych monterów i małych ekip. Kuchnia, Wi-Fi i parking są w cenie.',
    },
    cs: {
      title: 'Apartmán pro montéry Augsburg – 1–4 osoby od 30 €',
      description:
        'Zařízené apartmány v Augsburgu pro 1–4 osoby od 30 € za den – ideální pro jednotlivé montéry i malé týmy. Kuchyně, Wi-Fi a parkování jsou zahrnuty v ceně.',
    },
    ro: {
      title: 'Garsonieră muncitori Augsburg – 1–4 persoane de la 30 €',
      description:
        'Apartamente mobilate în Augsburg pentru 1–4 persoane de la 30 € pe zi – ideale pentru muncitori individuali și echipe mici. Bucătărie, Wi-Fi și parcare incluse.',
    },
  },
  house: {
    de: {
      title: 'Monteurhaus Augsburg – ganze Häuser für 7 bis 16 Personen',
      description:
        'Monteurhaus in Augsburg für Montageteams: ganze Häuser für 7–16 Personen ab 120 €/Tag, mit Garten, Grillplatz und Parkplätzen. Direkt beim Vermieter anfragen.',
    },
    en: {
      title: "Workers' Houses Augsburg – Whole Houses for 7–16 People",
      description:
        'Whole houses in Augsburg for installation teams: 7–16 people from €120 per day, with garden, barbecue area and parking. Enquire directly with the landlord.',
    },
    pl: {
      title: 'Dom dla monterów Augsburg – całe domy dla 7–16 osób',
      description:
        'Całe domy w Augsburgu dla ekip montażowych: 7–16 osób od 120 € dziennie, z ogrodem, miejscem na grill i parkingiem. Zapytaj bezpośrednio u wynajmującego.',
    },
    cs: {
      title: 'Dům pro montéry Augsburg – celé domy pro 7–16 osob',
      description:
        'Celé domy v Augsburgu pro montážní týmy: 7–16 osob od 120 € za den, se zahradou, místem na grilování a parkováním. Poptávejte přímo u pronajímatele domu.',
    },
    ro: {
      title: 'Casă muncitori Augsburg – case întregi pentru 7–16 pers.',
      description:
        'Case întregi în Augsburg pentru echipe de montaj: 7–16 persoane de la 120 € pe zi, cu grădină, loc de grătar și parcare. Solicitați ofertă direct la proprietar.',
    },
  },
  fair: {
    de: {
      title: 'Monteurzimmer zur Messe Augsburg – Unterkunft für Aussteller',
      description:
        'Unterkunft zur Messe Augsburg für Aussteller, Standbauer und Besucher: rund 15 Minuten zur Messe, ab 12 € pro Person/Nacht, Küche, WLAN, kostenlose Parkplätze.',
    },
    en: {
      title: 'Trade Fair Accommodation Augsburg for Exhibitors',
      description:
        'Accommodation for Messe Augsburg exhibitors, stand builders and visitors: about 15 minutes to the fair, from €12 per person/night, kitchen, Wi-Fi, free parking.',
    },
    pl: {
      title: 'Noclegi na targi Augsburg – pokoje dla wystawców',
      description:
        'Noclegi dla wystawców, monterów stoisk i gości targów Messe Augsburg: ok. 15 minut do targów, od 12 € za osobę/noc, kuchnia, Wi-Fi, bezpłatny parking.',
    },
    cs: {
      title: 'Ubytování na veletrh Augsburg – pro vystavovatele',
      description:
        'Ubytování pro vystavovatele, stavitele stánků a návštěvníky Messe Augsburg: asi 15 minut na veletrh, od 12 € za osobu a noc, kuchyně, Wi-Fi, parkování zdarma.',
    },
    ro: {
      title: 'Cazare pentru târgul Augsburg – camere pentru expozanți',
      description:
        'Cazare pentru expozanți, constructori de standuri și vizitatori Messe Augsburg: cca. 15 minute până la târg, de la 12 € de persoană/noapte, bucătărie, Wi-Fi.',
    },
  },
  reservation: {
    de: {
      title: 'Monteurzimmer Augsburg buchen – Reservierung anfragen',
      description:
        'Monteurzimmer in Augsburg reservieren: Formular ausfüllen oder anrufen unter 0821 419028-28. Für Einzelpersonen, Teams und Firmen – ab 1 Nacht und langfristig.',
    },
    en: {
      title: "Book Workers' Rooms Augsburg – Reservation Request",
      description:
        'Reserve workers’ accommodation in Augsburg: fill in the form or call +49 821 419028-28. For individuals, teams and companies – from one night, long stays too.',
    },
    pl: {
      title: 'Rezerwacja – pokoje dla monterów Augsburg',
      description:
        'Zarezerwuj nocleg dla monterów w Augsburgu: wypełnij formularz lub zadzwoń +49 821 419028-28. Dla osób, ekip i firm – od jednej nocy, także długoterminowo.',
    },
    cs: {
      title: 'Rezervace – ubytování pro montéry Augsburg',
      description:
        'Rezervujte ubytování pro montéry v Augsburgu: vyplňte formulář nebo volejte +49 821 419028-28. Pro jednotlivce, týmy i firmy – od jedné noci, i dlouhodobě.',
    },
    ro: {
      title: 'Rezervare – cazare pentru muncitori Augsburg',
      description:
        'Rezervați cazare pentru muncitori în Augsburg: completați formularul sau sunați la +49 821 419028-28. Pentru persoane, echipe și firme, de la o noapte.',
    },
  },
  contact: {
    de: {
      title: 'Kontakt – Monteurzimmer Augsburg, Tel. 0821 419028-28',
      description:
        'Kontakt zu Monteurzimmer Augsburg (Gnann Verwaltung GmbH), Barfüßerstraße 7, 86150 Augsburg. Telefon 0821 419028-28, Mo–Fr 8–18 Uhr, oder per Anfrageformular.',
    },
    en: {
      title: "Contact – Workers' Rooms Augsburg, +49 821 419028-28",
      description:
        'Contact Monteurzimmer Augsburg (Gnann Verwaltung GmbH), Barfüßerstraße 7, 86150 Augsburg, Germany. Phone +49 821 419028-28, Mon–Fri 8am–6pm, or use our form.',
    },
    pl: {
      title: 'Kontakt – pokoje dla monterów Augsburg',
      description:
        'Kontakt: Monteurzimmer Augsburg (Gnann Verwaltung GmbH), Barfüßerstraße 7, 86150 Augsburg, Niemcy. Tel. +49 821 419028-28, pn.–pt. 8–18, lub formularz.',
    },
    cs: {
      title: 'Kontakt – ubytování pro montéry Augsburg',
      description:
        'Kontakt: Monteurzimmer Augsburg (Gnann Verwaltung GmbH), Barfüßerstraße 7, 86150 Augsburg, Německo. Tel. +49 821 419028-28, po–pá 8–18 h, nebo formulář.',
    },
    ro: {
      title: 'Contact – cazare pentru muncitori Augsburg',
      description:
        'Contact: Monteurzimmer Augsburg (Gnann Verwaltung GmbH), Barfüßerstraße 7, 86150 Augsburg, Germania. Tel. +49 821 419028-28, luni–vineri 8–18, sau formular.',
    },
  },
  imprint: {
    de: {
      title: 'Impressum – Monteurzimmer Augsburg (Gnann Verwaltung GmbH)',
      description:
        'Impressum von Monteurzimmer Augsburg: Anbieter ist die Gnann Verwaltung GmbH, Barfüßerstraße 7, 86150 Augsburg, HRB 19649, Geschäftsführer Daniel Gnann.',
    },
    en: {
      title: 'Legal Notice – Monteurzimmer Augsburg',
      description:
        'Legal notice of Monteurzimmer Augsburg: the provider is Gnann Verwaltung GmbH, Barfüßerstraße 7, 86150 Augsburg, Germany, HRB 19649, MD Daniel Gnann.',
    },
    pl: {
      title: 'Impressum – pokoje dla monterów Augsburg',
      description:
        'Impressum serwisu Monteurzimmer Augsburg: usługodawcą jest Gnann Verwaltung GmbH, Barfüßerstraße 7, 86150 Augsburg, Niemcy, HRB 19649, prezes Daniel Gnann.',
    },
    cs: {
      title: 'Impressum – ubytování pro montéry Augsburg',
      description:
        'Impressum webu Monteurzimmer Augsburg: poskytovatelem je Gnann Verwaltung GmbH, Barfüßerstraße 7, 86150 Augsburg, Německo, HRB 19649, jednatel Daniel Gnann.',
    },
    ro: {
      title: 'Impressum – cazare pentru muncitori Augsburg',
      description:
        'Impressum Monteurzimmer Augsburg: furnizorul este Gnann Verwaltung GmbH, Barfüßerstraße 7, 86150 Augsburg, Germania, HRB 19649, administrator Daniel Gnann.',
    },
  },
  privacy: {
    de: {
      title: 'Datenschutzerklärung – Monteurzimmer Augsburg',
      description:
        'Datenschutzerklärung von Monteurzimmer Augsburg: welche Daten wir bei Anfrage und Reservierung verarbeiten, wofür, wie lange und welche Rechte Sie haben.',
    },
    en: {
      title: 'Privacy Policy – Monteurzimmer Augsburg',
      description:
        'Privacy policy of Monteurzimmer Augsburg: which personal data we process for enquiries and reservations, for what purpose, how long we keep it and your rights.',
    },
    pl: {
      title: 'Polityka prywatności – pokoje dla monterów Augsburg',
      description:
        'Polityka prywatności Monteurzimmer Augsburg: jakie dane przetwarzamy przy zapytaniach i rezerwacjach, w jakim celu, jak długo je przechowujemy i Twoje prawa.',
    },
    cs: {
      title: 'Ochrana osobních údajů – Monteurzimmer Augsburg',
      description:
        'Ochrana osobních údajů Monteurzimmer Augsburg: jaké údaje zpracováváme při poptávce a rezervaci, za jakým účelem, jak dlouho je uchováváme a jaká máte práva.',
    },
    ro: {
      title: 'Confidențialitate – cazare pentru muncitori Augsburg',
      description:
        'Politica de confidențialitate Monteurzimmer Augsburg: ce date personale prelucrăm la cereri și rezervări, în ce scop, cât timp le păstrăm și ce drepturi aveți.',
    },
  },
};

const ROOM_NUMERALS = ['I', 'II', 'III', 'IV'];

/** Meta für die vier Zimmer-Detailseiten (ST5-100 … ST5-400). */
function roomMeta(locale: Loc, index: number, code: string, cap: number): Meta {
  const n = ROOM_NUMERALS[index];
  switch (locale) {
    case 'en':
      return {
        title: `Workers' Room Augsburg ${n} (${code}) – up to ${cap} guests`,
        description: `Workers' room Augsburg ${n} (${code}), Stiermannstraße 5: single, double and triple rooms, rentable as a unit for up to ${cap} guests. Kitchen, Wi-Fi, parking.`,
      };
    case 'pl':
      return {
        title: `Pokój dla monterów Augsburg ${n} (${code}) – do ${cap} osób`,
        description: `Pokoje dla monterów Augsburg ${n} (${code}), Stiermannstraße 5: pokoje 1-, 2- i 3-osobowe, do wynajęcia w całości dla maks. ${cap} osób. Kuchnia, Wi-Fi, parking.`,
      };
    case 'cs':
      return {
        title: `Pokoj pro montéry Augsburg ${n} (${code}) – až ${cap} osob`,
        description: `Pokoje pro montéry Augsburg ${n} (${code}), Stiermannstraße 5: jedno-, dvou- a třílůžkové pokoje, k pronájmu celé až pro ${cap} osob. Kuchyně, Wi-Fi, parkování.`,
      };
    case 'ro':
      return {
        title: `Cameră muncitori Augsburg ${n} (${code}) – max. ${cap} pers.`,
        description: `Camere pentru muncitori Augsburg ${n} (${code}), Stiermannstraße 5: camere single, duble și triple, integral pentru max. ${cap} persoane. Bucătărie, Wi-Fi.`,
      };
    default: {
      const art = index === 2 ? 'als WG' : 'als Wohnung';
      return {
        title: `Monteurzimmer Augsburg ${n} (${code}) – bis ${cap} Personen`,
        description: `Monteurzimmer Augsburg ${n} (${code}), Stiermannstraße 5: Einzel-, Doppel- und Dreibettzimmer, ${art} für bis zu ${cap} Personen mietbar. Küche, WLAN, Parkplatz.`,
      };
    }
  }
}

function asLoc(locale: string): Loc {
  return (['de', 'en', 'pl', 'cs', 'ro'].includes(locale) ? locale : 'de') as Loc;
}

function build(meta: Meta, path: string, locale: string, image?: string) {
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: generateAlternates(path, locale),
    openGraph: generateOgMeta(meta.title, meta.description, path, locale, image),
  };
}

export function getPageMeta(key: PageKey, locale: string) {
  return META[key][asLoc(locale)];
}

export function pageMetadata(key: PageKey, path: string, locale: string) {
  return build(getPageMeta(key, locale), path, locale);
}

export function roomMetadata(index: number, code: string, cap: number, slug: string, locale: string) {
  return build(roomMeta(asLoc(locale), index, code, cap), `monteurzimmer-augsburg/${slug}`, locale);
}

/** Für Seiten, die nur auf Deutsch existieren (Ratgeber). */
export function germanOnlyMetadata(meta: Meta, path: string, image?: string) {
  const cleanPath = path ? `/${path.replace(/^\/|\/$/g, '')}/` : '/';
  const url = `https://www.monteurzimmer.augsburg-apartments.de${cleanPath}`;
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: url, languages: { de: url, 'x-default': url } },
    openGraph: { ...generateOgMeta(meta.title, meta.description, path, 'de', image), type: 'article' as const },
  };
}
