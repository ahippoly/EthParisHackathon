export const DEFAULT_REQUEST_ERROR_MESSAGE = 'Une erreur est survenue, veuillez réessayer plus tard.'
export const DEFAULT_REQUEST_ERROR: IRequestError = { status: 500, message: DEFAULT_REQUEST_ERROR_MESSAGE }
export const MISSING_DATA_REQUEST_ERROR: IRequestError = { status: 400, message: 'Il manque des informations' }
export const INVALID_DATA_REQUEST_ERROR: IRequestError = { status: 400, message: 'Certaines informations sont invalides' }
