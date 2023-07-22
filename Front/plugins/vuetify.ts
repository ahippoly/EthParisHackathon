import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const themes: Record<string, ThemeDefinition> = {
  harpos: {
    dark: false,
    colors: {
      background: '#090909',
      surface: '#FFFFFF',
      primary: '#76D3FF',
      secondary: '#6B22CF',
      text: '#090909',
      action: '#76D3FF',
      error: '#D62828'
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
      },
      vInput: {
        color: 'text',
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
