<template>
  <section class="messages-list-section">
    <h3>Chating with {{ peerUser?.name }}</h3>
    <XmtpMessagesList class="messages-list" :peer-user="peerUser"></XmtpMessagesList>
    <v-textarea v-model="writedMessage" auto-grow rows="1"></v-textarea>
  </section>
</template>

<script lang="ts" setup>
import { relevantUsers } from '~~/assets/constants/mock/users.mock'

const writedMessage = ref<string>('')

const peerUser = ref<IUser>()

const peerUserId = useRoute().params.slug

async function getUserById(userId: string): Promise<IUser | undefined> {
  //mockedImpementation
  return relevantUsers.find((user) => user._id === userId)
}

onBeforeMount(async () => {
  peerUser.value = await getUserById(peerUserId as string)
})
</script>

<style lang="scss" scoped>
.messages-list-section {
  height: 100vh;
  display: flex;
  position: relative;
  flex-direction: column;
}

.messages-list {
  flex-grow: 1;
  background-color: $clr-info;
}
</style>
