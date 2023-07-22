// must be explicitly imported for vitest unit testing
import { defineStore } from 'pinia'
import { decryptKey } from '~~/modules/ethers/keyEncrypter'

export interface IDecryptedKey {
  decryptedKey: string
}

const storedData: IDecryptedKey = {
  decryptedKey: ''
}

export const useKeyDecrypt = defineStore({
  id: 'decryptKey',
  state: () => storedData,
  actions: {
    async decryptKey(secretPhrase: string, cryptedPrivateKey: string) {
      this.decryptedKey = await decryptKey(cryptedPrivateKey, secretPhrase)
    },
    setDecryptedKey(key: string) {
      this.decryptedKey = key
    },
    getDecryptedKey() {
      return this.decryptedKey
    }
  },
  persist: true
})
