// import { createSignal, onCleanup, onMount, Show } from 'solid-js';

import { convertCssVars } from '@/utils/convertCssVars';
import styles from './overlay.css';
import { defaultThemeOverlay } from './theme';
import { ChatWindow } from '@/features/embed/components/ChatWindow';
import { BotProps } from '@/app/ChatContext';
import { ChatProvider, useChatContext } from '@/app/ChatContext';
import { t, dict, i18n, locale, setLocale } from '@/i18n';
import { onMount } from 'solid-js';

export const Overlay = (props: BotProps) => {
  // map theme props to css vars
  const cssVars = () => convertCssVars(defaultThemeOverlay, props?.theme?.overlay, 'overlay');

  return (
    <ChatProvider {...props}>
      <style>{styles}</style>
      <OverlayContent {...props} style={cssVars()} />
    </ChatProvider>
  );
};
export default Overlay;

export const OverlayContent = (props: BotProps & { style: any }) => {
  onMount(() => {
    setLocale('en');
  });

  return (
    <>
      <dialog open class="chat-overlay chat-overlay-full chat-widget " style={props.style}>
        <nav class="overlay-nav">
          <button class="close" title="Close Chat">
            {t('close')}
          </button>
        </nav>
        <main class="chat-container">
          <ChatWindow />
        </main>
        <footer class="overlay-footer">
          <span>
            (c) waff 2024, powered by <a href="">Flowise</a> made by <a href="">EN GARDE</a>
          </span>
        </footer>
        <aside class="overlay-aside">
          <h1 class="text-white text-xl font-semibold">waff Chat.</h1>
        </aside>
      </dialog>
    </>
  );
};
