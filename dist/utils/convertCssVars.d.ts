/**
 * Converts a theme object to a style object with css variables.
 *
 * @param defaultTheme object with default theme properties which can be overwritten by the theme object
 * @param theme theme object from themes
 * @param namespace will be used as prefix for the css variable name; --namespace-key-name (camelCase to kebab-case)
 * @returns style object with css variables
 */
export declare const convertCssVars: (defaultTheme: ThemeProps, theme: ThemeProps | undefined, namespace?: string | undefined) => {
    [key: string]: string;
};
export interface ThemeProps {
    [key: string]: string | unknown | undefined;
}
//# sourceMappingURL=convertCssVars.d.ts.map