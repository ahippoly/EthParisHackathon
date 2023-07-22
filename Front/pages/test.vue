<template>
  <section class="pa-8">
    <v-btn @click="sismoConnect"> SismoConnect </v-btn>
  </section>
</template>

<script setup lang="ts">
function sismoConnect() {
  useAPI().sismo.connect()
}

useAPI().sismo.verify()
</script>
