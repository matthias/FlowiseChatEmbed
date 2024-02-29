import * as i18n from '@solid-primitives/i18n';
import { dict as en } from './en';
export type Locale = 'en' | 'de';
export declare const locales: Locale[];
export type Translations = Partial<typeof en>;
declare const locale: import("solid-js").Accessor<Locale>, setLocale: import("solid-js").Setter<Locale>;
declare const dict: import("solid-js").InitializedResource<Partial<{
    close: string;
    test2: string;
}>>;
declare const t: i18n.Translator<Partial<{
    close: string;
    test2: string;
}>>;
export { i18n, t, dict, locale, setLocale };
//# sourceMappingURL=index.d.ts.map