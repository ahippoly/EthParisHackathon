// enum version of ALERT_MODE type
import { AlertModes, AlertStatuses } from '@/assets/ts/enums/store'

export {}

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
