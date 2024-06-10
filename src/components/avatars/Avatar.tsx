import { isMobile } from '@/utils/isMobileSignal';
import { createEffect, createSignal, Show } from 'solid-js';
import { isNotEmpty } from '@/utils/index';
import { DefaultAvatar } from './DefaultAvatar';

export const Avatar = (props: { initialAvatarSrc?: string }) => {
  const [avatarSrc, setAvatarSrc] = createSignal(props.initialAvatarSrc);

  createEffect(() => {
    if (avatarSrc()?.startsWith('{{') && props.initialAvatarSrc?.startsWith('http')) setAvatarSrc(props.initialAvatarSrc);
  });

  return (
    <Show when={isNotEmpty(avatarSrc())} keyed fallback={<DefaultAvatar />}>
      <figure class={'flex justify-center items-center relative mt-3 flex-shrink-0 w-5 h-5 ml-2'}>
        <img src={avatarSrc()} alt="Bot avatar" class="w-full h-full object-contain" />
      </figure>
    </Show>
  );
};
