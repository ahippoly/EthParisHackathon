<template>
  <section class="--page">
    <h3>Your active conversations</h3>
    <section class="chat-list">
      <v-progress-circular v-if="isLoading" class="loader" indeterminate :size="115" :width="5"></v-progress-circular>
      <v-btn v-for="peerUser in peerUsers" :key="peerUser._id" @click="goToChatPage(peerUser._id)">{{ peerUser.name }}</v-btn>
    </section>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ['is-logged-in-and-has-complete-profile'] })

import { Client, Conversation } from '@xmtp/xmtp-js'
import { fetchConversationList, stopListeningMessageForAllConversation } from '@/modules/xmtp/xmtpUtils'
import { relevantUsers } from '@/assets/constants/mock/users.mock'

const conversations = ref<Conversation[]>([])
const peerUsers = ref<IUser[]>([])
const isLoading = ref<boolean>(false)

const props = defineProps({
  client: {
    type: Object as PropType<Client>,
    default: null
  }
})

const emits = defineEmits(['goToChatPage'])

onBeforeMount(() => {
  getConversations()
})

onBeforeUnmount(() => {
  stopListeningMessageForAllConversation()
})

const getUserByXTMPPublicAdresses = async (): Promise<IUser[]> => {
  //mocked implementation
  return relevantUsers
}

const getConversations = async () => {
  if (!props.client) return
  isLoading.value = true
  conversations.value = await fetchConversationList(props.client)
  peerUsers.value = await getUserByXTMPPublicAdresses()
  isLoading.value = false
  //   console.log('peer User = ', peerUsers.value)
}

const goToChatPage = (id: string) => {
  emits('goToChatPage', id)
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
