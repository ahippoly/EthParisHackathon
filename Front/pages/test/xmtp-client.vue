<template>
  <section id="search" class="--page">
    <h5>Wallet to connect with XMTP</h5>
    <input v-model="walletNum" />
    <v-btn @click="connectXmtpClient"> Connect </v-btn>
    <p>logged client = {{ client?.address }}</p>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { getOrCreateUserWallet } from '~~/modules/ethers/ethersUtilsForXMTP'
import { createClient } from '~~/modules/xmtp/xmtpUtils'

const walletNum = ref<string>('')

const chatStore = useChatSessionStore()
const { client } = storeToRefs(chatStore)

async function connectXmtpClient() {
  console.log('client = ', client.value)

  client.value = await createClient(getOrCreateUserWallet(walletNum.value, 'fz'))
  // chatStore.client = client.value
  chatStore.updateClient(client.value)

  console.log('getted client = ', await chatStore.getClient())
}
</script>

<style lang="scss" scoped></style>
