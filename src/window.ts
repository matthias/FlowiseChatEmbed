import { observersConfigType } from './components/Bot';
import { ModalProps } from './features/modal/components/Modal';

/* eslint-disable solid/reactivity */
type BotProps = {
  chatflowid: string;
  apiHost?: string;
  chatflowConfig?: Record<string, unknown>;
  observersConfig?: observersConfigType;
};

let elementUsed: Element | undefined;

export const initFull = (props: BotProps & { id?: string }) => {
  destroy();
  const fullElement = props.id ? document.getElementById(props.id) : document.querySelector('flowise-fullchatbot');
  if (!fullElement) throw new Error('<flowise-fullchatbot> element not found.');
  Object.assign(fullElement, props);
  elementUsed = fullElement;
};

export type FlowiseModalElement = HTMLElement & {
  openBot?: (input?: string) => void;
  buttonLabel?: string;
  showInput?: boolean;
};

export const initModal = (props: ModalProps & { id?: string }) => {
  destroy();
  const modalElement = (props.id ? document.getElementById(props.id) : document.querySelector('flowise-modalchatbot')) as FlowiseModalElement;
  if (!modalElement) throw new Error('<flowise-modalchatbot> element not found.');
  Object.assign(modalElement, props);

  elementUsed = modalElement;
  modalElement.openBot = (input?: string) => {
    const event = new CustomEvent('openBot', { bubbles: true, composed: true, detail: { msg: input } });
    modalElement.dispatchEvent(event);
  };
  return modalElement;
};

export const init = (props: BotProps) => {
  destroy();
  const element = document.createElement('flowise-chatbot');
  Object.assign(element, props);
  document.body.appendChild(element);
  elementUsed = element;
};

export const destroy = () => {
  elementUsed?.remove();
};

type Chatbot = {
  initFull: typeof initFull;
  init: typeof init;
  initModal: typeof initModal;
  destroy: typeof destroy;
};

declare const window:
  | {
      Chatbot: Chatbot | undefined;
    }
  | undefined;

export const parseChatbot = () => ({
  initFull,
  init,
  initModal,
  destroy,
});

export const injectChatbotInWindow = (bot: Chatbot) => {
  if (typeof window === 'undefined') return;
  window.Chatbot = { ...bot };
};
