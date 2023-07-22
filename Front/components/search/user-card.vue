<template>
  <NuxtLink :to="`/search/${user.id}`" class="link text-primary">
    <section :id="id" class="user-card">
      <p class="--name">{{ user.name }}</p>
      <v-chip-group class="--interests " :style="`--interests-amount: ${firsts3Interests?.length || 1}`">
        <v-chip v-for="(interest, index) in firsts3Interests" :key="`card_${id}_interests_${index}`" class="chip text-caption">{{ interest }}</v-chip>
      </v-chip-group>
    </section>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { User } from '@/assets/ts/classes/user'
const props = defineProps({ user: { type: Object as PropType<User>, default: null } })

const id = Math.random().toString()

const firsts3Interests = props.user.profile?.interests.slice(0, 3)
</script>

<style lang="scss" scoped>
.link {
  display: block;
  .user-card {
    overflow: hidden;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: solid 1px $clr-text;

    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
}
</style>
