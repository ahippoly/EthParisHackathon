import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const themes: Record<string, ThemeDefinition> = {
  harpos: {
    dark: false,
    colors: {
      background: '#2C0735',
      primary: '#4E148C',
      secondary: '#03DAC6',
      action: '#FFE047'
    }
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    defaults: {
      VBtn: {
        color: 'action',
        variant: 'outlined'
      }
    },
    theme: {
      defaultTheme: Object.keys(themes)[0],
      themes,
      variations: {
        colors: ['primary', 'secondary'],
        lighten: 1,
        darken: 2
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
