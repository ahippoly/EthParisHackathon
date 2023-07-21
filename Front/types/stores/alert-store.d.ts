// enum version of ALERT_MODE type
export enum AlertModes {
  ALL = 'all',
  NONE = 'none',
  ON_SUCCESS = 'on-success',
  ON_ERROR = 'on-error'
}

// enum version of ALERT_STATUS type
export enum AlertStatuses {
  SUCCESS = 'success',
  ERRROR = 'error'
}

declare global {
  type TAlertMode = AlertModes.ALL | AlertModes.NONE | AlertModes.ON_SUCCESS | AlertModes.ON_ERROR

  type TAlertStatus = AlertStatuses.ERRROR | AlertStatuses.SUCCESS

  interface IAlertControl {
    mode: TAlertMode
    successMsg?: string
    errorMsg?: string
    persistant?: boolean
    durationInMs?: number
  }

  interface IAlert {
    status: TAlertStatus
    message: string
    persistant: boolean
    durationInMs: number
  }
}
