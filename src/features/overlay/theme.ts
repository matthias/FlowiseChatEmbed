import { BotProps } from '@/app/ChatContext';

export const defaultThemeOverlay: ThemeOverlay = {
  backgroundColor: 'blue',
  backgroundImage: '',
  asideBackgroundImage: '',
};

export interface ThemeOverlay {
  [key: string]: string | unknown | undefined;
}

export type OverlayProps = BotProps & {
  theme?: {
    overlay: ThemeOverlay;
  };
};
