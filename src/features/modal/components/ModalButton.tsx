import { createSignal } from 'solid-js';
import { ButtonTheme } from '../types';
import { SendIcon } from '@/components/icons';
import { getModalButtonSize } from '@/utils';

type Props = ButtonTheme & {
  isBotOpened: boolean;
  toggleBot: () => void;
};

const defaultButtonColor = '#3B81F6';

export const ModalButton = (props: Props) => {
  // eslint-disable-next-line solid/reactivity
  const buttonSize = getModalButtonSize(props.size); // Default to 48px if no size is specified

  // const [isFocused] = createSignal(false);

  return (
    <div class="flex">
      <input
        class="px-4 py-3 w-full mr-4 border border-white"
        type="search"
        placeholder="Stelle mir eine Frage ..."
        style={{
          'background-color': '#ffffff88',
        }}
      />
      <button
        part="button"
        type="button"
        onClick={() => props.toggleBot()}
        class={`button-size-${buttonSize} rounded-sm flex justify-center items-center px-4 py-1 gap-3`}
        style={{
          'background-color': props.backgroundColor ?? defaultButtonColor,
        }}
      >
        <span class="inline-block whitespace-nowrap">Zum Chatbot</span>
        <SendIcon size={16} />
      </button>
    </div>
  );
};
