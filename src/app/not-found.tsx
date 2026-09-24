import '@/app/globals.css';

// Eigene 404-Seite (out/404.html). Wird per .htaccess als ErrorDocument ausgeliefert,
// damit unbekannte URLs nicht mehr die Startseite zeigen.
export const metadata = {
  title: 'Seite nicht gefunden – Monteurzimmer Augsburg',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <html lang="de">
      <body className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <main className="max-w-xl text-center py-20">
          <p className="text-brand-600 font-bold text-lg mb-2">404</p>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Diese Seite gibt es nicht (mehr)</h1>
          <p className="text-slate-600 mb-8">
            Die aufgerufene Adresse existiert nicht. Hier geht es zu unseren Monteurzimmern und Monteurwohnungen in Augsburg:
          </p>
          <nav className="flex flex-wrap justify-center gap-3 text-sm font-semibold">
            <a className="px-4 py-2 rounded-lg bg-brand-600 text-white" href="/">Startseite</a>
            <a className="px-4 py-2 rounded-lg bg-white border border-slate-200" href="/monteurzimmer-augsburg/">Monteurzimmer</a>
            <a className="px-4 py-2 rounded-lg bg-white border border-slate-200" href="/monteurwohnung-augsburg/">Monteurwohnung</a>
            <a className="px-4 py-2 rounded-lg bg-white border border-slate-200" href="/blog/">Ratgeber</a>
            <a className="px-4 py-2 rounded-lg bg-white border border-slate-200" href="/kontakt/">Kontakt</a>
          </nav>
        </main>
      </body>
    </html>
  );
}
