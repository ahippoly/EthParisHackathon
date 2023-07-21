import { createConfig, configureChains, mainnet } from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'

export default defineNuxtPlugin(async () => {
  const { publicClient, webSocketPublicClient } = configureChains([mainnet], [publicProvider()])

  createConfig({
    autoConnect: false,
    publicClient,
    webSocketPublicClient
  })
})
