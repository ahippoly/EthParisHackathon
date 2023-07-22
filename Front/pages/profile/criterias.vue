<template>
  <section id="search-criterias" class="--page">
    <h1 class="main-title text-h4">My Search Criterias</h1>

    <section id="search-criterias-form">
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
import { User, UserSearch } from '@/assets/ts/classes/user'

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

/* >==== SAVE & UPDATE METHODS ====> */
function saveSearch() {
  // if not, save
  if (user) updateSearch(user)
}

function updateSearch(user: User) {
  user.setSearch(UserSearch.fromIUserSearch(searchFormData))
}
</script>

<style lang="scss" scoped>
#search-criterias {
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

  #search-criterias-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
    width: clamp(200px, 800px, 90vw);

    .--group {
      width: 100%;

      .--group-name {
        margin-bottom: 15px;
        text-decoration: underline;
      }

      & + .--group {
        margin-top: 20px;
        position: relative;
      }
    }

    .--input {
      color: $clr-text !important;
    }
  }
}

.--submit {
  margin-top: 50px;
}
</style>
