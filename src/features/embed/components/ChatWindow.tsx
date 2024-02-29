import { For } from 'solid-js';

import { convertCssVars } from '@/utils/convertCssVars';
import styles from '../chat.css';
import textInputStyles from '../components/text-input.css';

import { useChatContext } from '@/app/ChatContext';
import { TitleBar } from './TitleBar';
import { TextInput } from './TextInput';
import { GuestBubble } from '@/components/bubbles/GuestBubble';
import { BotBubble } from '@/components/bubbles/BotBubble';
import { LoadingBubble } from '@/components/bubbles/LoadingBubble';
import { BotMessage } from './BotMessage';

export const defaultChatWindowTheme = {
  backgroundColor: 'white',
  titlebarBgColor: '',
  titlebarTextColor: 'black',
  fontSize: '1rem',
};

export type ChatWindowTheme = Partial<typeof defaultChatWindowTheme>; // make all properties optional

export const defaultChatWindowProps = {
  ...defaultChatWindowTheme,
  showTitle: true,
  title: 'Chat',
  titleAvatarSrc: '',
};

export type ChatWindowProps = typeof defaultChatWindowProps & {
  onSubmit: (value: string) => void;
} & ChatWindowTheme;

export function ChatWindow() {
  const chatbot: any = useChatContext();
  const cssVars = () => convertCssVars(defaultChatWindowTheme, chatbot.props?.theme?.chatWindow, 'chatwindow');

  return (
    <>
      {/* As we are within a custom element (shadow dom) we inline all required styles. */}
      <style>
        {styles}
        {textInputStyles}
      </style>
      <div class="chatbot-container" part="chatbot" style={cssVars()}>
        <TitleBar />
        <main class="chatbot-main flex-grow" part="chatbot-main">
          <div class="chatbot-messages" part="chatbot-messages">
            <For each={chatbot.chat.messages}>
              {(message, index) => (
                <>
                  {message.type === 'userMessage' && (
                    <GuestBubble
                      message={message.message}
                      backgroundColor={chatbot.props.userMessage?.backgroundColor}
                      textColor={chatbot.props.userMessage?.textColor}
                      showAvatar={chatbot.props.userMessage?.showAvatar}
                      avatarSrc={chatbot.props.userMessage?.avatarSrc}
                    />
                  )}
                  {message.type === 'apiMessage' && (
                    <BotMessage
                      message={message.message}
                      fileAnnotations={message.fileAnnotations}
                      // apiHost={chatbot.props.apiHost}
                      backgroundColor={chatbot.props.botMessage?.backgroundColor}
                      // textColor={chatbot.props.botMessage?.textColor}
                      showAvatar={chatbot.props.botMessage?.showAvatar}
                      avatarSrc={chatbot.props.botMessage?.avatarSrc}
                    />
                  )}
                  {message.type === 'userMessage' && chatbot.chat.loading && index() === chatbot.chat.messages.length - 1 && <LoadingBubble />}
                </>
              )}
            </For>
          </div>
        </main>
        <footer class="chatbot-footer p-4 bg-slate-200">
          <TextInput onSubmit={chatbot.sendMessage} />
        </footer>
      </div>
    </>
  );
}
