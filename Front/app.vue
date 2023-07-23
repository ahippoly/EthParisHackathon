<template>
  <section class="bg-background">
    <session-manager />
    <user-alert />

    <NuxtPage />

    <v-layout v-if="isRootPage" class="overflow-visible" style="height: 56px;">
      <v-bottom-navigation v-model="value" color="primary" horizontal>
        <v-btn v-for="{ path, icon, caption } in buttons" :key="path" :value="path" @click="go(path)">
          <v-icon>{{ icon }}</v-icon>
          {{ caption }}
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </section>
</template>

<script lang="ts" setup>
import '@/modules/polyfills/polyfills'
import { useTheme } from 'vuetify'

const value = ref(useRoute().path)

const isRootPage = ref(useRoute().path !== '/')

watch(
  () => useRoute().path,
  () => {
    isRootPage.value = useRoute().path !== '/'
    value.value = useRoute().path
  }
)

const buttons = ref([
  { path: '/profile/criterias', icon: 'mdi-magnify', caption: 'Search' },
  { path: '/search', icon: 'mdi-account-group-outline', caption: 'Holders' },
  { path: '/chats', icon: 'mdi-chat-outline', caption: 'Chats' },
  { path: '/profile', icon: 'mdi-account-outline', caption: 'Profile' }
])

async function go(path: string) {
  await useRouter().push(path)
}

useTheme()
</script>

<style lang="scss" scoped>
#page-layout {
  background-color: $clr-background-alt;
}
</style>
