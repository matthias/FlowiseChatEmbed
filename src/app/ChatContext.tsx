import { JSX, createContext, createEffect, splitProps, useContext } from 'solid-js';
import {
  messageStore,
  loadLocalMessages,
  checkIfStreamingIsAvailable,
  loadStarterPrompts,
  sendMessage,
  listenToChatStream,
  clearChat,
} from './messageStore';

import { MessageType } from './messageStore';

export const defaultBotProps: BotProps = {
  chatflowid: 'b07341b9-97b4-491e-a49e-8cf7da73d235',
  apiHost: 'http://localhost:3000',
  welcomeMessage: 'Hi, how can I help you?',
  chatflowConfig: undefined,
  theme: undefined,
  observersConfig: undefined,
};

type observerConfigType = (accessor: string | boolean | object | MessageType[]) => void;
export type observersConfigType = Record<'observeUserInput' | 'observeLoading' | 'observeMessages', observerConfigType>;

export type BotProps = {
  chatflowid: string;
  apiHost: string;
  welcomeMessage?: string;
  chatflowConfig?: Record<string, unknown>;
  observersConfig?: observersConfigType;
  theme?: Record<string, Record<string, unknown>>;
};

// Define the context
export const ChatContext = createContext();

export function useChatContext() {
  return useContext(ChatContext);
}

// Define the provider component
export function ChatProvider(props: BotProps & { children: JSX.Element }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [children, botProps] = splitProps(props, ['children']);

  const context = {
    props: botProps,
    chat: messageStore,
    loadLocalMessages,
    clearChat: () => {
      clearChat(props.chatflowid, props.welcomeMessage);
    },
    sendMessage: (userInput: string) => {
      sendMessage(userInput, props);
    },
  };

  createEffect(() => {
    loadLocalMessages(props.chatflowid);
    checkIfStreamingIsAvailable(props.chatflowid, props.apiHost);
    loadStarterPrompts(props.chatflowid, props.apiHost);
    listenToChatStream(props.chatflowid, props.apiHost);
  });

  return <ChatContext.Provider value={context}>{props.children}</ChatContext.Provider>;
}
