// eslint-disable-next-line no-undef
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'field-sizing': 'border-box',
          }, // Add 'as any' here
        },
      }),
    },
  },
};
