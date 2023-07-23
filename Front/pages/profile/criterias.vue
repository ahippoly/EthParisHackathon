<template>
  <section id="search-criterias" class="h-screen">
    <h1 class="text-h4">My Search Criterias</h1>

    <section id="search-criterias-form">
      <!-- MINIUM BALANCE -->
      <v-text-field
        v-model.number="searchFormData.minimumBalance"
        class="--input"
        type="number"
        step="any"
        min="0"
        label="Minimum balance"
        :error="!!errors.minimumBalance.message"
        :error-messages="errors.minimumBalance.message"
        @update:model-value="errors.minimumBalance.validator"
      ></v-text-field>

      <!-- COUNTRY -->
      <v-autocomplete
        v-model="searchFormData.country"
        class="--intput --group"
        :items="Object.values(Countries)"
        base-color="#F2E9E4"
        color="#F2E9E4"
        label="Country"
        clearable
      ></v-autocomplete>

      <!-- SPOKEN LANGUAGES -->
      <v-autocomplete
        v-model="searchFormData.langs"
        class="--intput --group"
        :items="Object.values(Langs)"
        base-color="#F2E9E4"
        color="#F2E9E4"
        label="Languages"
        multiple
        chips
        closable-chips
        clearable
      ></v-autocomplete>

      <!-- INTERESTS -->
      <v-autocomplete
        v-model="searchFormData.interests"
        class="--intput --group"
        :items="Object.values(Interests)"
        base-color="#F2E9E4"
        color="#F2E9E4"
        label="Interests"
        multiple
        chips
        closable-chips
        clearable
      ></v-autocomplete>

      <!-- SKILLS -->
      <v-autocomplete
        v-model="searchFormData.skills"
        class="--intput --group"
        :items="Object.values(Skills)"
        base-color="#F2E9E4"
        color="#F2E9E4"
        label="Skills"
        multiple
        chips
        closable-chips
        clearable
      ></v-autocomplete>
    </section>

    <!-- SUBMIT -->
    <v-btn class="--submit" variant="elevated" @click="saveSearch()">Save search parameters</v-btn>
  </section>
</template>

<script lang="ts" setup>
import { Countries, Interests, Langs, Skills } from '@/assets/ts/enums/meta-datas'

definePageMeta({ middleware: ['is-logged-in'] })

type TSearchFormData = IUserSearch

const user = useSessionStore().getUser()

/* >==== INPUTS VALUE ====> */
const searchFormData = reactive<TSearchFormData>({
  minimumBalance: user?.search?.minimumBalance || 0,
  country: user?.search?.country || ('' as Countries),
  langs: user?.search?.langs || [],
  interests: user?.search?.interests || [],
  skills: user?.search?.skills || []
})

const errors = reactive<{ minimumBalance: { message: string; validator: (value?: number) => void } }>({
  minimumBalance: {
    message: '',
    validator: (value?: number) => {
      const newValue = value ?? searchFormData.minimumBalance
      errors.minimumBalance.message = !newValue || newValue >= 0 ? '' : 'You must provide a positive number'
    }
  }
})

/* >==== SAVE & UPDATE METHODS ====> */
function saveSearch() {
  // run validators
  errors.minimumBalance.validator()

  // check if any error arose
  const isThereErrors = !!errors.minimumBalance.message
  if (isThereErrors) return

  // if not, save
  updateSearch()
}

function updateSearch() {
  useAPI().users.updateSearch({ ...searchFormData, country: searchFormData.country || undefined })
}
</script>

<style lang="scss" scoped>
#search-criterias {
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .main-title {
    margin-bottom: 50px;
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

  #search-criterias-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: clamp(200px, 800px, 90vw);

    .--group {
      width: 100%;

      .--group-name {
        margin-bottom: 15px;
        text-decoration: underline;
      }

      & + .--group {
        position: relative;
      }
    }

    .--input {
      width: 100%;
    }
  }
}

.--submit {
  margin-top: 50px;
}
@media screen and (max-width: 750px) {
  #search {
    padding: 50px 20px;
    #search-form {
      flex-direction: column;
      align-items: center;

      .--block {
        width: 100%;
      }
    }
  }
}
</style>
