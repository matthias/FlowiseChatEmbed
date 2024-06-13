import { observersConfigType } from './components/Bot';
import { ModalProps } from './features/modal/components/Modal';
type BotProps = {
    chatflowid: string;
    apiHost?: string;
    chatflowConfig?: Record<string, unknown>;
    observersConfig?: observersConfigType;
};
export declare const initFull: (props: BotProps & {
    id?: string;
}) => void;
export type FlowiseModalElement = HTMLElement & {
    openBot?: (input?: string) => void;
    buttonLabel?: string;
    showInput?: boolean;
};
export declare const initModal: (props: ModalProps & {
    id?: string;
}) => FlowiseModalElement;
export declare const init: (props: BotProps) => void;
export declare const destroy: () => void;
type Chatbot = {
    initFull: typeof initFull;
    init: typeof init;
    initModal: typeof initModal;
    destroy: typeof destroy;
};
export declare const parseChatbot: () => {
    initFull: (props: BotProps & {
        id?: string;
    }) => void;
    init: (props: BotProps) => void;
    initModal: (props: ModalProps & {
        id?: string;
    }) => FlowiseModalElement;
    destroy: () => void;
};
export declare const injectChatbotInWindow: (bot: Chatbot) => void;
export {};
//# sourceMappingURL=window.d.ts.map