// must be explicitly imported for vitest unit testing
import { defineStore } from 'pinia'
import { User } from '@/assets/ts/classes/user'

export interface ISessionStore {
  user: User | null
  idMask: string | null
}

const storedData: ISessionStore = {
  user: null,
  idMask: null
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
    setIdMask(idMask: string) {
      this.idMask = idMask
    },
    getIdMask() {
      return this.idMask
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
