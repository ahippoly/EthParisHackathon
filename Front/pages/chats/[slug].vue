<template>
  <section class="--page">
    <h3>Chat with {{ peerUser?.name }}</h3>
    <XmtpMessagesList :peer-user="pe"></XmtpMessagesList>
  </section>
</template>

<script lang="ts" setup>
import { relevantUsers } from '~~/assets/constants/mock/users.mock'

const peerUser = ref<IUser>()

const peerUserId = useRoute().params.slug

async function getUserById(userId: string): Promise<IUser | undefined> {
  //mockedImpementation
  return relevantUsers.find((user) => user._id === userId)
}

onBeforeMount(async () => {
  getUserById(peerUserId)
})
</script>

<style lang="scss" scoped></style>
