// must be explicitly imported for vitest unit testing
import { defineStore } from 'pinia'

export interface ISessionStore {
  user: IUser | null
}

const storedData: ISessionStore = {
  user: null
}

export const useSessionStore = defineStore({
  id: 'session',
  state: () => storedData,
  actions: {
    logIn(user: IUser) {
      this.user = user
    },
    logOut() {
      this.user = null
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  persist: true
})
