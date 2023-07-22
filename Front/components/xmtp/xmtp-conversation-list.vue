<template>
  <section class="chat-list">
    <v-progress-circular v-if="peerUsers.length === 0" class="loader" indeterminate :size="115" :width="5"></v-progress-circular>
    <XmtpConversationCard
      v-for="peerUser in peerUsers"
      :key="peerUser._id"
      :peer-user="peerUser"
      @click="goToChatPage(peerUser._id)"
    ></XmtpConversationCard>
  </section>
</template>
<script setup lang="ts">
import { Conversation } from '@xmtp/xmtp-js'
import { createClient, fetchConversationList, stopListeningMessageForAllConversation } from '@/modules/xmtp/xmtpUtils'
import { relevantUsers } from '@/assets/constants/mock/users.mock'
import { storeToRefs } from 'pinia'
import { getOrCreateUserWallet } from '@/modules/ethers/ethersUtilsForXMTP'

const chatStore = useChatSessionStore()
const { client } = storeToRefs(chatStore)
const router = useRouter()

const conversations = ref<Conversation[]>([])
const peerUsers = ref<IUser[]>([])
const isLoading = ref<boolean>(false)

definePageMeta({ middleware: ['is-logged-in-and-has-complete-profile'] })

onBeforeMount(async () => {
  if (!client.value) client.value = await createClient(getOrCreateUserWallet('1'))

  getConversations()
})

onBeforeUnmount(() => {
  stopListeningMessageForAllConversation()
})

const getUserByXTMPPublicAdresses = async (): Promise<IUser[]> => {
  //mocked implementation
  return relevantUsers
}

const goToChatPage = (id: string) => {
  router.push(`/chats/${id}`)
}

const getConversations = async () => {
  if (!client.value) return
  isLoading.value = true
  conversations.value = await fetchConversationList(client.value)
  peerUsers.value = await getUserByXTMPPublicAdresses()
  isLoading.value = false
  console.log('peer User = ', peerUsers.value)
}
</script>
<style lang="scss" scoped>
.chat-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: stretch;
}

.loader {
  align-self: center;
}
</style>
