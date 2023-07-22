<template>
  <section class="messages-list-page">
    <h1 class="title">Chating with {{ peerUser?.name }}</h1>
    <p>address = {{ peerUser?.xmtpPublicAddress }}</p>
    <section class="message-list">
      <v-progress-circular v-if="isLoading" class="loader" indeterminate :size="115" :width="5"></v-progress-circular>
      <p v-for="message in messages" :key="message.id" class="message">{{ message?.content }}</p>
      <p v-if="messages.length === 0" class="no-message-yet">You have no message for the moment</p>
    </section>
    <div class="send-message">
      <v-textarea v-model="writedMessage" auto-grow rows="1" label="Send message" append-icon="mdi-send"></v-textarea>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { relevantUsers } from '@/assets/constants/mock/users.mock'
import { Client, Conversation, DecodedMessage } from '@xmtp/xmtp-js'
import {
  getConversation,
  listenAndProcessNewMessageInConversation,
  sendMessage,
  stopListeningMessageForAllConversation
} from '@/modules/xmtp/xmtpUtils'

const writedMessage = ref<string>('')
const peerUser = ref<IUser>()
const messages = ref<DecodedMessage[]>([])
const isLoading = ref<boolean>(false)
let conversation: Conversation | undefined

const props = defineProps({
  userId: {
    type: String,
    default: ''
  },
  client: {
    type: Object as PropType<Client>,
    default: null
  }
})

onMounted(() => {
  const sendButton = document.querySelector('.v-input__append')

  sendButton?.addEventListener('click', async () => {
    console.log('button clicked')
    if (!conversation) return
    await sendMessage(conversation, writedMessage.value)
    writedMessage.value = ''
  })
})

watch(
  () => props.userId,
  async () => {
    await getUserById(props.userId)
    getMessages()
  },
  { immediate: true }
)

async function getUserById(userId: string) {
  //mockedImpementation
  console.log('userId= ', userId)
  peerUser.value = relevantUsers.find((user) => user._id === userId)
}

onBeforeUnmount(() => {
  stopListeningMessageForAllConversation()
})

const getMessages = async () => {
  if (!props.client || !peerUser.value) return

  isLoading.value = true
  conversation = await getConversation(props.client, peerUser.value.xmtpPublicAddress)
  isLoading.value = false

  if (!conversation) return
  listenAndProcessNewMessageInConversation(conversation, messages)
}
</script>

<style lang="scss" scoped>
.title {
  padding: 20px;
  margin: 0 auto;
}
.messages-list-page {
  height: 100vh;
  display: flex;
  position: relative;
  flex-direction: column;
  color: $clr-text;
}

.send-message {
  display: flex;
  gap: 10px;
  align-items: center;
}

.no-message-yet {
  align-self: center;
  justify-self: center;
  margin: auto;
}

.message-list {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
