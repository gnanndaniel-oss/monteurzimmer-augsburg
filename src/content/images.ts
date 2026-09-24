/**
 * Eigene Fotos der Unterkünfte (Quelle: shared/uploads/2019/10, © Gnann Verwaltung GmbH),
 * komprimiert nach public/images/. Maße = echte Pixelmaße.
 */
export type Photo = { src: string; alt: string; width: number; height: number };

const L = (src: string, alt: string): Photo => ({ src, alt, width: 1100, height: 825 });
const P = (src: string, alt: string): Photo => ({ src, alt, width: 825, height: 1100 });

export const MW = {
  wohnkueche: L('/images/monteurwohnung/monteurwohnung-augsburg-wohnkueche-esstisch.jpg', 'Wohnküche mit großem Esstisch in einer Monteurwohnung in Augsburg'),
  kueche: L('/images/monteurwohnung/monteurwohnung-augsburg-kueche.jpg', 'Voll ausgestattete Küche mit Herd, Backofen und Kühlschrank in einer Monteurwohnung in Augsburg'),
  dreibett: L('/images/monteurwohnung/monteurwohnung-augsburg-dreibettzimmer.jpg', 'Dreibettzimmer mit Einzelbetten in einer Monteurwohnung in Augsburg'),
  zweibett: L('/images/monteurwohnung/monteurwohnung-augsburg-zweibettzimmer.jpg', 'Zweibettzimmer mit Einzelbetten und Tisch in einer Monteurwohnung in Augsburg'),
  zweibettDach: L('/images/monteurwohnung/monteurwohnung-augsburg-zweibettzimmer-dachschraege.jpg', 'Zweibettzimmer mit Dachschräge in einer Monteurwohnung in Augsburg'),
  einzel: L('/images/monteurwohnung/monteurwohnung-augsburg-einzelzimmer.jpg', 'Einzelzimmer mit Kleiderschrank, Schreibtisch und TV in einer Monteurwohnung in Augsburg'),
  zimmerTisch: L('/images/monteurwohnung/monteurwohnung-augsburg-zimmer-mit-tisch.jpg', 'Zimmer mit zwei Betten und Esstisch in einer Monteurwohnung in Augsburg'),
  waschraum: L('/images/monteurwohnung/monteurwohnung-augsburg-waschraum.jpg', 'Waschraum mit mehreren Waschbecken in einer Monteurwohnung in Augsburg'),
};

export const AP = {
  wohnbereich: L('/images/apartment/monteurapartment-augsburg-wohnbereich.jpg', 'Wohnbereich mit Sofa und Essplatz in einem möblierten Apartment in Augsburg'),
  kueche: L('/images/apartment/monteurapartment-augsburg-kueche.jpg', 'Küche mit Kochfeld, Backofen und Mikrowelle in einem möblierten Apartment in Augsburg'),
  schlafzimmer: L('/images/apartment/monteurapartment-augsburg-schlafzimmer.jpg', 'Schlafzimmer mit Doppelbett und TV in einem möblierten Apartment in Augsburg'),
  einzel: L('/images/apartment/monteurapartment-augsburg-einzelzimmer.jpg', 'Einzelzimmer in einem möblierten Apartment in Augsburg'),
  bad: P('/images/apartment/monteurapartment-augsburg-bad-waschmaschine.jpg', 'Bad mit Dusche und Waschmaschine in einem möblierten Apartment in Augsburg'),
};

export const GALLERY_MONTEURWOHNUNG: Photo[] = [MW.wohnkueche, MW.kueche, MW.dreibett, MW.zweibett, MW.zweibettDach, MW.einzel, MW.zimmerTisch, MW.waschraum];
export const GALLERY_MONTEURAPARTMENT: Photo[] = [AP.wohnbereich, AP.kueche, AP.schlafzimmer, AP.einzel, AP.bad];
