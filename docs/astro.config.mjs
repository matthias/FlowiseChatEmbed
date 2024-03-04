import { defineConfig } from 'astro/config';
import { astroExpressiveCode } from '@astrojs/starlight/expressive-code';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import solid from '@astrojs/solid-js';
import react from '@astrojs/react';


import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'ignore',
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'dracula',
      experimentalThemes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    }
  },
  integrations: [
    react({
      include: ['**/react/*'],
    }),
    solid({
      include: ['**/solid/*'],
    }),
    astroExpressiveCode(),
    mdx(),
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
        { label: 'Settings', link: '/settings/' },
      ],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    // mdx(),
  ],
});