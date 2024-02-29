/* eslint-disable solid/reactivity */
import { registerCustomElememt } from '@/app/register';
import Overlay from '@/features/overlay/Overlay';

export function register() {
  return registerCustomElememt('overlay', Overlay);
}
