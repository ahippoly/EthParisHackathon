<template>
  <section class="h-screen d-flex flex-column justify-center align-center">
    <h1 class="ma-4 text-h2 text-primary font-weight-black">HARPOS</h1>
    <h2 class="text-subtitle-1 text-secondary">Communication between holders</h2>
    <!-- <link-btn id="find-btn" to="/profile">Find with like-minded partners</link-btn> -->
    <!-- <v-btn v-if="!isLoggedIn" id="login-btn" variant="elevated" @click="logIn">Log In</v-btn> -->
    <!-- <v-btn v-else id="login-btn" @click="logOut">Connect</v-btn> -->

    <v-btn @click="sismoConnect">Connect</v-btn>
  </section>
</template>

<script lang="ts" setup>
// const isLoggedIn = computed(() => useSessionStore().isLoggedIn)

// function logIn() {
//   useAPI().users.logIn('some-id-mask')
// }
// function logOut() {
//   useAPI().users.logOut()
// }

function sismoConnect() {
  useAPI().sismo.connect()
}

useAPI().sismo.verify()
</script>
