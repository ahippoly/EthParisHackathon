<template>
  <section>
    <XmtpMessage v-for="message in messages" :key="message.id" :message="message"></XmtpMessage>
  </section>
</template>
<script setup lang="ts">
import { Conversation, DecodedMessage } from '@xmtp/xmtp-js'
import { createClient, fetchConversationList, getConversation, listenAndProcessNewMessageInConversation } from '@/modules/xmtp/xmtpUtils'
import { relevantUsers } from '@/assets/constants/mock/users.mock'
import { storeToRefs } from 'pinia'
import { getOrCreateUserWallet } from '@/modules/ethers/ethersUtilsForXMTP'

const chatStore = useChatSessionStore()
const { client } = storeToRefs(chatStore)
const messages = ref<DecodedMessage[]>([])

const props = defineProps({
  peerUser: {
    type: Object as PropType<IUser>,
    default: null
  }
})

onBeforeMount(async () => {
  if (!client.value) client.value = await createClient(getOrCreateUserWallet('1'))

  getMessages()
})

const getMessages = async () => {
  if (!client.value) return

  const conversation = await getConversation(client.value, props.peerUser.xmtpPublicAddress)
  if (!conversation) return
  listenAndProcessNewMessageInConversation(conversation, messages)
}
</script>
<style lang="scss" scoped></style>
