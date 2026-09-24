import { MW, AP, type Photo } from '@/content/images';

/**
 * Ratgeber-Beiträge. Deutscher Text in src/content/blog/<slug>.md, Übersetzungen
 * (nur en, pl) in src/content/blog/<locale>/<slug>.md, Metadaten unter `i18n`.
 * Neuer Beitrag: Eintrag hier ergänzen + .md anlegen + public/sitemap.xml + llms*.txt.
 */
export type PostTranslation = {
  title: string;
  metaTitle: string; // ≤ 60 Zeichen
  description: string; // 140–160 Zeichen
  excerpt: string;
  imageAlt: string;
};

export type BlogPost = {
  slug: string;
  title: string; // H1
  metaTitle: string; // ≤ 60 Zeichen
  description: string; // 140–160 Zeichen
  excerpt: string;
  date: string; // ISO
  updated?: string;
  image: Photo;
  i18n: Record<'en' | 'pl', PostTranslation>;
};

export const POSTS: BlogPost[] = [
  {
    slug: 'monteurzimmer-steuerlich-absetzen',
    image: MW.wohnkueche,
    title: 'Monteurzimmer steuerlich absetzen – was Firmen wissen müssen',
    metaTitle: 'Monteurzimmer steuerlich absetzen – Leitfaden für Firmen',
    description:
      'Monteurzimmer steuerlich absetzen: Betriebsausgabe, 7 % Umsatzsteuer, Vorsteuerabzug, Rechnungspflichtangaben und Pauschalen – kompakt für Firmen erklärt.',
    excerpt:
      'Übernachtungskosten für Monteure sind Betriebsausgaben. Welche Umsatzsteuer gilt, was auf der Rechnung stehen muss und wann die 48-Monats-Grenze greift.',
    date: '2026-09-24',
    i18n: {
      en: {
        title: "Deducting workers' accommodation from tax – what companies need to know",
        metaTitle: "Tax Deduction for Accommodation of Fitters – Guide for Firms",
        description:
          "Deducting workers accommodation from tax in Germany: business expense, 7% VAT, input tax deduction, invoice requirements and flat rates, explained for firms.",
        excerpt:
          "Accommodation costs for fitters are business expenses (Betriebsausgaben). Which VAT rate applies, what the invoice must show and when the 48-month limit kicks in.",
        imageAlt: "Kitchen-diner with a large dining table in a workers' apartment in Augsburg",
      },
      pl: {
        title: "Jak odliczyć pokoje dla monterów od podatku – co muszą wiedzieć firmy",
        metaTitle: "Pokoje dla monterów a podatki – poradnik dla firm",
        description:
          "Pokoje dla monterów a podatki w Niemczech: koszty uzyskania przychodu, VAT 7 %, podatek naliczony (Vorsteuer), dane na fakturze i ryczałty – zwięźle dla firm.",
        excerpt:
          "Koszty noclegu monterów są kosztami uzyskania przychodu (Betriebsausgaben). Jaka stawka VAT obowiązuje, co musi być na fakturze i kiedy działa limit 48 miesięcy.",
        imageAlt: "Kuchnia z jadalnią i dużym stołem w mieszkaniu dla monterów w Augsburgu",
      },
    },
  },
  {
    slug: 'checkliste-unterkunft-montageteams-augsburg',
    image: MW.dreibett,
    title: 'Checkliste: Unterkunft für Montageteams in Augsburg buchen',
    metaTitle: 'Checkliste: Unterkunft für Montageteams in Augsburg',
    description:
      'Checkliste für Firmen: So buchen Sie eine Unterkunft für Montageteams in Augsburg – Bedarf, Anfrage, Parken für Transporter, Rechnung, An- und Abreise.',
    excerpt:
      'Von der Bedarfsplanung bis zur Abreise: 23 Punkte, an die Disponenten und Bauleiter bei der Buchung einer Monteurunterkunft in Augsburg denken sollten.',
    date: '2026-09-24',
    i18n: {
      en: {
        title: "Checklist: booking accommodation for installation teams in Augsburg",
        metaTitle: "Checklist: accommodation for installation teams in Augsburg",
        description:
          "Checklist for companies: how to book accommodation for installation teams in Augsburg – needs, enquiry, van parking, invoicing, arrival and departure.",
        excerpt:
          "From planning to departure: 23 points that dispatchers and site managers should keep in mind when booking workers' accommodation in Augsburg.",
        imageAlt: "Triple room with single beds in a workers' apartment in Augsburg",
      },
      pl: {
        title: "Lista kontrolna: rezerwacja kwater dla ekip montażowych w Augsburgu",
        metaTitle: "Lista kontrolna: kwatery dla ekip montażowych w Augsburgu",
        description:
          "Lista kontrolna dla firm: jak zarezerwować kwatery dla ekipy montażowej w Augsburgu – potrzeby, zapytanie, parking dla busów, faktura, przyjazd i wyjazd.",
        excerpt:
          "Od planowania potrzeb po wyjazd: 23 punkty, o których dyspozytorzy i kierownicy budowy powinni pamiętać przy rezerwacji noclegów dla monterów w Augsburgu.",
        imageAlt: "Pokój trzyosobowy z pojedynczymi łóżkami w mieszkaniu dla monterów w Augsburgu",
      },
    },
  },
  {
    slug: 'monteurzimmer-oder-monteurwohnung',
    image: MW.zweibett,
    title: 'Langzeitunterkunft für Handwerker: Monteurzimmer oder Monteurwohnung?',
    metaTitle: 'Monteurzimmer oder Monteurwohnung? Langzeit-Vergleich',
    description:
      'Monteurzimmer oder Monteurwohnung für längere Einsätze in Augsburg? Kosten pro Kopf, Privatsphäre, Küche und Teamgröße im Vergleich – mit Rechenbeispielen.',
    excerpt:
      'Für wen lohnt sich das Einzel- oder Mehrbettzimmer, ab wann die ganze Wohnung? Ein Vergleich mit echten Preisen und Rechenbeispielen für Teams von 2 bis 16 Personen.',
    date: '2026-09-24',
    i18n: {
      en: {
        title: "Long-term accommodation for tradespeople: workers' room or workers' apartment?",
        metaTitle: "Room or Apartment for Workers? A Long-Stay Comparison",
        description:
          "Workers room or workers apartment for longer jobs in Augsburg? Cost per head, privacy, kitchen and team size compared – with worked examples and real prices.",
        excerpt:
          "Who is best served by a single or multi-bed room, and when is the whole apartment worth it? A comparison with real prices and worked examples for teams of 2 to 16 people.",
        imageAlt: "Twin room with single beds and a table in a workers' apartment in Augsburg",
      },
      pl: {
        title: "Zakwaterowanie długoterminowe dla fachowców: pokój czy mieszkanie dla monterów?",
        metaTitle: "Pokój czy mieszkanie dla monterów? Porównanie na dłużej",
        description:
          "Pokój czy mieszkanie dla monterów na dłuższe zlecenia w Augsburgu? Koszt na osobę, prywatność, kuchnia i wielkość ekipy w porównaniu – z przykładami obliczeń.",
        excerpt:
          "Dla kogo opłaca się pokój jedno- lub wieloosobowy, a od kiedy całe mieszkanie? Porównanie z prawdziwymi cenami i przykładami obliczeń dla ekip od 2 do 16 osób.",
        imageAlt: "Pokój dwuosobowy z pojedynczymi łóżkami i stołem w mieszkaniu dla monterów w Augsburgu",
      },
    },
  },
  {
    slug: 'parken-augsburg-monteure-firmenfahrzeug',
    image: MW.zweibettDach,
    title: 'Parken in Augsburg – Tipps für Handwerker und Monteure mit Firmenfahrzeug',
    metaTitle: 'Parken in Augsburg mit Transporter – Tipps für Monteure',
    description:
      'Parken in Augsburg mit Transporter und Anhänger: StVO-Regeln ab 2,8, 3,5 und 7,5 t, Halteverbot an der Baustelle, Bewohnerparken und Unterkunft mit Parkplatz.',
    excerpt:
      'Welche Parkregeln für Transporter und Anhänger gelten, wie Sie ein Halteverbot vor der Baustelle bekommen und worauf Sie bei der Unterkunft achten sollten.',
    date: '2026-03-20',
    updated: '2026-09-24',
    i18n: {
      en: {
        title: "Parking in Augsburg – tips for tradespeople and fitters with a company vehicle",
        metaTitle: "Parking in Augsburg with a van – tips for fitters",
        description:
          "Parking in Augsburg with a van or trailer: StVO rules for 2.8, 3.5 and 7.5 t, no-stopping zones at the site, residents parking and accommodation with parking.",
        excerpt:
          "Which parking rules apply to vans and trailers, how to get a no-stopping zone (Halteverbot) in front of the site and what to look for in your accommodation.",
        imageAlt: "Twin room with a sloping ceiling in a workers' apartment in Augsburg",
      },
      pl: {
        title: "Parkowanie w Augsburgu – wskazówki dla fachowców i monterów z samochodem firmowym",
        metaTitle: "Parkowanie busem w Augsburgu – wskazówki dla monterów",
        description:
          "Parkowanie busem i przyczepą w Augsburgu: zasady StVO od 2,8, 3,5 i 7,5 t, zakaz zatrzymywania przy budowie, parkowanie dla mieszkańców i kwatera z parkingiem.",
        excerpt:
          "Jakie zasady parkowania obowiązują busy i przyczepy, jak uzyskać zakaz zatrzymywania się (Halteverbot) przed budową i na co zwrócić uwagę przy wyborze kwatery.",
        imageAlt: "Pokój dwuosobowy ze skosem w mieszkaniu dla monterów w Augsburgu",
      },
    },
  },
  {
    slug: 'baumarkt-werkzeugverleih-augsburg-monteure',
    image: MW.zimmerTisch,
    title: 'Baumarkt, Werkzeugverleih und Arbeitskleidung in Augsburg – Einkaufsguide für Monteure',
    metaTitle: 'Baumarkt & Werkzeugverleih Augsburg – Guide für Monteure',
    description:
      'Material, Werkzeug und Arbeitskleidung in Augsburg: wann Baumarkt, Fachgroßhandel oder Mietpark die richtige Wahl ist, Ladenöffnung in Bayern und Planungstipps.',
    excerpt:
      'Baumarkt, Fachgroßhandel oder Mietpark? Welche Einkaufsquelle wofür passt, was sonntags gilt und wie Sie den Materialeinkauf in der Montagewoche planen.',
    date: '2026-04-10',
    updated: '2026-09-24',
    i18n: {
      en: {
        title: "DIY Stores, Tool Hire and Workwear in Augsburg – A Shopping Guide for Workers",
        metaTitle: "DIY Stores and Tool Hire in Augsburg – Guide for Workers",
        description:
          "Materials, tools and workwear in Augsburg: when to use a DIY store, trade wholesaler or plant hire, shop opening hours in Bavaria and tips for planning ahead.",
        excerpt:
          "DIY store, trade wholesaler or plant hire? Which source suits which need, what applies on Sundays and how to plan your materials shopping during the working week.",
        imageAlt: "Room with two beds and a dining table in a workers' apartment in Augsburg",
      },
      pl: {
        title: "Market budowlany, wypożyczalnia narzędzi i odzież robocza w Augsburgu – poradnik zakupowy dla monterów",
        metaTitle: "Market budowlany i wypożyczalnia Augsburg – dla monterów",
        description:
          "Materiały, narzędzia i odzież robocza w Augsburgu: kiedy market budowlany, hurtownia czy wypożyczalnia, godziny otwarcia sklepów w Bawarii i porady.",
        excerpt:
          "Market budowlany, hurtownia branżowa czy wypożyczalnia sprzętu? Które źródło zakupu do czego, co obowiązuje w niedziele i jak zaplanować zakup materiałów w tygodniu montażu.",
        imageAlt: "Pokój z dwoma łóżkami i stołem w mieszkaniu dla monterów w Augsburgu",
      },
    },
  },
  {
    slug: 'waesche-einkaufen-feierabend-monteure-augsburg',
    image: AP.bad,
    title: 'Wäsche waschen, Einkaufen, Feierabend: Alltagsguide für Monteure in Augsburg',
    metaTitle: 'Wäsche, Einkaufen, Feierabend – Monteur-Alltag in Augsburg',
    description:
      'Monteur-Alltag in Augsburg: Arbeitskleidung richtig waschen, Einkaufszeiten in Bayern, selbst kochen statt Spesen, Feierabend-Tipps und WLAN in der Unterkunft.',
    excerpt:
      'Waschmaschine, Küche, Ladenöffnung und Feierabend: So organisieren Monteure ihren Alltag in Augsburg – mit Rechenbeispiel zur Selbstverpflegung.',
    date: '2026-03-27',
    updated: '2026-09-24',
    i18n: {
      en: {
        title: "Laundry, Shopping, After Work: An Everyday Guide for Workers in Augsburg",
        metaTitle: "Laundry, Shopping, After Work – Worker Life in Augsburg",
        description:
          "Everyday life for workers in Augsburg: washing workwear properly, shop opening hours in Bavaria, self-catering instead of eating out, after-work tips and Wi-Fi.",
        excerpt:
          "Washing machine, kitchen, shop opening hours and time off: how workers organise everyday life in Augsburg – with an example calculation for self-catering.",
        imageAlt: "Bathroom with shower and washing machine in a furnished apartment in Augsburg",
      },
      pl: {
        title: "Pranie, zakupy, czas po pracy: codzienny poradnik dla monterów w Augsburgu",
        metaTitle: "Pranie, zakupy, czas wolny – monterzy w Augsburgu",
        description:
          "Codzienność monterów w Augsburgu: pranie odzieży roboczej, godziny otwarcia sklepów w Bawarii, gotowanie zamiast diet, czas po pracy i Wi-Fi w kwaterze.",
        excerpt:
          "Pralka, kuchnia, godziny otwarcia sklepów i czas po pracy: tak monterzy organizują codzienność w Augsburgu – z przykładowym wyliczeniem oszczędności na samodzielnym gotowaniu.",
        imageAlt: "Łazienka z prysznicem i pralką w umeblowanym apartamencie w Augsburgu",
      },
    },
  },
  {
    slug: 'fitnessstudios-sport-monteure-augsburg',
    image: MW.einzel,
    title: 'Fitnessstudios, Schwimmbäder und Sport für Monteure in Augsburg',
    metaTitle: 'Sport für Monteure in Augsburg – Fitness, Schwimmen, Laufen',
    description:
      'Ausgleichssport auf Montage in Augsburg: Fitnessstudio mit kurzer Laufzeit, Bäder der Stadtwerke, Kuhsee, Laufstrecken und ein 20-Minuten-Programm fürs Zimmer.',
    excerpt:
      'Was gegen Rücken- und Schulterbeschwerden von der Baustelle hilft und wo Monteure in Augsburg trainieren, schwimmen und laufen können.',
    date: '2026-04-17',
    updated: '2026-09-24',
    i18n: {
      en: {
        title: "Gyms, Swimming Pools and Sport for Workers in Augsburg",
        metaTitle: "Sport for Workers in Augsburg – Gyms, Swimming, Running",
        description:
          "Staying fit when working away in Augsburg: gyms with short contracts, Stadtwerke pools, the Kuhsee lake, running routes and a 20-minute workout for your room.",
        excerpt:
          "What helps against back and shoulder pain from working on site, and where workers in Augsburg can train, swim and run.",
        imageAlt: "Single room with wardrobe, desk and TV in a workers' apartment in Augsburg",
      },
      pl: {
        title: "Siłownie, baseny i sport dla monterów w Augsburgu",
        metaTitle: "Sport dla monterów w Augsburgu – siłownia, basen, bieganie",
        description:
          "Sport wyrównawczy na montażu w Augsburgu: siłownia z krótką umową, baseny Stadtwerke, jezioro Kuhsee, trasy biegowe i 20-minutowy trening w pokoju.",
        excerpt:
          "Co pomaga na bóle pleców i barków po pracy na budowie oraz gdzie monterzy w Augsburgu mogą trenować, pływać i biegać.",
        imageAlt: "Pokój jednoosobowy z szafą, biurkiem i telewizorem w mieszkaniu dla monterów w Augsburgu",
      },
    },
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

/** Beitrag mit Texten in der gewünschten Sprache (de, en, pl). */
export function localizePost(post: BlogPost, locale: string): BlogPost {
  if (locale !== 'en' && locale !== 'pl') return post;
  const tr = post.i18n[locale];
  return {
    ...post,
    title: tr.title,
    metaTitle: tr.metaTitle,
    description: tr.description,
    excerpt: tr.excerpt,
    image: { ...post.image, alt: tr.imageAlt },
  };
}
