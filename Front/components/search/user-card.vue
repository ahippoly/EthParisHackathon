<template>
  <v-expansion-panel :id="id" class="user-card text-white bg-secondary">
    <v-expansion-panel-title>
      <div class="accordion-title">
        <div class="identity">
          <v-avatar class="bg-white" icon="mdi-account"></v-avatar>
          <div class="user-info">
            <h3 class="--name text-h6">{{ user.name }}</h3>
            <small class="country subtitle text-caption">
              <v-icon icon="mdi-map-marker"></v-icon>
              {{ user.profile?.country }}
            </small>
          </div>
        </div>

        <v-chip-group class="--interests-pres" :style="`--interests-amount: ${firsts3Interests?.length || 1}`">
          <v-chip v-for="(interest, index) in firsts3Interests" :key="`card_${id}_interests_${index}`" class="chip text-caption">
            {{ interest }}
          </v-chip>
        </v-chip-group>
      </div>
    </v-expansion-panel-title>
    <v-expansion-panel-text class="bg-white">
      <div class="accordion-content">
        <div class="description --block">
          <!-- <h5 class="--block-title text-caption">Who am i:</h5> -->
          <v-card class="--content bg-secondary" subtitle="Who am i" :text="user.description"></v-card>
        </div>

        <div v-if="user.goals && user.goals.length" class="--block">
          <h5 class="--block-title text-caption">
            <small class="country subtitle text-caption"><v-icon icon="mdi-bullseye-arrow"></v-icon> I am aiming at</small>
          </h5>
          <v-list>
            <v-list-item v-for="(goal, index) in user.goals" :key="`${id}_goal-${index}`">
              <v-icon icon="mdi-check-circle"></v-icon> {{ goal }}
            </v-list-item>
          </v-list>
        </div>

        <div v-if="user.profile?.langs" class="langs --block">
          <v-chip-group class="--langs">
            <h5 class="--block-title text-caption">
              <small class="country subtitle text-caption"><v-icon icon="mdi-account-voice"></v-icon> I speak</small>
            </h5>
            <v-chip v-for="(lang, index) in user.profile.langs" :key="`card_${id}_langs_${index}`" class="chip text-caption">
              {{ lang }}
            </v-chip>
          </v-chip-group>
        </div>

        <div v-if="user.profile?.interests" class="interests --block">
          <h5 class="--block-title text-caption">
            <small class="country subtitle text-caption"><v-icon icon="mdi-account-heart"></v-icon> I like</small>
          </h5>
          <v-chip-group class="--interests">
            <v-chip v-for="(interest, index) in user.profile.interests" :key="`card_${id}_full-interests_${index}`" class="chip text-caption">
              {{ interest }}
            </v-chip>
          </v-chip-group>
        </div>

        <div v-if="user.profile?.skills" class="skills --block">
          <h5 class="--block-title text-caption">
            <small class="country subtitle text-caption"><v-icon icon="mdi-account-network"></v-icon> I do</small>
          </h5>
          <v-chip-group class="--skills">
            <v-chip v-for="(skill, index) in user.profile.skills" :key="`card_${id}_skills_${index}`" class="chip text-caption">
              {{ skill }}
            </v-chip>
          </v-chip-group>
        </div>

        <div class="actions --block">
          <NuxtLink :to="`/chats/${user.id}`" class="link">
            <v-btn append-icon="mdi-message" class="bg-secondary text-white" style="color: white !important">Send message</v-btn>
          </NuxtLink>
        </div>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script lang="ts" setup>
import { User } from '@/assets/ts/classes/user'
const props = defineProps({ user: { type: Object as PropType<User>, default: null } })

const id = Math.random().toString()

const firsts3Interests = props.user.profile?.interests.slice(0, 3)
</script>

<style lang="scss" scoped>
.subtitle {
  display: block;
}
.accordion-title {
  overflow: hidden;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  .identity {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;

    .user-info {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
  }
}

.accordion-content {
  padding: 20px 10px;
  .--block {
    display: flex;
    flex-direction: column !important;

    & + .--block {
      margin-top: 15px;
    }

    .--block-title {
      display: block;
      width: 100%;
    }

    &.description {
      margin-bottom: 50px;
    }
    &.actions {
      display: flex;
      align-items: flex-end;

      .link {
        display: block;
        width: fit-content;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .accordion-title {
    .--interests-pres {
      display: none;
    }
  }

  .accordion-content {
    padding: 10px 0;
  }
}
</style>
