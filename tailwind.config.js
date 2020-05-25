/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './modules/**/*.{vue,js}',
      './components/**/*.{vue,js}',
    ]
  },
  theme: {
    fontFamily: {
      'sans': ['Montserrat', 'sans-serif'],
    }
  },
  variants: {},
  plugins: []
};
