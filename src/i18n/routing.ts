import { defineRouting } from 'next-intl/routing';

export const locales = ['de', 'en', 'pl', 'cs', 'ro'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'de',
  localePrefix: 'as-needed',
});
