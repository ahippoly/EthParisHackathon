<template>
  <section>
    <XmtpConversationCard
      v-for="peerUser in peerUsers"
      :key="peerUser._id"
      :peer-user="peerUser"
      @click="goToChatPage(peerUser.xmtpPublicAddress)"
    ></XmtpConversationCard>
  </section>
</template>
<script setup lang="ts">
import { Conversation } from '@xmtp/xmtp-js'
import { createClient, fetchConversationList } from '@/modules/xmtp/xmtpUtils'
import { relevantUsers } from '@/assets/constants/mock/users.mock'
import { storeToRefs } from 'pinia'
import { getOrCreateUserWallet } from '~~/modules/ethers/ethersUtilsForXMTP'

const chatStore = useChatSessionStore()
const { client } = storeToRefs(chatStore)
const router = useRouter()

const conversations = ref<Conversation[]>([])
const peerUsers = ref<IUser[]>([])

onBeforeMount(async () => {
  if (!client.value) client.value = await createClient(getOrCreateUserWallet('1'))

  getConversations()
})

const getUserByXTMPPublicAdresses = async (): Promise<IUser[]> => {
  //mocked implementation
  return relevantUsers
}

const goToChatPage = (publicAdress: string) => {
  router.push(`/chats/${publicAdress}`)
}

const getConversations = async () => {
  if (!client.value) return
  // conversations.value = await fetchConversationList(client.value)
  peerUsers.value = await getUserByXTMPPublicAdresses()
  console.log('peer User = ', peerUsers.value)
}
</script>
<style lang="scss" scoped></style>
