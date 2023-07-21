async function callUseFetch<T>(url: string, options: IRequestOptions): Promise<IRequestResult<T>> {
  const { data, error } = await useFetch<T>(url, options as object)

  let requestError: IRequestError | null = null

  if (error.value) {
    const status = error.value?.statusCode || 500

    const rawMessage = <string | undefined>error.value?.data?.message

    // check if there is an error message and that it's not a one-word automatic message (ex: 'Unauthorized')
    const message = rawMessage && rawMessage.includes(' ') ? rawMessage : 'Une erreur est survenue lors du traitement de votre requête'

    requestError = { status, message }
  }

  return { data: data.value as T, error: requestError }
}

async function callBuiltInFetch<T>(url: string, options: IRequestOptions): Promise<IRequestResult<T>> {
  const hostnameWithPath = options.baseURL && !url.includes('http') ? options.baseURL + url : url
  let fullURI = hostnameWithPath

  // create query string if there is query / params
  const queryParams = options.params || options.query
  if (queryParams) {
    const queryString = Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join('&')

    // ex: https://github.com/some-page?
    if (hostnameWithPath.endsWith('?')) fullURI += queryString
    // ex: https://github.com/some-page?some-param=some-value
    else if (hostnameWithPath.includes('?')) fullURI += `&${queryString}`
    // ex: https://github.com/some-page
    else fullURI += `?${queryString}`
  }

  const response = await fetch(fullURI, {
    method: options.method,
    body: options.body ? JSON.stringify(options.body) : null,
    headers: { ...(options.headers || {}), 'Content-Type': 'application/json' },
    credentials: options.credentials,
    mode: options.mode || 'cors'
  })

  // get data
  const contentType = response.headers.get('Content-Type')
  const isContentJSONParsable = contentType?.includes('application') && contentType?.includes('json')
  const data: T | { message: string | string[] } | null = isContentJSONParsable ? await response.json() : await response.text()

  // check error
  let error: IRequestError | null = null
  if (!response.ok) {
    const status = response.status

    // get message from data if there is
    const isThereData = !!data && typeof data === 'object'
    const isThereDataMessage = isThereData && !!(data as { message: string | string[] }).message
    const dataWithMessage = isThereDataMessage ? (data as { message: string | string[] }).message : null
    const dataMessage = dataWithMessage ? (Array.isArray(dataWithMessage) ? dataWithMessage[0] : dataWithMessage) : null

    // check if there is an error message and that it's not a one-word automatic message (ex: 'Unauthorized')
    const message = dataMessage && dataMessage.includes(' ') ? dataMessage : 'Une erreur est survenue lors du traitement de votre requête'

    error = { status, message }
  }

  // get headers
  const headers: Record<string, string> = {}
  Object.entries(response.headers).forEach(([key, value]: [string, string]) => (headers[key] = value))

  return { data: response.ok ? (data as T) : null, error, headers }
}

export const useFetchWrapper = <T>() => ({
  call: async (url: string, options: IRequestOptions): Promise<IRequestResult<T>> => {
    try {
      // if request is sent to our own API, set our requested headers accordingly
      if (options.baseURL?.includes(useRuntimeConfig().public.BASE_API_URL)) {
        options.credentials = options.credentials || 'include'
        options.headers = {
          ...(options.headers || {}),
          tz: 'Europe/Paris',
          locale: 'fr-FR'
        }

        // if user is logged in and there is no already set authorization
        if (useSessionStore().isLoggedIn && !options.headers.Authorization && !options.headers.authorization)
          options.headers.authorization = 'Bearer ' + useSessionStore().accessToken
      }

      let response: IRequestResult<T>

      // if fetch is not defined, use the useFetch composable
      // but if so we cannot access the response headers, so avoid it if possible
      // @ts-ignore
      if (window && window.fetch) response = await callBuiltInFetch<T>(url, options)
      else response = await callUseFetch<T>(url, options)

      // if request was sent to VMC's API
      if (options.baseURL?.includes(useRuntimeConfig().BASE_API_URL)) {
        // if the user's accessToken was refreshed, get it and store it
        if (response.headers && response.headers['Access-Token']) useSessionStore().setNewAccessToken(response.headers['Access-Token'])
        // if the API sent back a 498 code, it means the user has to log back in
        if (response.error && response.error.status === 498) useSessionStore().logOut()
      }

      return response
    } catch (error) {
      // get error message
      const message = error
        ? typeof error === 'string'
          ? error
          : (error as Record<string, string>)['message'] || 'Une erreur est survenue'
        : 'Une erreur est survenue'

      return {
        data: null,
        error: { status: 500, message }
      }
    }
  }
})
