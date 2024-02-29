import { ShortTextInput } from './ShortTextInput';
import { isMobile } from '@/utils/isMobileSignal';
import { createSignal, createEffect, onMount } from 'solid-js';
import { SendButton } from '@/components/SendButton';
import { convertCssVars } from '@/utils/convertCssVars';
import { useChatContext } from '@/app/ChatContext';

export const defaultTextInputTheme = {
  backgroundColor: '#ffffff',
  textColor: '#303235',
  sendButtonColor: '#ffffff',
  fontSize: 16,
};

export type TextInputTheme = Partial<typeof defaultTextInputTheme>; // make all properties optional

export const defaultTextInputProps = {
  placeholder: 'Type your question',
  defaultValue: '',
  disabled: false,
};

export type TextInputProps = Partial<typeof defaultTextInputProps> & {
  onSubmit: (value: string) => void;
} & TextInputTheme;

export const TextInput = (props: TextInputProps) => {
  const [inputValue, setInputValue] = createSignal(props.defaultValue ?? '');
  let inputRef: HTMLInputElement | HTMLTextAreaElement | undefined;

  const context: any = useChatContext();
  const cssVars = () => convertCssVars(defaultTextInputTheme, context.props?.theme?.chatWindow, 'chatwindow');

  const handleInput = (inputValue: string) => setInputValue(inputValue);

  const checkIfInputIsValid = () => inputValue() !== '' && inputRef?.reportValidity();

  const submit = () => {
    if (checkIfInputIsValid()) props.onSubmit(inputValue());
    setInputValue('');
  };

  const submitWhenEnter = (e: KeyboardEvent) => {
    // Check if IME composition is in progress
    const isIMEComposition = e.isComposing || e.keyCode === 229;

    // Check if the key is Enter and not a shift key
    if (e.key === 'Enter' && !e.shiftKey && !isIMEComposition) {
      e.preventDefault();
      submit();
    }
  };

  createEffect(() => {
    if (!props.disabled && !isMobile() && inputRef) inputRef.focus();
  });

  onMount(() => {
    if (!isMobile() && inputRef) inputRef.focus();
  });

  return (
    <div
      part="chatbot-text-input"
      class={'chatbot-input chatbot-text-input flex items-end justify-between'}
      style={cssVars()}
      data-testid="input"
      onKeyDown={submitWhenEnter}
    >
      <ShortTextInput
        ref={inputRef as HTMLInputElement}
        onInput={handleInput}
        value={inputValue()}
        disabled={props.disabled}
        placeholder={props.placeholder ?? 'Type your question'}
      />
      <SendButton
        sendButtonColor={props.sendButtonColor}
        type="button"
        isDisabled={props.disabled || inputValue() === ''}
        class="my-2 ml-2"
        on:click={submit}
      >
        <span>Send</span>
      </SendButton>
    </div>
  );
};
