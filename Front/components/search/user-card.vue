<template>
  <NuxtLink :to="`/search/${user._id}`" class="link">
    <section :id="id" class="user-card">
      <p class="--name">{{ user.name }}</p>
      <div class="--interests" :style="`--interests-amount: ${firsts3Interests?.length || 1}`">
        <p v-for="(interest, index) in firsts3Interests" :key="`card_${id}_interests_${index}`" class="chip text-caption">{{ interest }}</p>
      </div>
    </section>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { User } from '@/assets/ts/classes/user'
const props = defineProps({ user: { type: User, default: null } })

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

    .name {
    }

    .--interests {
      display: flex;
      justify-content: right;
      width: auto;
      gap: 5px;
      .chip {
        background-color: $clr-secondary;
        font-style: italic;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 5px 8px;
        border-radius: 100px;
        color: $clr-background;
        width: fit-content;
        max-width: calc(100% / var(--interests-amount) - 20px);
      }
    }
  }
}
</style>
