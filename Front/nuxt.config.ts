import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@fortawesome/fontawesome-svg-core/styles.css', 'vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
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
    transpile: ['vuetify']
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
                `
        }
      }
    }
  },
  imports: {
    autoImport: true,
    dirs: ['stores']
  },
  modules: [['@pinia/nuxt', { autoImports: ['defineStore'] }], '@pinia-plugin-persistedstate/nuxt'],
  components: [
    {
      path: '~/components/',
      pathPrefix: false
    }
  ],
  app: {
    head: {
      title: 'Harpos',
      titleTemplate: '%s · Communication between holders',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'keywords',
          content: 'value,my,car,vmc,valuemycar,voitures,carstaging,esthetique,mecanique,detailing,prestataires,prestataire'
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Harpos · Communication between holders'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900|Nunito:300,400,500,600,700,800,900&display=swap'
        }
      ],
      script: [
        // stripe
        { src: 'https://js.stripe.com/v3/' },
        { src: 'https://accounts.google.com/gsi/client' },
        // Mapbox
        { src: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js' },
        {
          type: 'text/javascript',
          src: 'https://cdn.jsdelivr.net/npm/vue-mapbox@latest/dist/vue-mapbox.min.js'
        },
        // google tag manager
        {
          hid: 'gtmHead',
          innerHTML: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5MHFNWZ');`
        },
        // facebook pixel
        {
          children:
            "!(function(f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function(...args) {   n.callMethod ? n.callMethod(...args) : n.queue.push(args) }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);})(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');fbq('init', '669743703885993');fbq('track', 'PageView');"
        }
      ]
    }
  }
})
