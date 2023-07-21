<template>
  <v-app>
    <section id="page-layout">
      <NuxtPage />
    </section>
  </v-app>
</template>

<script lang="ts" setup>
import '@/modules/polyfills/polyfills'
import { useTheme } from 'vuetify'

useTheme()
</script>

<style lang="scss">
#page-layout {
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>
