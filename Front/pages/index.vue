<template>
  <section class="h-screen d-flex flex-column justify-center align-center">
    <h1 class="ma-4 text-h2 text-primary font-weight-black">HARPOS</h1>
    <h2 class="text-subtitle-1 text-primary">Communication between holders</h2>

    <v-btn id="connect-btn" @click="sismoConnect">Connect</v-btn>
  </section>
</template>

<script lang="ts" setup>
function sismoConnect() {
  useAPI().sismo.connect()
}

useAPI().sismo.verify()
</script>

<style lang="scss" scoped>
#connect-btn {
  margin-top: 50px;
}
</style>
