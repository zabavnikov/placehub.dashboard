require('dotenv').config();
const routes = require('./routes');

module.exports = {
  server: {
    port: 4000,
  },

  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,600,700&display=swap'}
    ],
  },

  router: {
    middleware: ['dashboard']
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
  ],


  buildModules: [
    '@nuxtjs/tailwindcss'
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: `${process.env.API_URL}/api/users/login`, method: 'post', propertyName: 'token' },
          logout: { url: `${process.env.API_URL}/api/users/logout`, method: 'post' },
          user: { url: `${process.env.API_URL}/api/users/me`, method: 'post', propertyName: false },
        },
      }
    }
  },

  plugins: [
    '~/plugins/vuetify',
  ],

  css: [
    '~/assets/scss/common.scss',
    '~/assets/scss/3rd-party/font-awesome/font-awesome.scss',
  ],

  /*
    Modules.
   */
  toast: {
    duration: 3000,
  },

  env: {
    API_USERS: '/api/users',
    API_GEO: '/api/places',
  },

  router: {
    extendRoutes(nuxtRoutes, resolve) {
      routes(__dirname, nuxtRoutes, resolve);
    }
  },
};
