import { BotProps } from '@/app/ChatContext';
export declare const defaultThemeOverlay: ThemeOverlay;
export interface ThemeOverlay {
    [key: string]: string | unknown | undefined;
}
export type OverlayProps = BotProps & {
    theme?: {
        overlay: ThemeOverlay;
    };
};
//# sourceMappingURL=theme.d.ts.map