<template>
  <NuxtLink :to="to">
    <v-btn class="text-button"><slot /></v-btn>
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps({ to: { type: String, default: '/' } })
</script>
