'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CONTACT } from '@/lib/constants';

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Monteurzimmer <span className="text-brand-400">Augsburg</span>
            </h3>
            <p className="text-sm leading-relaxed mb-4">{t('hero.subtitle')}</p>
            <p className="text-sm text-slate-400">{CONTACT.company}</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('contact.title')}</h3>
            <div className="space-y-2 text-sm">
              <p>{CONTACT.address}</p>
              <p>
                Tel:{' '}
                <a href={CONTACT.phoneTel} className="hover:text-brand-400 transition-colors">
                  {CONTACT.phone}
                </a>
              </p>
              <p>Fax: {CONTACT.fax}</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <div className="space-y-2 text-sm">
              <Link href="/monteurzimmer-augsburg/" className="block hover:text-brand-400 transition-colors">
                {t('nav.rooms')}
              </Link>
              <Link href="/monteurwohnung-augsburg/" className="block hover:text-brand-400 transition-colors">
                {t('nav.apartment')}
              </Link>
              <Link href="/reservierung-monterwohungaugsburg/" className="block hover:text-brand-400 transition-colors">
                {t('nav.reservation')}
              </Link>
              <Link href="/impressum-montuerzimmer-augsburg/" className="block hover:text-brand-400 transition-colors">
                {t('footer.imprint')}
              </Link>
              <Link href="/datenschutz/" className="block hover:text-brand-400 transition-colors">
                {t('footer.privacy')}
              </Link>
            </div>
          </div>

          {/* Unternehmensverbund */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.network')}</h3>
            <div className="space-y-2 text-sm">
              <a href="https://www.apartment-augsburg.de" target="_blank" rel="noopener noreferrer" className="block hover:text-brand-400 transition-colors">
                apartment-augsburg.de
              </a>
              <a href="https://www.wohnbaron.de" target="_blank" rel="noopener noreferrer" className="block hover:text-brand-400 transition-colors">
                wohnbaron.de
              </a>
              <a href="https://www.relocation-augsburg.de" target="_blank" rel="noopener noreferrer" className="block hover:text-brand-400 transition-colors">
                relocation-augsburg.de
              </a>
              <a href="https://www.verdasol.de" target="_blank" rel="noopener noreferrer" className="block hover:text-brand-400 transition-colors">
                verdasol.de
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          &copy; 2012–{new Date().getFullYear()} {CONTACT.company}. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
