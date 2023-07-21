export {}

declare global {
  type ALERT_MODE = 'all' | 'none' | 'on-success' | 'on-error'

  type ALERT_STATUS = 'success' | 'error'

  interface IAlertControl {
    mode: ALERT_MODE
    successMsg?: string
    errorMsg?: string
    persistant?: boolean
    durationInMs?: number
  }

  interface IAlert {
    status: ALERT_STATUS
    message: string
    persistant: boolean
    durationInMs: number
  }
}
