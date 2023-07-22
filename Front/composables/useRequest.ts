/*
 *  options:
 *
 *    alert: {
 *      mode: controls if alert based on request result is shown to the user. ('all' | 'none' | 'on-success' | 'on-error' [default])
 *      successMsg: message to show if request succeeds
 *      errorMsg: message to show if request fails
 *      persistant: Boolean to control wheither the alert closes after some time of stay until the user closes it (true | false [default])
 *      durationInMs: an int value representing the time before the alert closes itself. Defaults to 5000
 *    }
 *
 *    method: Request method.
 *    query: Adds query search params to URL using ufo
 *    params: Alias for query
 *    body: Request body - automatically stringified (if an object is passed).
 *    headers: Request headers.
 *    baseURL: Base URL for the request.
 *    key: a unique key to ensure that data fetching can be properly de-duplicated across requests, if not provided, it will be generated based on the static code location where useAsyncData is used.
 *    server: Whether to fetch the data on the server (defaults to true).
 *    default: A factory function to set the default value of the data, before the async function resolves - particularly useful with the lazy: true option.
 *    pick: Only pick specified keys in this array from the handler function result.
 *    watch: watch reactive sources to auto-refresh.
 *    transform: A function that can be used to alter handler function result after resolving.
 *    immediate: When set to false, will prevent the request from firing immediately. (defaults to true)
 *
 *  official documentation:
 *    https://nuxt.com/docs/api/composables/use-fetch#return-values
 */

import { AlertModes } from '@/assets/ts/enums/store'
import { DEFAULT_REQUEST_ERROR, HTTP_METHODS } from '@/types/APIs'

export const useRequest = () => ({
  /**
   * Send a request to a remote resource
   *
   * @param {string}          url     The url of the remote resource to target. (can be absolute or relative, but if the latest the baseURL option must be provided)
   * @param {IRequestOptions}  options The options to customize the request and its behavior. (must at least provide an HTTP method)
   *
   * @returns an object with 2 properties, data and error
   */
  async send<T>(url: string, options: IRequestOptions): Promise<IRequestResult<T>> {
    // check for HTTP method
    if (!options.method) throw new Error('An HTTP method must be provided within the options')

    // user feeback on request result, defaults to 'on-error'
    if (!options.alert) options.alert = { mode: AlertModes.ON_ERROR }

    // if no baseUrl is specified, set it to what the url provide if it does, VMC API otherwise
    const envBaseUrl = process.env.NODE_ENV === 'test' ? (import.meta.env.VITE_BASE_API_URL as string) : useRuntimeConfig().BASE_API_URL
    if (!options.baseURL) options.baseURL = url.includes('http') ? new URL(url).host : envBaseUrl

    let response: IRequestResult<T>
    try {
      response = await useFetchWrapper<T>().call(url, options)
    } catch (e) {
      response = { data: null, error: DEFAULT_REQUEST_ERROR }
    }

    const { data, error } = response

    // alert handling
    useAlertStore().handleRequestResult(options.alert, error)

    return { data, error }
  },

  /**
   * Send a GET request to a remote resource
   *
   * @param {string}            url     The url of the remote resource to target. (can be absolute or relative, but if the latest the baseURL option must be provided)
   * @param {IRequestOptions}   options The options to customize the request and its behavior.
   *
   * @returns an object with 2 properties, data and error
   */
  async get<T>(url: string, options: IRequestOptions | null = null): Promise<IRequestResult<T>> {
    return await this.send<T>(url, { ...(options || {}), method: HTTP_METHODS.GET })
  },

  /**
   * Send a POST request to a remote resource
   *
   * @param {string}            url     The url of the remote resource to target. (can be absolute or relative, but if the latest the baseURL option must be provided)
   * @param {object}            body    A generic object that hold the data to send with the request, if any.
   * @param {IRequestOptions}   options The options to customize the request and its behavior.
   *
   * @returns an object with 2 properties, data and error
   */
  // eslint-disable-next-line prettier/prettier
  async post<T>(url: string, options: IRequestOptions | null = null): Promise<IRequestResult<T>> {
    return await this.send<T>(url, { ...(options || {}), method: HTTP_METHODS.POST })
  },

  /**
   * Send a PUT request to a remote resource
   *
   * @param {string}            url     The url of the remote resource to target. (can be absolute or relative, but if the latest the baseURL option must be provided)
   * @param {object}            body    A generic object that hold the data to send with the request, if any.
   * @param {IRequestOptions}   options The options to customize the request and its behavior.
   *
   * @returns an object with 2 properties, data and error
   */
  // eslint-disable-next-line prettier/prettier
  async put<T>(url: string, options: IRequestOptions | null = null): Promise<IRequestResult<T>> {
    return await this.send<T>(url, { ...(options || {}), method: HTTP_METHODS.PUT })
  },

  /**
   * Send a PATCH request to a remote resource
   *
   * @param {string}            url     The url of the remote resource to target. (can be absolute or relative, but if the latest the baseURL option must be provided)
   * @param {object}            body    A generic object that hold the data to send with the request, if any.
   * @param {IRequestOptions}   options The options to customize the request and its behavior.
   *
   * @returns an object with 2 properties, data and error
   */
  // eslint-disable-next-line prettier/prettier
  async patch<T>(url: string, options: IRequestOptions | null = null): Promise<IRequestResult<T>> {
    return await this.send<T>(url, { ...(options || {}), method: HTTP_METHODS.PATCH })
  },

  /**
   * Send a DELETE request to a remote resource
   *
   * @param {string}            url     The url of the remote resource to target. (can be absolute or relative, but if the latest the baseURL option must be provided)
   * @param {object}            body    A generic object that hold the data to send with the request, if any.
   * @param {IRequestOptions}   options The options to customize the request and its behavior.
   *
   * @returns an object with 2 properties, data and error
   */
  // eslint-disable-next-line prettier/prettier
  async delete<T>(url: string, options: IRequestOptions | null = null): Promise<IRequestResult<T>> {
    return await this.send<T>(url, { ...(options || {}), method: HTTP_METHODS.DELETE })
  }
})
