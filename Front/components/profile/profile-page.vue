<template>
  <section id="profile" class="--page">
    <h1 class="main-title text-h4 text-white">{{ isUpdatePage ? 'My Profile' : 'Create Account' }}</h1>

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

    <v-checkbox
      v-model="profileFormData.openOnlyToThoseMatchingSearch"
      label="I want to only be visible by users that matches my criterias"
    ></v-checkbox>

    <!-- SUBMIT -->
    <v-btn v-if="isUpdatePage" class="--submit" variant="elevated" @click="saveProfile()">Save profile</v-btn>
    <v-btn v-if="isUpdatePage" class="mt-4" variant="outlined" @click="logout()"> Logout </v-btn>
    <v-btn v-else class="--submit" variant="elevated" @click="preValidResgister()">Register</v-btn>
    <v-dialog v-model="passPhraseDialogOpened">
      <v-card>
        <v-card-text class="pass-phrase-section">
          <h2>Pass phrase</h2>
          <p class="">
            To use the chat of the application, you need to provide a pass phrase, this will encrypt your key access to the chat
          </p>
          <p>
            <v-icon start icon="mdi-alert"></v-icon>You need to send your pass phrase every time you sign in to access chat
            <v-icon end icon="mdi-alert"></v-icon>
          </p>
          <v-text-field
            v-model="passPhrase"
            class="--input --group"
            label="Pass phrase"
            placeholder="min 8 characters"
            :error="!!passPhraseErrorMessage"
            :error-messages="passPhraseErrorMessage"
            :variant="InputVariants.FILLED"
            @update:model-value="passPhraseHasError"
          ></v-text-field>

          <v-btn v-if="isUpdatePage" class="--submit" variant="elevated" @click="saveProfile()">Update profile</v-btn>
          <v-btn v-else class="--submit" variant="elevated" @click="register()">Register</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>

<script lang="ts" setup>
import { Countries, Interests, Langs, Skills } from '@/assets/ts/enums/meta-datas'
import { InputVariants } from '@/assets/ts/enums/style'
import { createUserWallet } from '@/modules/ethers/ethersUtilsForXMTP'
import { encryptKey } from '~~/modules/ethers/keyEncrypter'

definePageMeta({ middleware: ['is-logged-in'] })

type TProfileFormData = Omit<IUser, '_id' | 'profile' | 'search' | 'xmtpPublicAddress' | 'xmtpCryptedPrivateKey' | 'balance' | 'followers'> &
  IUserProfile

const props = defineProps({
  isUpdatePage: {
    type: Boolean,
    default: true
  }
})

async function logout() {
  await useSessionStore().logOut()
  await useRouter().push('/')
}

const user = useSessionStore().getUser()
const passPhraseDialogOpened = ref<boolean>(false)
const passPhrase = ref<string>('')
const passPhraseErrorMessage = ref('')

/* >==== INPUTS VALUE ====> */
const profileFormData = reactive<TProfileFormData>({
  name: (props.isUpdatePage && user?.name) || '',
  description: (props.isUpdatePage && user?.description) || '',
  goals: (props.isUpdatePage && user?.goals) || [],
  country: (props.isUpdatePage && user?.profile?.country) || ('' as Countries),
  langs: (props.isUpdatePage && user?.profile?.langs) || [],
  interests: (props.isUpdatePage && user?.profile?.interests) || [],
  skills: (props.isUpdatePage && user?.profile?.skills) || [],
  openOnlyToThoseMatchingSearch: (props.isUpdatePage && user?.openOnlyToThoseMatchingSearch) || false
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
      errors.description.message = profileFormData.description.length > 50 ? '' : 'Your description must have at least 50 characters'
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
      errors.country.message = profileFormData.country && profileFormData.country.length ? '' : "You must indicate the country you're living in"
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
  },
  openOnlyToThoseMatchingSearch: {
    message: '',
    validator: () => true
  }
})

/* >==== SAVE & UPDATE METHODS ====> */
function register() {
  if (!preCheckProfile()) return
  if (passPhraseHasError()) return
  registerUser()
}

function preValidResgister() {
  if (!preCheckProfile()) return
  passPhraseDialogOpened.value = true
}

function saveProfile() {
  if (!preCheckProfile()) return
  // if not, save
  updateUser()
}

function passPhraseHasError() {
  passPhraseErrorMessage.value = ''
  if (passPhrase.value.length < 8) {
    passPhraseErrorMessage.value = 'your pass phrase need to have at least 8 characters'
    return true
  }
  return false
}

function preCheckProfile() {
  // run validators
  const errorFields = Object.keys(errors) as Array<keyof TProfileFormData>
  errorFields.forEach((field) => errors[field].validator())
  // check if any error arose
  const isThereErrors = errorFields.map((field) => !!errors[field].message).find((error) => error)
  if (isThereErrors) return
  return true
}

function updateUser() {
  const { name, description, goals, country, langs, interests, skills, openOnlyToThoseMatchingSearch } = profileFormData

  useAPI().users.updateProfile({
    name,
    description,
    goals,
    openOnlyToThoseMatchingSearch,
    profileData: { country, langs, interests, skills }
  })
}

async function registerUser() {
  const { name, description, goals, country, langs, interests, skills, openOnlyToThoseMatchingSearch } = profileFormData
  const idMask = useSessionStore().getIdMask()

  if (!idMask) return

  const newWallet = createUserWallet()
  const cryptedPrivateKey = encryptKey(newWallet.privateKey, passPhrase.value)

  const res = await useAPI().users.register(idMask, newWallet.address, cryptedPrivateKey, {
    name,
    description,
    goals,
    openOnlyToThoseMatchingSearch,
    profileData: { country, langs, interests, skills }
  })

  if (!res.error) {
    useRouter().push('/search')
  }
}
</script>

<style lang="scss" scoped>
#profile {
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .main-title {
    margin-bottom: 40px;
    padding-bottom: 20px;
    width: 100%;
    text-align: left;
    position: relative;

    &::after {
      content: '';
      height: 1px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }

  #profile-form {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 25px;
    width: 100%;

    .--block {
      width: 50%;

      .--group {
        width: 100%;

        .--group-name {
          margin-bottom: 15px;
          padding-bottom: 5px;
          width: 100%;
          position: relative;

          &::after {
            content: '';
            height: 1px;
            width: 100%;
            position: absolute;
            background-color: white;
            bottom: 0;
            left: 0;
          }
        }

        & + .--group {
          position: relative;
        }
      }

      .goals {
        .add-goal-btn {
          text-transform: capitalize;
        }
      }
    }
  }

  .--submit {
    margin-top: 50px;
  }
}

.pass-phrase-section {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .--submit {
    align-self: center;
  }
}

@media screen and (max-width: 750px) {
  #profile {
    padding: 50px 20px;
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
