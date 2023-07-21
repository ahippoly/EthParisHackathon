// must be explicitly imported for vitest unit testing
import { defineStore } from 'pinia'

type TEventName = string
type TSubscriberCallback<T = unknown> = (payload?: T) => void

interface IGlobalEventStoreData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribers: Record<TEventName, Array<TSubscriberCallback<any>>>
}

const storedData: IGlobalEventStoreData = {
  subscribers: {}
}

//TODO: write a little documentation about this system

export const useGlobalEventsStore = defineStore({
  id: 'globalEvents',
  state: () => storedData,
  actions: {
    emitEvent(eventName: string, payload?: unknown) {
      if (!this.subscribers[eventName] || !this.subscribers[eventName].length) return
      for (const subscriber of this.subscribers[eventName]) {
        if (subscriber) subscriber(payload)
      }
    },
    subscribeTo<T = unknown>(eventName: string, callback: TSubscriberCallback<T>) {
      if (!this.subscribers[eventName]) this.subscribers[eventName] = [callback]
      else this.subscribers[eventName].push(callback)
    }
  },
  persist: true
})
