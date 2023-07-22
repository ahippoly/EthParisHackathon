<template>
  <section>
    <p>{{ props.peerUser.name }}</p>
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
