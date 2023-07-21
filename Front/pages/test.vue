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
      <p v-for="(message, index) in messageList" :key="index" class="largest">
        {{ message }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  ClaimRequest,
  ClaimType,
  SismoConnect,
  SismoConnectConfig,
} from '@sismo-core/sismo-connect-client'

const messageWith = ref<string>('')
const messageToSend = ref<string>('')
const messageList = ref<Array<string>>([])

function sismoConnect() {
  const config: SismoConnectConfig = {
    // you will need to get an appId from the Factory
    appId: '0x0953a6430e3f1a3e15ebaa4c898f6071',
  }

  const sismoConnect = SismoConnect({
    config,
  })

  // auth request for a proof of Twitter account ownership
  // const twitterRequest: AuthRequest = {
  //   authType: AuthType.TWITTER
  // }

  // claim request for a proof of "Nouns DAO Nft holders" group membership
  // const nounsDaoRequest: ClaimRequest = {
  //   // id of the group nouns-dao-nft-holders
  //   // https://factory.sismo.io/groups-explorer?search=nouns-dao-nft-holders
  //   groupId: '0x311ece950f9ec55757eb95f3182ae5e2'
  // }

  // claim request for a proof of "Gitcoin Passport holders" group membership

  const maticHolders: ClaimRequest = {
    // id of the group gitcoin-passport-holders
    // https://factory.sismo.io/groups-explorer?search=gitcoin-passport-holders
    groupId: '0x99b98fbff55074d0bdbbc023379f49f1',
    // users should have at least 15 as value in the group to claim the airdrop
    value: 1,
    claimType: ClaimType.GTE,
  }

  // redirect users to the Vault App to generate proofs based on the requirements
  // expressed in the auth and claim requests
  sismoConnect.request({
    claims: [maticHolders],
    namespace: 'sismo-edition',
  })
}
</script>

<style lang="scss" scoped>
.flex-column {
  display: flex;
  flex-direction: column;
}

#home-page {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;

  #login-btn {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .main-title {
      margin-bottom: 20px;
      padding-bottom: 20px;
      position: relative;

      &::after {
        content: '';
        height: 1px;
        width: 100%;
        background-color: $clr-text;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }

    .sub-title {
      margin-bottom: 100px;
      text-transform: uppercase !important;
    }
  }
}

.test {
  font-family: 'Montserrat';
}
</style>
