/**
 * Converts a theme object to a style object with css variables.
 *
 * @param defaultTheme object with default theme properties which can be overwritten by the theme object
 * @param theme theme object from themes
 * @param namespace will be used as prefix for the css variable name; --namespace-key-name (camelCase to kebab-case)
 * @returns style object with css variables
 */
export const convertCssVars = (defaultTheme: ThemeProps, theme: ThemeProps | undefined, namespace: string | undefined = '') => {
  const _cssVars: { [key: string]: string } = {};
  if (theme === undefined) return _cssVars;
  for (const key in defaultTheme) {
    if (theme[key] !== undefined) {
      _cssVars[`--${namespace ? namespace + '-' : ''}${camelToKebabCase(key)}`] = theme[key] as string;
    }
  }
  return _cssVars;
};

export interface ThemeProps {
  [key: string]: string | unknown | undefined;
}

const camelToKebabCase = (str: string) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
