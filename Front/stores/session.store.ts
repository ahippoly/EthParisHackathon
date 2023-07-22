// must be explicitly imported for vitest unit testing
import { defineStore } from 'pinia'
import { User } from '@/assets/ts/classes/user'

export interface ISessionStore {
  user: User | null
}

const storedData: ISessionStore = {
  user: null
}

export const useSessionStore = defineStore({
  id: 'session',
  state: () => storedData,
  actions: {
    logIn(user: User) {
      this.user = user
    },
    setUser(user: User) {
      this.user = user
    },
    getUser() {
      return this.user ? User.fromRawUser(this.user) : null
    },
    logOut() {
      this.user = null
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.user
  },
  persist: true
})
