<template>
  <section class="h-screen d-flex flex-column justify-center align-center">
    <h1 class="text-h1 text-primary">HARPOS</h1>
    <h2 class="text-subtitle-1 text-secondary">Communication between holders</h2>
    <link-btn id="find-btn" to="/profile">Connect with like-minded partners</link-btn>
    <v-btn v-if="!isLoggedIn" id="login-btn" variant="elevated" @click="logIn">Log In</v-btn>
    <v-btn v-else id="login-btn" @click="logOut">Log Out</v-btn>
  </section>
</template>

<script lang="ts" setup>
const isLoggedIn = computed(() => useSessionStore().isLoggedIn)

function logIn() {
  useAPI().users.logIn('some-id-mask')
}
function logOut() {
  useAPI().users.logOut()
}
</script>
