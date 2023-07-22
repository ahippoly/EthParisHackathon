<template>
  <section class="h-screen d-flex flex-column">
    <h5>Wallet to connect with XMTP</h5>
    <input v-model="walletNum" />
    <v-btn @click="connectXMTPClient"> Connect </v-btn>
    <p>logged client = {{ client?.address }}</p>

    <chat-page v-if="chatPageId && client" :user-id="chatPageId" :client="client"></chat-page>
    <conversation-list-page v-else-if="client" :client="client" @go-to-chat-page="updateChatPage"></conversation-list-page>
  </section>
</template>

<script lang="ts" setup>
import { Client } from '@xmtp/xmtp-js'
import { getOrCreateUserWallet } from '~~/modules/ethers/ethersUtilsForXMTP'
import { createClient } from '~~/modules/xmtp/xmtpUtils'

const client = ref<Client>()
const walletNum = ref<string>('')
const chatPageId = ref<string>('')

const updateChatPage = (id: string) => {
  chatPageId.value = id
}

const connectXMTPClient = async () => {
  client.value = await createClient(getOrCreateUserWallet(walletNum.value, 'fz'))
}
</script>
