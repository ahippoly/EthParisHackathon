<template>
  <section id="home-page" class="--page">
    <v-btn v-if="!isLoggedIn" id="login-btn" variant="elevated" @click="logIn">Log In</v-btn>
    <v-btn v-else id="login-btn" @click="logOut">Log Out</v-btn>

    <section class="content">
      <h1 class="main-title text-h1">HARPOS</h1>
      <h2 class="sub-title text-subtitle-1">Communication between holders</h2>
      <link-btn id="find-btn" to="/profile">Find and connect with like-minded partners</link-btn>
    </section>
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

<style lang="scss" scoped>
#home-page {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;

  #login-btn {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .main-title {
      margin-bottom: 20px;
      padding-bottom: 20px;
      position: relative;

      &::after {
        content: '';
        height: 1px;
        width: 100%;
        background-color: $clr-text;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }

    .sub-title {
      margin-bottom: 100px;
      text-transform: uppercase !important;
    }
  }
}
</style>
