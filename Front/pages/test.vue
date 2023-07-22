<template>
  <section id="home-page">
    <p>Salut a tous</p>
    <v-btn class="test" @click="ConnectToWallet">
      Button
    </v-btn>
    <v-btn @click="sismoConnect"> SismoConnect </v-btn>

    <div class="flex-column">
      <h4>Converse with</h4>
      <input v-model="messageWith" type="text" />
      <v-btn @click="startConversation">Start conversation</v-btn>
      <v-btn @click="fetchConversationList">FetchConversation</v-btn>

      <h4>messageToSend</h4>
      <input v-model="messageToSend" type="text" />
      <v-btn @click="sendMessage(messageToSend)">Send message</v-btn>
    </div>

    <div>
      <h3>Message list</h3>
      <p v-for="(message, index) in messageList" :key="index" class="largest">{{ message }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Client, Conversation } from '@xmtp/xmtp-js'
import { ethers } from 'ethers'
import { sismoConnect } from '@/modules/sismo/sismoConnect'

const messageWith = ref<string>('')
const messageToSend = ref<string>('')
const messageList = ref<Array<string>>([])
const xmtpClient: Client | undefined = undefined
let currentConversation: Conversation

// const ConnectToWallet = async () => {
//   // const connectResult = await connect({
//   //   connector: new InjectedConnector()
//   // })

//   try {
//     // const signer = await getEthersSigner({ chainId: 1 })
//     const signer = ethers.Wallet.createRandom()
//     console.log('🚀 ~ file: index.vue:25 ~ ConnectToWal ~ signer:', signer)
//     xmtpClient = await Client.create(signer!, { env: 'dev' })
//     console.log('🚀 ~ file: test.vue:50 ~ ConnectToWal ~ xmtpClient:', xmtpClient)

//     const keys = await Client.getKeys(signer!)
//     console.log('🚀 ~ file: test.vue:52 ~ ConnectToWal ~ keys:', keys)

//     // xmtpClient = await Client.create(null, { env: 'dev', privateKeyOverride: keys })
//     console.log('🚀 ~ file: test.vue:55 ~ ConnectToWal ~ newClient:', xmtpClient)
//     console.log('🚀 ~ file: index.vue:28 ~ ConnectToWal ~ xmtp:', xmtpClient)
//   } catch (err) {
//     console.log('errr = ', err)
//   }

//   // console.log('xtmp = ', xmtp)
// }

// const fetchConversationList = () => {}

// const startConversation = async () => {
//   console.log('🚀 ~ file: index.vue:55 ~ startConversation ~ xmtpClient:', xmtpClient)
//   if (!xmtpClient) return
//   const isOnProdNetwork = await xmtpClient.canMessage('0x3F11b27F323b62B159D2642964fa27C46C841897')

//   if (!isOnProdNetwork) {
//     console.log('not on network')
//     return
//   }

//   currentConversation = await xmtpClient.conversations.newConversation(messageWith.value)

//   listenAndProcessNewMessageInConversation(currentConversation)
//   console.log('🚀 ~ file: index.vue:62 ~ startConversation ~ currentConversation:', currentConversation)
// }

// const sendMessage = async (message: string, conversation?: Conversation) => {
//   if (!conversation) conversation = currentConversation

//   await conversation.send(message)
// }

// const listenAndProcessNewMessageInConversation = async (conversation: Conversation) => {
//   if (!xmtpClient) return
//   for await (const message of await conversation.streamMessages()) {
//     // if (message.senderAddress === xmtpClient.address) {
//     //   // This message was sent from me
//     //   continue
//     // }

//     console.log(`New message from ${message.senderAddress}: ${message.content}`)
//   }
// }

// Create the client with a `Signer` from your application

// const ensName = await fetchEnsName({ address })
</script>

<style lang="scss" scoped>
.flex-column {
  display: flex;
  flex-direction: column;
}

.test {
  font-family: 'Montserrat';
}
</style>
