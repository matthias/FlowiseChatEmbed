import { ButtonTheme } from '../types';
import { SendIcon } from '@/components/icons';
import { getModalButtonSize } from '@/utils';
import { createSignal } from 'solid-js';
import { t } from '@/utils/i18n';

type Props = ButtonTheme & {
  isBotOpened: boolean;
  toggleBot: () => void;
  buttonLabel?: string;
  showInput?: boolean;
  setButtonPosition: (position: { bottom: number; right: number }) => void; // New prop for updating position
  dragAndDrop: boolean; // Ensure dragAndDrop prop is passed
  backgroundImage?: string;
};

const defaultButtonColor = '#3B81F6';
const defaultBottom = 20;
const defaultRight = 20;

export const ModalButton = (props: Props) => {
  // eslint-disable-next-line solid/reactivity
  const buttonSize = getModalButtonSize(props.size); // Default to 48px if no size is specified

  const [position, setPosition] = createSignal({
    bottom: props.bottom ?? defaultBottom,
    right: props.right ?? defaultRight,
  });
  const [isDragging, setIsDragging] = createSignal(false);

  let dragStartX: number;
  let initialRight: number;

  const onMouseDown = (e: MouseEvent) => {
    if (props.dragAndDrop) {
      dragStartX = e.clientX;
      initialRight = position().right;

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    const deltaX = dragStartX - e.clientX;
    const newRight = initialRight + deltaX;
    if (deltaX !== 0) {
      setIsDragging(true);
    }

    // Check if the new position is within the screen boundaries
    const screenWidth = window.innerWidth;
    const maxRight = screenWidth - buttonSize;

    const newPosition = {
      right: Math.min(Math.max(newRight, defaultRight), maxRight),
      bottom: position().bottom,
    };

    setPosition(newPosition);
    props.setButtonPosition(newPosition); // Update parent component's state
  };

  const onMouseUp = () => {
    if (props.dragAndDrop) {
      window.setTimeout(() => {
        setIsDragging(false);
      }, 1);
    }
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  const onClick = () => {
    if (!isDragging()) {
      props.toggleBot();
    }
  };

  // const [isFocused] = createSignal(false);

  return (
    <div class={`chatbot-modal-button flex`}>
      {props.showInput && false && (
        <input
          class="px-4 py-3 w-full mr-4 border border-white"
          type="search"
          placeholder="Stelle mir eine Frage ..."
          style={{
            'background-color': '#ffffff88',
          }}
        />
      )}
      <button
        part="button"
        type="button"
        onClick={onClick}
        onMouseDown={onMouseDown}
        class={`button-size-${buttonSize} fixed shadow-md rounded-sm flex justify-center items-center px-4 py-3 gap-3 hover:scale-110 active:scale-95 transition-transform duration-200 animate-fade-in`}
        style={{
          'background-color': props.backgroundColor ?? defaultButtonColor,
          'background-image': props.backgroundImage ?? '',
          'z-index': 100000,
          right: `${position().right}px`,
          bottom: `${position().bottom}px`,
          cursor: props.dragAndDrop ? 'grab' : 'pointer',
        }}
      >
        <span class="inline-block whitespace-nowrap">{props.buttonLabel ?? t('modalButton.label')}</span>
        <SendIcon size={16} />
      </button>
    </div>
  );
};
