<template>
  <section id="page-layout">
    <NuxtPage />
  </section>
</template>

<script setup>
import '@/modules/polyfills/polyfills'
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
