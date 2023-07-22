// must be explicitly imported for vitest unit testing
import { defineStore } from 'pinia'
import { Client } from '@xmtp/xmtp-js'
import { getOrCreateUserWallet } from '@/modules/ethers/ethersUtilsForXMTP'
import { createClient } from '@/modules/xmtp/xmtpUtils'

export interface IChatSession {
  client: Client | null
}

const storedData: IChatSession = {
  client: null
}

export const useChatSessionStore = defineStore({
  id: 'chatSession',
  state: () => storedData,
  actions: {
    async createClient(secretPhrase: string, privateKey: string) {
      this.client = await createClient(getOrCreateUserWallet(secretPhrase, privateKey))
    },
    updateClient(client: Client) {
      this.client = client
    },
    async getClient() {
      return this.client
    }
  },
  persist: true
})
