export declare const MAIN_LANGUAGE: Language;
export declare const languages: {
    en: {
        modalButton: {
            label: () => string;
        };
        feedback: {
            title: string;
            inputPlaceholder: string;
            submitButton: string;
        };
    };
    de: {
        modalButton: {
            label: () => string;
        };
        feedback: {
            title: string;
            inputPlaceholder: string;
            submitButton: string;
        };
    };
};
export type Language = keyof typeof languages;
export declare const languageKeys: string[];
type ExtractedLangDict = Partial<typeof MAIN_LANGUAGE>;
export interface LANG_DICT extends Partial<Record<keyof ExtractedLangDict, any>> {
    [key: string]: any;
}
export {};
//# sourceMappingURL=index.d.ts.map