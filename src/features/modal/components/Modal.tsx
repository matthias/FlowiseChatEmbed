import { createSignal, Show, splitProps, onCleanup, onMount } from 'solid-js';
import styles from '../../../assets/index.css';
import waffStyles from '../../../assets/waff.css';
import { ModalButton } from './ModalButton';
import { ModalParams } from '../types';
import { Bot, BotProps, BotRef } from '../../../components/Bot';
import { getModalButtonSize } from '@/utils';
import { WaffLogo } from '@/components/icons/WaffLogo';

const defaultButtonColor = '#3B81F6';
const defaultIconColor = 'white';

export type ModalProps = BotProps & ModalParams;

export const Modal = (props: ModalProps, modalElement: any) => {
  console.log('Modal props', props);
  const [bubbleProps] = splitProps(props, ['theme']);

  const [isBotOpened, setIsBotOpened] = createSignal(false);
  const [isBotStarted, setIsBotStarted] = createSignal(false);
  const [buttonLabel, setButtonLabel] = createSignal('Zum Chatbot');
  const [showInput, setShowInput] = createSignal(true);
  const [buttonPosition, setButtonPosition] = createSignal({
    bottom: bubbleProps.theme?.button?.bottom ?? 20,
    right: bubbleProps.theme?.button?.right ?? 20,
  });

  let botRef: BotRef | null = null;

  const callBotHandleSubmit = (input: string) => {
    if (botRef) {
      botRef.handleSubmit(input);
    }
  };

  onMount(() => {
    const buttonLabel = modalElement.element.attributes.getNamedItem('buttonLabel')?.value;
    if (buttonLabel) setButtonLabel(buttonLabel);

    const showInput = modalElement.element.attributes.getNamedItem('showInput')?.value;
    setShowInput(showInput != 'false' && showInput != '0' && showInput != 'no' && showInput != undefined);

    console.log('Modal mounted', modalElement);
  });

  const openBot = () => {
    if (!isBotStarted()) setIsBotStarted(true);
    setIsBotOpened(true);
  };

  const closeBot = () => {
    setIsBotOpened(false);
  };

  const toggleBot = () => {
    isBotOpened() ? closeBot() : openBot();
  };
  window.addEventListener('openBot', (event: any) => {
    openBot();
    const msg = event.detail.msg;
    if (msg) {
      callBotHandleSubmit(msg);
    }
  });

  onCleanup(() => {
    setIsBotStarted(false);
    window.removeEventListener('openBot', openBot);
  });

  const buttonSize = getModalButtonSize(props.theme?.button?.size); // Default to 48px if size is not provided
  const buttonBottom = props.theme?.button?.bottom ?? 20;
  const chatWindowBottom = buttonBottom + buttonSize + 10; // Adjust the offset here for slight shift

  // if the modal is open and the hits the esc key, close the modal
  window.onkeydown = (event) => {
    if (event.key === 'Escape' && isBotOpened()) {
      closeBot();
    }
  };

  return (
    <>
      <style>
        {styles}
        {waffStyles}
      </style>
      <ModalButton
        {...bubbleProps.theme?.button}
        toggleBot={toggleBot}
        isBotOpened={isBotOpened()}
        buttonLabel={buttonLabel()}
        showInput={showInput()}
        setButtonPosition={setButtonPosition}
        dragAndDrop={bubbleProps.theme?.button?.dragAndDrop ?? false}
      />
      <div
        id="chatbot-modal"
        part="bot"
        style={{
          transition: 'transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out',
          'transform-origin': 'center',
          transform: isBotOpened() ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',
          'box-shadow': 'rgb(0 0 0 / 16%) 0px 5px 40px',
          'z-index': 42424242,
        }}
        class={`chatbot-modal fixed inset-0 ` + (isBotOpened() ? ' opacity-1' : ' opacity-0 pointer-events-none') + ` bottom-${chatWindowBottom}px`}
      >
        <div class="md:p-8 absolute inset-0 overflow-y-auto flex flex-col scrollbar-transparent">
          <div class="flex justify-end md:container w-full mx-auto p-4 md:pb-3">
            <button onClick={closeBot} class="text-white flex flex-nowrap items-center" aria-label="schließen" title="schließen">
              <span>schließen</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="md:container mx-auto flex gap-x-6 md:flex-row flex-col flex-grow items-stretch md:justify-stretch">
            <div class="relative grid md:w-3/5 h-[90vh] max-h-screen md:order-2 p-4 md:p-0">
              <Show when={isBotStarted()}>
                <Bot
                  badgeBackgroundColor={bubbleProps.theme?.chatWindow?.backgroundColor}
                  bubbleBackgroundColor={bubbleProps.theme?.button?.backgroundColor ?? defaultButtonColor}
                  bubbleTextColor={bubbleProps.theme?.button?.iconColor ?? defaultIconColor}
                  showTitle={bubbleProps.theme?.chatWindow?.showTitle}
                  title={bubbleProps.theme?.chatWindow?.title}
                  titleAvatarSrc={bubbleProps.theme?.chatWindow?.titleAvatarSrc}
                  welcomeMessage={bubbleProps.theme?.chatWindow?.welcomeMessage}
                  errorMessage={bubbleProps.theme?.chatWindow?.errorMessage}
                  poweredByTextColor={bubbleProps.theme?.chatWindow?.poweredByTextColor}
                  textInput={bubbleProps.theme?.chatWindow?.textInput}
                  botMessage={bubbleProps.theme?.chatWindow?.botMessage}
                  userMessage={bubbleProps.theme?.chatWindow?.userMessage}
                  feedback={bubbleProps.theme?.chatWindow?.feedback}
                  fontSize={bubbleProps.theme?.chatWindow?.fontSize}
                  footer={bubbleProps.theme?.chatWindow?.footer}
                  chatflowid={props.chatflowid}
                  chatflowConfig={props.chatflowConfig}
                  apiHost={props.apiHost}
                  observersConfig={props.observersConfig}
                  ref={(instance) => (botRef = instance)}
                />
              </Show>
            </div>
            <article class="md:w-2/5 flex flex-col p-8 md:p-0">
              <div class="flex flex-col overflow-y-auto max-h-full flex-grow scrollbar-transparent">
                <h1 class="text-white text-3xl font-bold">
                  <WaffLogo />
                  <span class="sr-only" />
                </h1>
                <main class="flex-grow">
                  <p class="text-white text-xl my-4">
                    Willkommen beim Chat des waff zum Thema <strong>Sozial- und Pflegeberufe</strong>
                  </p>
                  <p class="text-white text-lg my-4">
                    Dieser versucht dir bei Fragen rund um das Thema auf Basis der Informationen auf der Website und in unseren Informationsunterlagen
                    weiter zu helfen.
                  </p>
                  <p class="text-white text-lg my-4">
                    Wir befinden uns in einer Testphase und freuen uns über dein Feedback. Bitte beachte, dass der Chat keine verbindlichen Auskünfte
                    geben kann und auch Fehler machen kann.
                  </p>
                </main>
                <footer>
                  <p class="text-white my-4">
                    Bei weiteren Fragen wenden Sie sich gerne an unser Infotelefon für arbeitslose Wiener*innen unter der
                    <span class="text-white font-bold text-xl mt-1 block">
                      Nummer:{' '}
                      <a href="tel:0043" class="underline">
                        01 217 48 777
                      </a>
                    </span>
                  </p>
                  <p class="text-white my-4">
                    Mo – Do 8 – 17 Uhr
                    <br /> Fr 8 – 15 Uhr
                    <br />
                    <br /> Lassallestraße 1 1020 Wien
                    <br />
                    <a href="mailto:ai-kundInnencenter@waff.at" class="underline">
                      ai-kundInnencenter@waff.at
                    </a>
                  </p>
                  <p class="text-white mt-8 flex gap-2 text-sm">
                    <a href="https://www.waff.at/" class="underline">
                      www.waff.at
                    </a>
                    <a href="https://www.waff.at/" class="underline">
                      Impressum
                    </a>
                    <a href="https://www.waff.at/" class="underline">
                      Datenschutz
                    </a>
                  </p>
                </footer>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
};
