<template>
  <section id="page-layout">
    <NuxtPage />
  </section>
</template>

<script lang="ts" setup>
import '@/modules/polyfills/polyfills'
import { useTheme } from 'vuetify'

useTheme()
</script>

<style lang="scss" scoped>
#page-layout {
  background-color: $clr-background-alt;
}
</style>
