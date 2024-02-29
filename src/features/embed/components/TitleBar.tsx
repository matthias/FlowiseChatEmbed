import { useChatContext } from '@/app/ChatContext';
import { clearChat } from '@/app/messageStore';
import { DeleteButton } from '@/components';
import { Avatar } from '@/components/avatars/Avatar';
import { Show } from 'solid-js';

export function TitleBar() {
  const context: any = useChatContext();

  return (
    <header part="chatbot-titlebar" class="chatbot-titlebar">
      <Show when={context.props?.theme?.chatWindow?.titleAvatarSrc}>
        <Avatar initialAvatarSrc={context.props.theme?.chatWindow?.titleAvatarSrc as string} />
      </Show>
      <Show when={context.props?.theme?.chatWindow?.title}>
        <span class="px-4 whitespace-pre-wrap font-semibold max-w-full">{context.props?.theme?.chatWindow?.title as string}</span>
      </Show>
      <div class="flex-1" />
      <DeleteButton
        type="button"
        sendButtonColor={
          (context.props.theme?.chatWindow?.sendButtonColor as string) ?? (context.props.theme?.chatWindow?.titlebarTextColor as string)
        }
        class="my-2 ml-2"
        on:click={() => clearChat(context.clearChat())}
      >
        <span style={{ 'font-family': 'Poppins, sans-serif' }}>Clear</span>
      </DeleteButton>
    </header>
  );
}
