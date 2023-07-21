<template>
  <section id="home-page">
    <p>Salut a tous</p>
    <v-btn @click="ConnectToWallet">
      Button
    </v-btn>

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
import { connect } from '@wagmi/core'
import { InjectedConnector } from '@wagmi/core/connectors/injected'
import { Client, Conversation } from '@xmtp/xmtp-js'
import { getEthersSigner } from '@/modules/ethers/walletClientToSigner'

// import { AuthRequest, AuthType, ClaimRequest, ClaimType, SismoConnect, SismoConnectConfig } from '@sismo-core/sismo-connect-client'

const messageWith = ref<string>('')
const messageToSend = ref<string>('')
const messageList = ref<Array<string>>([])
let xmtpClient: Client | undefined = undefined
let currentConversation: Conversation

const ConnectToWallet = async () => {
  const connectResult = await connect({
    connector: new InjectedConnector()
  })

  try {
    const signer = await getEthersSigner({ chainId: 1 })
    console.log('🚀 ~ file: index.vue:25 ~ ConnectToWal ~ signer:', signer)
    xmtpClient = await Client.create(signer!, { env: 'dev' })
    console.log('🚀 ~ file: index.vue:28 ~ ConnectToWal ~ xmtp:', xmtpClient)
  } catch (err) {
    console.log('errr = ', err)
  }

  // console.log('xtmp = ', xmtp)
}

const fetchConversationList = () => {}

const startConversation = async () => {
  console.log('🚀 ~ file: index.vue:55 ~ startConversation ~ xmtpClient:', xmtpClient)
  if (!xmtpClient) return
  const isOnProdNetwork = await xmtpClient.canMessage('0x3F11b27F323b62B159D2642964fa27C46C841897')

  if (!isOnProdNetwork) {
    console.log('not on network')
    return
  }

  currentConversation = await xmtpClient.conversations.newConversation(messageWith.value)

  listenAndProcessNewMessageInConversation(currentConversation)
  console.log('🚀 ~ file: index.vue:62 ~ startConversation ~ currentConversation:', currentConversation)
}

const sendMessage = async (message: string, conversation?: Conversation) => {
  if (!conversation) conversation = currentConversation

  await conversation.send(message)
}

const listenAndProcessNewMessageInConversation = async (conversation: Conversation) => {
  if (!xmtpClient) return
  for await (const message of await conversation.streamMessages()) {
    // if (message.senderAddress === xmtpClient.address) {
    //   // This message was sent from me
    //   continue
    // }

    console.log(`New message from ${message.senderAddress}: ${message.content}`)
  }
}

// Create the client with a `Signer` from your application

// const ensName = await fetchEnsName({ address })

// const config: SismoConnectConfig = {
//   // you will need to get an appId from the Factory
//   appId: '0xf4977993e52606cfd67b7a1cde717069'
// }

// const sismoConnect = SismoConnect({
//   config
// })

// // auth request for a proof of Twitter account ownership
// const twitterRequest: AuthRequest = {
//   authType: AuthType.TWITTER
// }

// // claim request for a proof of "Nouns DAO Nft holders" group membership
// const nounsDaoRequest: ClaimRequest = {
//   // id of the group nouns-dao-nft-holders
//   // https://factory.sismo.io/groups-explorer?search=nouns-dao-nft-holders
//   groupId: '0x311ece950f9ec55757eb95f3182ae5e2'
// }

// // claim request for a proof of "Gitcoin Passport holders" group membership
// const gitcoinPassportRequest: ClaimRequest = {
//   // id of the group gitcoin-passport-holders
//   // https://factory.sismo.io/groups-explorer?search=gitcoin-passport-holders
//   groupId: '0x1cde61966decb8600dfd0749bd371f12',
//   // users should have at least 15 as value in the group to claim the airdrop
//   value: 15,
//   claimType: ClaimType.GTE
// }

// // redirect users to the Vault App to generate proofs based on the requirements
// // expressed in the auth and claim requests
// sismoConnect.request({
//   auth: twitterRequest,
//   claims: [nounsDaoRequest, gitcoinPassportRequest],
//   namespace: 'sismo-edition',
//   callbackUrl: 'https://my-nft-drop.xyz/sismo-edition/claim-nft'
// })
</script>

<style lang="scss" scoped>
.flex-column {
  display: flex;
  flex-direction: column;
}
</style>
