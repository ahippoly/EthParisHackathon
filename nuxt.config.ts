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
    public: {
      // api
      BASE_API_URL: process.env.BASE_API_URL,
      CENTER_RAMBOUILLET_ID: process.env.CENTER_RAMBOUILLET_ID,
      // firebase
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      // stripe
      STRIPE_ALIXONE_ACCESS_KEY: process.env.STRIPE_ALIXONE_ACCESS_KEY,
      STRIPE_FERDIONE_ACCESS_KEY: process.env.STRIPE_FERDIONE_ACCESS_KEY,
      // mapbox
      MAPBOX_MAP_STYLE: process.env.MAPBOX_MAP_STYLE,
      MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,

      // instagram
      IG_ROOT_URL: process.env.IG_ROOT_URL,
      IG_USER_ID: process.env.IG_USER_ID,
      IG_LONG_TOKEN: process.env.IG_LONG_TOKEN,
      // oauth
      GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      YAHOO_OAUTH_CLIENT_ID: process.env.YAHOO_OAUTH_CLIENT_ID
    }
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
                  @import "@/assets/scss/_mixins.scss";
                  @import "@/assets/scss/_stylesheet.scss";
                  @import "@/assets/scss/_animations.scss";
                  @import "@/assets/scss/_layouts.scss";
                  @import "@/assets/scss/buttons/_buttons.scss";
                  @import "@/assets/scss/_inputs.scss";
                  @import "@/assets/scss/_text.scss";
                  @import "@/assets/scss/_backgrounds.scss";
                  @import "@/assets/scss/global.scss";
                `,
            },
        },
    },
  },
  imports: {
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
      title: 'ValueMyCar',
      titleTemplate: '%s · La solution à tous vos problèmes autos en quelques clics',
      meta: [
        { charset: 'utf-8' },
        { name: 'facebook-domain-verification', content: '61we6a952caq5c9m32bjt582cxzk1a' },
        {
          name: 'keywords',
          content:
            'value,my,car,vmc,valuemycar,voitures,carstaging,esthetique,mecanique,detailing,prestataires,prestataire'
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'ValueMyCar · La solution à tous vos problèmes autos en quelques clics!'
        },
        {
          property: 'og:image',
          content: 'https://valuemycar.fr/images/vmclogo.svg'
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
        {src: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js'},
        {
          type:'text/javascript',
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
          })(window,document,'script','dataLayer','GTM-5MHFNWZ');`,
        },
        // facebook pixel
        { children: "!(function(f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function(...args) {   n.callMethod ? n.callMethod(...args) : n.queue.push(args) }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);})(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');fbq('init', '669743703885993');fbq('track', 'PageView');" },
      ]
    }
  }
})

