import { JSX } from 'solid-js';
import { MessageType } from './messageStore';
export declare const defaultBotProps: BotProps;
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
export declare const ChatContext: import("solid-js").Context<unknown>;
export declare function useChatContext(): unknown;
export declare function ChatProvider(props: BotProps & {
    children: JSX.Element;
}): JSX.Element;
export {};
//# sourceMappingURL=ChatContext.d.ts.map