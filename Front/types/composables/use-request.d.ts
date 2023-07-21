export {}

declare global {
  type HTTP_METHOD = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

  interface IRequestError {
    status: number
    message: string
  }

  interface IRequestResponse {
    statusCode: number
    message: string
  }

  interface IRequestResult<T> {
    data: T | null
    error: IRequestError | null
    headers?: Record<string, string>
  }

  type TRequestMode = 'cors' | 'navigate' | 'no-cors' | 'same-origin'
  type TRequestCredentials = 'include' | 'omit' | 'same-origin'

  interface IRequestOptions {
    method?: HTTP_METHOD
    alert?: IAlertControl
    body?: object | null
    baseURL?: string
    headers?: Record<string, string>
    query?: Record<string, string | boolean | number>
    params?: Record<string, string | boolean | number>
    key?: string
    lazy?: boolean
    immediate?: boolean
    credentials?: TRequestCredentials
    mode?: TRequestMode
  }
}
