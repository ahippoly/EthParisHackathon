<template>
  <section class="d-flex flex-column">
    <h3 class="title-h3 text-center ma-4">Active conversations</h3>

    <div v-if="isLoading" class="d-flex justify-center mt-8">
      <v-progress-circular indeterminate :size="115" :width="5"></v-progress-circular>
    </div>

    <v-card v-for="peerUser in peerUsers" :key="peerUser.id" class="ma-2 text-primary" variant="outlined" @click="goToChatPage(peerUser.id)">
      <v-card-item>
        <div>
          <div class="text-h6 mb-1">
            {{ peerUser.name }}
          </div>
          <div class="text-caption">{{ peerUser.profile?.country }}</div>
        </div>
      </v-card-item>
    </v-card>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ['is-logged-in-and-has-complete-profile'] })

import { Client, Conversation } from '@xmtp/xmtp-js'
import { fetchConversationList, stopListeningMessageForAllConversation } from '@/modules/xmtp/xmtpUtils'
import { User } from '~~/assets/ts/classes/user'

const conversations = ref<Conversation[]>([])
const peerUsers = ref<User[]>([])
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

const getUserByXTMPPublicAdresses = async (publicAdresses: string[]) => {
  const usersRes = await useAPI().users.getAllUsersByXmtpAddress(publicAdresses)
  if (!usersRes.data) return
  peerUsers.value = usersRes.data
}

const getConversations = async () => {
  if (!props.client) return
  isLoading.value = true
  conversations.value = await fetchConversationList(props.client)
  await getUserByXTMPPublicAdresses(conversations.value.map((conversation) => conversation.peerAddress))
  isLoading.value = false
}

const goToChatPage = (id: string) => {
  emits('goToChatPage', id)
}
</script>
