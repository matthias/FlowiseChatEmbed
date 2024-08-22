import { Language } from '../i18n';
export declare const currentLanguage: import("solid-js").Accessor<"en" | "de">, setCurrentLanguage: import("solid-js").Setter<"en" | "de">;
export declare const getTranslations: (lang?: Language) => {
    modalButton: {
        label: () => string;
    };
    feedback: {
        title: string;
        inputPlaceholder: string;
        submitButton: string;
    };
} | {
    modalButton: {
        label: () => string;
    };
    feedback: {
        title: string;
        inputPlaceholder: string;
        submitButton: string;
    };
};
export declare const t: (key: string, ...args: string[]) => string;
//# sourceMappingURL=i18n.d.ts.map