// must be explicitly imported for vitest unit testing
import { defineStore } from 'pinia'
import { User } from '@/assets/ts/classes/user'

export interface ISessionStore {
  user: User | null
  idMask: string | null
  sismoResponse: IVerifyResponse | null
}

const storedData: ISessionStore = {
  user: null,
  idMask: null,
  sismoResponse: null
}

export const useSessionStore = defineStore({
  id: 'session',
  state: () => storedData,
  actions: {
    logIn(user: User, idMask: string) {
      this.user = user
      this.idMask = idMask
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
    setSismoResponse(sismoResponse: IVerifyResponse) {
      this.sismoResponse = sismoResponse
    },
    getSismoResponse() {
      return this.sismoResponse
    },
    logOut() {
      this.user = null
      this.idMask = null
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.user
  },
  persist: true
})
