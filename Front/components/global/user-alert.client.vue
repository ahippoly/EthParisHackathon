<template>
  <section id="user-alert" :class="{ open: !!alert, error: staticAlert && staticAlert.status === 'error' }">
    <div class="user-alert-close">
      <button @click="alertStore.resetAlert">
        <v-icon icon="mdi-information" class="--icon"></v-icon>
      </button>
    </div>
    <div class="user-alert-message">
      <p v-if="staticAlert">{{ staticAlert.message }}</p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const alertStore = useAlertStore()
const { alert } = storeToRefs(alertStore)

// we need to get a static copy of the alert,
// because otherwise the content of the popup would disappear when the alert is reset,
// just before the popup is retracted
const staticAlert = ref<IAlert | null>(null)

watch(
  alert,
  (newAlert) => {
    if (newAlert && alertStore.alert) {
      const message: string | string[] = alertStore.alert.message
      staticAlert.value = {
        status: alertStore.alert.status,
        message: (Array.isArray(message) ? message[0] : message) as string,
        persistant: alertStore.alert.persistant,
        durationInMs: alertStore.alert.durationInMs
      }
    }
    if (!newAlert || newAlert.persistant) return

    setTimeout(() => {
      alertStore.resetAlert()
    }, newAlert.durationInMs)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
$alertDefaultWidth: 300px;
$alertPadding: 15px;

#user-alert {
  background-color: $clr-primary;
  border-radius: 10px;
  padding: $alertPadding;
  position: fixed;
  top: clamp(5vh, 75px, 5vh);
  left: 100%;
  transition: 0.3s left ease-out;
  width: $alertDefaultWidth;
  z-index: 10000;

  display: flex;

  &.error {
    background-color: $clr-error !important;

    .user-alert-close {
      button {
        .--icon {
          background-color: $clr-error !important;
        }
      }
    }
  }

  &.open {
    left: calc(100% - $alertDefaultWidth - $alertPadding * 2 - 15px);
    .--icon {
      background-color: $clr-primary;
    }
  }

  .user-alert-close {
    display: flex;
    align-items: flex-start;
    padding-right: $alertPadding;

    button {
      background-color: transparent;
      color: white;
      border: none;
      width: 30px;
      height: 30px;
      position: relative;

      .--icon {
        background-color: $clr-primary;
        color: white !important;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
      }
    }
  }

  .user-alert-message {
    padding-left: $alertPadding;
    display: flex;
    align-items: center;
    border-left: solid 1px white;

    p {
      color: white;
      font-weight: bold;
      width: 100%;
    }
  }
}
</style>
