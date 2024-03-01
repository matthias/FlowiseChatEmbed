import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'ignore',
  markdown: {
    syntaxHighlight: 'prism',
  },
  integrations: [
    starlight({
      title: 'FlowiseChatEmbed',
      customCss: ['./src/tailwind.css'],
      social: {
        github: 'https://github.com/FlowiseAI/FlowiseChatEmbed',
      },
      sidebar: [
        {
          label: 'Demos',
          autogenerate: {
            directory: 'demos',
          },
        },
        {
          label: 'Guides',
          autogenerate: {
            directory: 'guides',
          },
        },
      ],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});