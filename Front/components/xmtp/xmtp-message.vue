<template>
  <p>{{ props.message?.content }}</p>
</template>
<script setup lang="ts">
import { DecodedMessage } from '@xmtp/xmtp-js'

const props = defineProps({
  message: Object as PropType<DecodedMessage>,
  default: null
})
</script>
<style lang="scss" scoped></style>
