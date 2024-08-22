// load all json files from ../i18n
import { createSignal } from 'solid-js';
import { languages, Language, MAIN_LANGUAGE, LANG_DICT } from '../i18n';

export const [currentLanguage, setCurrentLanguage] = createSignal<Language>(MAIN_LANGUAGE);

export const getTranslations = function (lang: Language = MAIN_LANGUAGE) {
  return languages[lang];
};

// Function to get the translation for a given key and language
// Example: t('common.hello') -> 'Hello'
export const t = function (key: string, ...args: string[]): string {
  const lang: Language = currentLanguage();
  const keys = key.split('.');
  let result: LANG_DICT = languages[lang];

  for (const k of keys) {
    if (typeof result === 'object' && result[k]) {
      result = result[k];
    } else {
      return key; // Return the key itself if the translation is not found
    }
  }

  // apply template function if the result is a string
  if (typeof result === 'function') {
    // apply the function with the arguments
    return (result as (...args: string[]) => string)(...args);
  } else if (typeof result === 'string') {
    return result;
  } else {
    return key; // Return the key itself if the translation is not found
  }
};
