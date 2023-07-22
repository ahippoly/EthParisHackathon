<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const { idMask } = storeToRefs(useSessionStore())

watch(
  idMask,
  () => {
    if (idMask.value) useAPI().users.logIn(idMask.value)
    else useAPI().users.logOut()
  },
  { immediate: true }
)
</script>
