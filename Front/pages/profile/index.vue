<template>
  <section id="profile" class="--page">
    <h1 class="main-title text-h4">My Profile</h1>

    <section id="profile-form">
      <div class="presentation --block">
        <!-- NAME -->
        <v-text-field
          v-model="profileFormData.name"
          class="--input --group"
          label="Name"
          :variant="InputVariants.FILLED"
          :error="!!errors.name.message"
          :error-messages="errors.name.message"
          @update:model-value="errors.name.validator"
        ></v-text-field>

        <!-- DESCRIPTION -->
        <v-textarea
          v-model="profileFormData.description"
          class="--input --group"
          label="Description"
          :variant="InputVariants.FILLED"
          :error="!!errors.description.message"
          :error-messages="errors.description.message"
          @update:model-value="errors.description.validator"
        ></v-textarea>

        <!-- GOALS -->
        <div class="goals --group">
          <p class="--group-name">Goals:</p>
          <v-text-field
            v-for="(_, index) in profileFormData.goals"
            :key="`profile_goal_${index}`"
            v-model="profileFormData.goals[index]"
            class="--input"
            :label="`Goal - ${index + 1}`"
            :append-icon="profileFormData.goals.length > 1 ? 'mdi-delete' : ''"
            :error="!!errors.goals.message"
            :error-messages="errors.goals.message"
            @click:append="profileFormData.goals.splice(index, 1)"
            @update:model-value="errors.goals.validator"
          ></v-text-field>
          <v-btn class="add-goal-btn" variant="text" @click="profileFormData.goals.push('')">+ Add a goal</v-btn>
        </div>
      </div>

      <div class="profile --block">
        <!-- COUNTRY -->
        <v-autocomplete
          v-model="profileFormData.country"
          class="--intput --group"
          :items="Object.values(Countries)"
          base-color="#F2E9E4"
          color="#F2E9E4"
          label="Country"
          :error="!!errors.country.message"
          :error-messages="errors.country.message"
          @update:model-value="errors.country.validator"
        ></v-autocomplete>

        <!-- SPOKEN LANGUAGES -->
        <v-autocomplete
          v-model="profileFormData.langs"
          class="--intput --group"
          :items="Object.values(Langs)"
          base-color="#F2E9E4"
          color="#F2E9E4"
          label="Spoken Languages"
          multiple
          chips
          closable-chips
          clearable
          :error="!!errors.langs.message"
          :error-messages="errors.langs.message"
          @update:model-value="errors.langs.validator"
        ></v-autocomplete>

        <!-- INTERESTS -->
        <v-autocomplete
          v-model="profileFormData.interests"
          class="--intput --group"
          :items="Object.values(Interests)"
          base-color="#F2E9E4"
          color="#F2E9E4"
          label="Interests"
          multiple
          chips
          closable-chips
          clearable
          :error="!!errors.interests.message"
          :error-messages="errors.interests.message"
          @update:model-value="errors.interests.validator"
        ></v-autocomplete>

        <!-- SKILLS -->
        <v-autocomplete
          v-model="profileFormData.skills"
          class="--intput --group"
          :items="Object.values(Skills)"
          base-color="#F2E9E4"
          color="#F2E9E4"
          label="Skills"
          multiple
          chips
          closable-chips
          clearable
          :error="!!errors.skills.message"
          :error-messages="(errors.skills.message as String)"
          @update:model-value="errors.skills.validator"
        ></v-autocomplete>
      </div>
    </section>

    <!-- SUBMIT -->
    <v-btn class="--submit" variant="elevated" @click="saveProfile()">Save profile</v-btn>
  </section>
</template>

<script lang="ts" setup>
import { Countries, Interests, Langs, Skills } from '@/assets/ts/enums/meta-datas'
import { InputVariants } from '@/assets/ts/enums/style'
import { User, UserProfile } from '@/assets/ts/classes/user'

definePageMeta({ middleware: ['is-logged-in'] })

type TProfileFormData = IUserProfile & { name: string; description: string; goals: string[] }

const user = useSessionStore().getUser()

/* >==== INPUTS VALUE ====> */
const profileFormData = reactive<TProfileFormData>({
  name: user?.name || '',
  description: user?.description || '',
  goals: user?.goals || [],
  country: user?.profile?.country || ('' as Countries),
  langs: user?.profile?.langs || [],
  interests: user?.profile?.interests || [],
  skills: user?.profile?.skills || []
})

/* >==== INPUTS ERROR MANAGEMENT ====> */
const errors = reactive<Record<keyof TProfileFormData, { message: string; validator: () => void }>>({
  name: {
    message: '',
    validator: () => {
      errors.name.message = profileFormData.name.length ? '' : 'You must provide a name'
    }
  },
  description: {
    message: '',
    validator: () => {
      errors.description.message = profileFormData.description.length ? '' : 'You must provide a description of yourself'
    }
  },
  goals: {
    message: '',
    validator: () => {
      const goals = profileFormData.goals
      if (!goals.length || !goals.reduce((prev, current) => prev.concat(current), '').length)
        errors.goals.message = 'You must provide at least 1 goal'
      else errors.goals.message = ''
    }
  },
  country: {
    message: '',
    validator: () => {
      errors.country.message = profileFormData.country.length ? '' : "You must indicate the country you're living in"
    }
  },
  langs: {
    message: '',
    validator: () => {
      errors.langs.message = profileFormData.langs.length ? '' : 'You must provide at least 1 language'
    }
  },
  interests: {
    message: '',
    validator: () => {
      errors.interests.message = profileFormData.interests.length ? '' : 'You must provide at least 1 interest'
    }
  },
  skills: {
    message: '',
    validator: () => {
      errors.skills.message = profileFormData.skills.length ? '' : 'You must provide at least 1 skill'
    }
  }
})

/* >==== SAVE & UPDATE METHODS ====> */
function saveProfile() {
  // run validators
  const errorFields = Object.keys(errors) as Array<keyof TProfileFormData>
  errorFields.forEach((field) => errors[field].validator())

  // check if any error arose
  const isThereErrors = errorFields.map((field) => !!errors[field].message).find((error) => error)
  if (isThereErrors) return

  // if not, save
  if (user) updateUser(user)
}

function updateUser(user: User) {
  user.setName(profileFormData.name)
  user.setDescription(profileFormData.description)
  user.setGoals(profileFormData.goals)

  user.setProfile(UserProfile.fromIUserProfile(profileFormData))
}
</script>

<style lang="scss" scoped>
#profile {
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .main-title {
    margin-bottom: 80px;
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

  #profile-form {
    display: flex;
    justify-content: center;
    align-items: start;
    gap: 25px;
    width: clamp(200px, 800px, 90vw);

    .--block {
      width: 50%;

      .--group {
        width: 100%;

        .--group-name {
          margin-bottom: 15px;
          text-decoration: underline;
        }

        & + .--group {
          margin-top: 45px;
          position: relative;
        }
      }

      .--input {
        color: $clr-text !important;
      }

      .goals {
        .add-goal-btn {
          text-transform: capitalize;
          color: $clr-text !important;
        }
      }
    }
  }

  .--submit {
    margin-top: 50px;
  }
}

@media screen and (max-width: 750px) {
  #profile {
    #profile-form {
      flex-direction: column;
      align-items: center;

      .--block {
        width: 100%;
      }
    }
  }
}
</style>
