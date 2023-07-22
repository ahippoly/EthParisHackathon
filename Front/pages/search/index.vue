<template>
  <section id="search" class="--page">
    <section id="user-cards">
      <user-card v-for="(user, index) in relevantUsers" :key="`user-card-${index}`" class="--card" :user="user" />
    </section>
  </section>
</template>

<script lang="ts" setup>
import { User } from '@/assets/ts/classes/user'

definePageMeta({ middleware: ['is-logged-in-and-has-complete-profile'] })

const relevantUsers = ref<User[]>([])

async function fetchRelevantUsers() {
  const { data, error } = await useAPI().users.getRelevantProfiles('some-id-mask')
  if (!error && data) relevantUsers.value = data
}

fetchRelevantUsers()
</script>

<style lang="scss" scoped>
#search {
  padding: 50px 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  #user-cards {
    width: clamp(200px, 70%, 95vw);

    .--card {
      & + .--card {
        margin-top: 10px;
      }
    }
  }
}
</style>
