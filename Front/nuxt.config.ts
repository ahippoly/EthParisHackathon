import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  ssr: false,
  dev: process.env.NODE_ENV !== 'production',
  runtimeConfig: {
    // private buildtime available variables
    SOME_PRIVATE_VAR: 'server-side only',
    // public runtime available variables
    public: {}
  },
  alias: {
    '@/': './'
  },
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                  @import "@/assets/scss/variables/colors.scss";
                  @import "@/assets/scss/variables/fonts.scss";
                  @import "@/assets/scss/variables/font-size.scss";
                  @import "@/assets/scss/variables/spacing.scss";
                  @import "@/assets/scss/_css-reset.scss";
                  @import "@/assets/scss/global.scss";
                `,
            },
        },
    },
  },
  imports: {
    autoImport: true,
    dirs: ['stores'],
  },
  modules: [
    ['@pinia/nuxt', { autoImports: ['defineStore'] }],
    '@pinia-plugin-persistedstate/nuxt'
  ],
  components: [{
    path: '~/components/',
    pathPrefix: false
  }],
  app: {
    head: {
      title: 'Harpos',
      titleTemplate: '%s · Communication between holders',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'keywords',
          content:
            'to-define'
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Harpos · Communication between holders'
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900|Nunito:300,400,500,600,700,800,900&display=swap'
        }
      ],
      script: []
    }
  }
})

