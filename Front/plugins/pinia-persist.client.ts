import { PiniaPluginContext } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$pinia.use((context: PiniaPluginContext) => piniaPluginPersistedstate(context))
})
