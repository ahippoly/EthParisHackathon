<template>
  <section class="h-screen d-flex flex-column">
    <pass-phrase :is-opened="!decryptedKey" @wallet-created="connectXMTPClient"></pass-phrase>
    <chat-page v-if="chatPageId && client" :user-id="chatPageId" :client="client" @go-back="chatPageId = ''"></chat-page>
    <conversation-list-page v-else-if="client" :client="client" @go-to-chat-page="updateChatPage"></conversation-list-page>
  </section>
</template>

<script lang="ts" setup>
import { Client } from '@xmtp/xmtp-js'
import { Wallet, ethers } from 'ethers'
import { storeToRefs } from 'pinia'

definePageMeta({ middleware: ['is-logged-in-and-has-complete-profile'] })
const userId = useRoute().params.slug

const client = ref<Client>()
const chatPageId = ref<string>('')

const { decryptedKey } = storeToRefs(useKeyDecrypt())

onBeforeMount(async () => {
  const profile = await useAPI().users.getProfile()
  if (!profile.data) return

  if (decryptedKey.value) {
    const wallet = new ethers.Wallet(decryptedKey.value)
    connectXMTPClient(wallet)
  }

  useSessionStore().setUser(profile.data)
})

const updateChatPage = (id: string) => {
  chatPageId.value = id
}

const connectXMTPClient = async (wallet: Wallet) => {
  if (client.value) return

  client.value = await Client.create(wallet)
  if (userId) chatPageId.value = userId as string
}
</script>
