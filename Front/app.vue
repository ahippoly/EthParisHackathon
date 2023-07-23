<template>
  <section class="bg-black">
    <session-manager />
    <user-alert />

    <NuxtPage />

    <v-layout v-if="value !== '/'" class="overflow-visible" style="height: 56px;">
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

const buttons = ref([
  { path: '/search', icon: 'mdi-magnify', caption: 'Search' },
  { path: '/folks', icon: 'mdi-account-group-outline', caption: 'Folks' },
  { path: '/chats', icon: 'mdi-chat-outline', caption: 'Chats' },
  { path: '/profile', icon: 'mdi-account-outline', caption: 'profile' }
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
