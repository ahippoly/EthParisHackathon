<template>
  <section id="search" class="--page">
    <h1 class="main-title text-h4">Relevant Holders</h1>
    <v-expansion-panels id="user-cards" variant="popout">
      <user-card v-for="(user, index) in relevantUsers" :key="`user-card-${index}`" class="--card" :user="user" />
    </v-expansion-panels>
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
  flex-direction: column;
  justify-content: left;
  align-items: center;

  .main-title {
    margin-bottom: 50px;
    width: calc(100% - 32px);
    position: relative;
    text-transform: capitalize !important;
    color: white !important;
  }

  #user-cards {
    width: clamp(300px, 80%, 95vw);

    .--card {
      & + .--card {
        margin-top: 10px;
      }
    }
  }
}

@media screen and (max-width: 850px) {
  #search {
    padding: 20px;

    .main-title {
      font-size: 25px !important;
    }

    #user-cards {
      width: 100%;
    }
  }
}

@media screen and (max-width: 650px) {
  #search {
    padding: 20px 10px;
  }
}
</style>
