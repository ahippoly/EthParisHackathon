// must be explicitly imported for vitest unit testing
import { defineStore } from 'pinia'
import { DEFAULT_REQUEST_ERROR_MESSAGE, DEFAULT_REQUEST_SUCCESS_MESSAGE } from '@/types/APIs/requests'
import { AlertModes, AlertStatuses } from '@/assets/ts/enums/store'

export const useAlertStore = defineStore({
  id: 'alert',
  state: () => ({
    alert: null as IAlert | null
  }),
  actions: {
    /**
     *
     * @param {string}  status        controls the type of alert ('success' | 'error')
     * @param {string}  message       the message to display to the user
     * @param {boolean} persistant    controls if the alert will disappear on its own after some time or requires user input to do so (default: false)
     * @param {number}  durationInMs  if persistant is false, controls the time before disappearing in milliseconds (default: 5000)
     */
    sendAlert(status: TAlertStatus, message: string, persistant = false, durationInMs = 5000) {
      this.alert = {
        status,
        message,
        persistant,
        durationInMs
      }
    },
    /**
     * Sends or not an alert based on the error and alertControl objects
     * @param {IAlertControl} alertControl  the object that controls the behavior of the alert
     * @param {IRequestError} error         an optional object representing the error if there was an error
     */
    handleRequestResult(alertControl?: IAlertControl | null, error?: IRequestError | null) {
      // no alert required
      if (!alertControl || alertControl.mode === AlertModes.NONE) return
      // there is an error and only successful request require alert
      if (error && alertControl.mode !== AlertModes.ALL && alertControl.mode !== AlertModes.ON_ERROR) return
      // there is no error and only failed request require alert
      if (!error && alertControl.mode !== AlertModes.ALL && alertControl.mode !== AlertModes.ON_SUCCESS) return

      const status = error ? AlertStatuses.ERRROR : AlertStatuses.SUCCESS
      const message = error
        ? alertControl.errorMsg || error.message || DEFAULT_REQUEST_ERROR_MESSAGE
        : alertControl.successMsg || DEFAULT_REQUEST_SUCCESS_MESSAGE

      this.sendAlert(status, message, alertControl.persistant, alertControl.durationInMs)
    },
    resetAlert() {
      this.alert = null
    }
  }
})
