/* eslint-disable solid/reactivity */
import { customElement } from 'solid-element';
import { defaultBotProps, BotProps } from './ChatContext';

export function registerCustomElememt(name: string, feature: any) {
  if (typeof window === 'undefined') return;

  const tag = 'flowise-' + name;
  customElement(tag, defaultBotProps, feature);

  if (!window.Flowise) {
    window.Flowise = {};
  }

  // init function name is init + name with first letter capitalized
  const initFunctionName = 'init' + name.charAt(0).toUpperCase() + name.slice(1);

  // add init function to Flowise object
  // Usage: Flowise.initOverlay({ id: 'my-overlay', ...props });
  window.Flowise[initFunctionName] = (props: BotProps & ComoponentIdentifierProps) => {
    applyPropsToCustomElement(tag, props);
  };

  return window.Flowise;
}

export function applyPropsToCustomElement(tag: string, props: BotProps & ComoponentIdentifierProps) {
  const element = document.getElementById(props.id) ?? document.querySelector(tag);
  if (!element) throw new Error(`<${tag}> element not found.`);
  Object.assign(element, props);
}

/** types */

type ComoponentIdentifierProps = {
  id: string;
};

type Flowise = Record<string, unknown>;

declare const window:
  | {
      Flowise: Flowise | undefined;
    }
  | undefined;
