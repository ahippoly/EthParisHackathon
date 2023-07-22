<template>
  <section id="page-layout" class="bg-black">
    <NuxtPage />
  </section>
</template>

<script lang="ts" setup>
import '@/modules/polyfills/polyfills'
import { useTheme } from 'vuetify'

useTheme()
</script>
