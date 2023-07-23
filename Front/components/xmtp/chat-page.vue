<template>
  <section class="d-flex flex-column">
    <v-icon icon="mdi-arrow-left" @click="emits('goBack')"></v-icon>
    <h3 class="title-h3 text-center mt-4">Chating with {{ peerUser?.name }}</h3>
    <p class="text-caption text-center ma-2">{{ peerUser?.xmtpPublicAddress }}</p>
    <section>
      <div v-if="isLoading" class="d-flex justify-center mt-8">
        <v-progress-circular indeterminate :size="115" :width="5"></v-progress-circular>
      </div>
      <p v-if="messages.length === 0" class="no-message-yet">Say hello 👋 !</p>

      <v-card
        v-for="message in messages"
        :key="message.id"
        class="ma-2 "
        :subtitle="message.senderAddress === client.address ? 'Me' : peerUser?.name"
        :text="message?.content"
        variant="tonal"
      />
    </section>
    <div class="send-message">
      <v-textarea v-model="writedMessage" auto-grow rows="1" label="Send message" append-icon="mdi-send"></v-textarea>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Client, Conversation, DecodedMessage } from '@xmtp/xmtp-js'
import {
  getConversation,
  listenAndProcessNewMessageInConversation,
  sendMessage,
  stopListeningMessageForAllConversation
} from '@/modules/xmtp/xmtpUtils'
import { User } from '~~/assets/ts/classes/user'

const writedMessage = ref<string>('')
const peerUser = ref<User>()
const messages = ref<DecodedMessage[]>([])
const isLoading = ref<boolean>(false)
let conversation: Conversation | undefined

const emits = defineEmits(['goBack'])

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
    if (!conversation) return
    await sendMessage(conversation, writedMessage.value)
    writedMessage.value = ''
  })
})

watch(
  () => props.userId,
  async () => {
    await getUserById(props.userId)
  },
  { immediate: true }
)

async function getUserById(userId: string) {
  isLoading.value = true
  const peerRes = await useAPI().users.getUserById(userId)
  isLoading.value = false
  if (!peerRes.data) return

  peerUser.value = peerRes.data
  getMessages()
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
