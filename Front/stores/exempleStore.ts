// must be explicitely imported for vitest unit testing
import { defineStore } from 'pinia'

export const useExempleStore = defineStore({
  id: 'exemple',
  state: () => ({
    counter: 0 as number
  }),
  actions: {
    increase() {
      this.counter++
    },
    decrease() {
      this.counter--
    },
    double() {
      this.counter *= 2
    }
  },
  getters: {
    isEven: (state) => state.counter % 2
  }
})
