import { Show, createSignal, onMount } from 'solid-js';
import { Avatar } from '@/components/avatars/Avatar';
import { Marked } from '@ts-stack/markdown';
import { sendFileDownloadQuery } from '@/queries/sendMessageQuery';
import { useChatContext } from '@/app/ChatContext';
import { convertCssVars } from '@/utils/convertCssVars';

export const defaultBotMessageTheme = {
  backgroundColor: '#f7f8ff',
  titlebarBgColor: '#303235',
};

export type BotMessageTheme = Partial<typeof defaultBotMessageTheme>; // make all properties optional

export const defaultBotMessageProps = {
  ...defaultBotMessageTheme,
  message: '',
  showAvatar: false,
  avatarSrc: '',
};

export type BotMessageProps = typeof defaultBotMessageProps &
  BotMessageTheme & {
    message: string;
    fileAnnotations?: any;
    // apiHost?: string;
  };

Marked.setOptions({ isNoP: true });

export const BotMessage = (props: BotMessageProps) => {
  let botMessageElement: HTMLDivElement | undefined;

  const context: any = useChatContext();
  const cssVars = () => convertCssVars(defaultBotMessageTheme, context.props?.theme?.botMessage, 'botMessage');

  const downloadFile = async (fileAnnotation: any) => {
    try {
      const response = await sendFileDownloadQuery({
        apiHost: 'props.apiHost',
        body: { question: '', history: [], fileName: fileAnnotation.fileName },
      });
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileAnnotation.fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  onMount(() => {
    if (botMessageElement) {
      botMessageElement.innerHTML = Marked.parse(props.message);
      if (props.fileAnnotations && props.fileAnnotations.length) {
        for (const annotations of props.fileAnnotations) {
          const button = document.createElement('button');
          button.textContent = annotations.fileName;
          button.className =
            'py-2 px-4 mb-2 justify-center font-semibold text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 file-annotation-button';
          button.addEventListener('click', function () {
            downloadFile(annotations);
          });
          const svgContainer = document.createElement('div');
          svgContainer.className = 'ml-2';
          svgContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-download" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>`;

          button.appendChild(svgContainer);
          botMessageElement.appendChild(button);
        }
      }
    }
  });

  const [isHovered, setIsHovered] = createSignal(false);

  return (
    <div
      class="bot-message-container host-container flex justify-start mb-2 items-start"
      style={cssVars()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Show when={props.showAvatar}>
        <Avatar initialAvatarSrc={props.avatarSrc} />
      </Show>
      <div class="host-message-container relative group">
        <div ref={botMessageElement} class="chatbot-host-bubble prose px-4 py-2 ml-2 max-w-full" data-testid="host-bubble" />
        {/* <div
          class="flex justify-end gap-2 host-actions absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white bg-black p-2 pl-4 pr-4 rounded-md"
          style={{ visibility: isHovered() ? 'visible' : 'hidden' }}
        >
          <button>Copy</button>
          <button>Feedback</button>
          <button>Share</button>
        </div> */}
      </div>
    </div>
  );
};
