import * as i18n from '@solid-primitives/i18n';
import { createResource, createSignal } from 'solid-js';

import { dict as en } from './en';
import { dict as de } from './de';

// Available languages
export type Locale = 'en' | 'de';
export const locales: Locale[] = ['en', 'de'];

// Define default language for checking new translations
export type Translations = Partial<typeof en>;

async function fetchDictionary(locale: Locale): Promise<Translations> {
  const dict: Translations = (await import(`./i18n/${locale}.js`)).dict;
  return i18n.flatten(dict); // flatten the dictionary to make all nested keys available top-level
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [locale, setLocale] = createSignal<Locale>('en');
const [dict] = createResource(locale, fetchDictionary, {
  initialValue: i18n.flatten(de),
});

const t = i18n.translator(dict, i18n.resolveTemplate);

// API
export { i18n, t, dict, locale, setLocale };
