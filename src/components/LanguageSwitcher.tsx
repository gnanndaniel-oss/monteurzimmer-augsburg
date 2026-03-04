'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';
import { LOCALE_FLAGS, LOCALE_NAMES } from '@/lib/constants';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale as any });
  }

  return (
    <div className="flex items-center gap-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleChange(loc)}
          className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
            loc === locale
              ? 'bg-brand-600 text-white'
              : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
          }`}
          aria-label={LOCALE_NAMES[loc]}
          title={LOCALE_NAMES[loc]}
        >
          <span className="text-base leading-none">{LOCALE_FLAGS[loc]}</span>
          <span className="hidden sm:inline uppercase">{loc}</span>
        </button>
      ))}
    </div>
  );
}
