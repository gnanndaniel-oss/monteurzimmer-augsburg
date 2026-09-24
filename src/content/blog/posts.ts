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
};

export const POSTS: BlogPost[] = [
  {
    slug: 'monteurzimmer-steuerlich-absetzen',
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
    title: 'Langzeitunterkunft für Handwerker: Monteurzimmer oder Monteurwohnung?',
    metaTitle: 'Monteurzimmer oder Monteurwohnung? Langzeit-Vergleich',
    description:
      'Monteurzimmer oder Monteurwohnung für längere Einsätze in Augsburg? Kosten pro Kopf, Privatsphäre, Küche und Teamgröße im Vergleich – mit Rechenbeispielen.',
    excerpt:
      'Für wen lohnt sich das Einzel- oder Mehrbettzimmer, ab wann die ganze Wohnung? Ein Vergleich mit echten Preisen und Rechenbeispielen für Teams von 2 bis 16 Personen.',
    date: '2026-09-24',
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
