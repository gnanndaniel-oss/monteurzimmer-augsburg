import { MW, AP, type Photo } from '@/content/images';

/**
 * Ratgeber-Beiträge (nur Deutsch). Text liegt jeweils in src/content/blog/<slug>.md.
 * Neuer Beitrag: Eintrag hier ergänzen + .md anlegen + public/sitemap.xml + llms*.txt.
 */
export type BlogPost = {
  slug: string;
  title: string; // H1
  metaTitle: string; // ≤ 60 Zeichen
  description: string; // 140–160 Zeichen
  excerpt: string;
  date: string; // ISO
  updated?: string;
  image: Photo;
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
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
