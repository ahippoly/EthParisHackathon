<template>
  <section>
    <v-btn>{{ props.peerUser.name }}</v-btn>
  </section>
</template>
<script setup lang="ts">
import { PropType } from 'nuxt/dist/app/compat/capi'

const props = defineProps({
  peerUser: {
    type: Object as PropType<IUser>,
    default: null
  }
})
</script>
<style lang="scss" scoped></style>
