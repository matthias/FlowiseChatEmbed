import { de } from './de';
import { en } from './en';

export const MAIN_LANGUAGE: Language = 'en';

export const languages = {
  en,
  de,
};

// export type enum of all available languages
export type Language = keyof typeof languages;
export const languageKeys = Object.keys(languages);

// Create a type for the extracted language dictionary
type ExtractedLangDict = Partial<typeof MAIN_LANGUAGE>;
export interface LANG_DICT extends Partial<Record<keyof ExtractedLangDict, any>> {
  [key: string]: any;
}
