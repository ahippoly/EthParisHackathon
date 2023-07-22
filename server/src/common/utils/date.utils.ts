/* DATES */

// type DateDelimiter = 'yyyy' | 'MM' | 'dd' | 'HH' | 'mm' | 'ss'
// type DateDataProperties = 'year' | 'month' | 'day' | 'hours' | 'minutes' | 'seconds'

type DateParsingData =
  | { label: 'year'; delimiter: 'yyyy' }
  | { label: 'month'; delimiter: 'MM' }
  | { label: 'day'; delimiter: 'dd' }
  | { label: 'hours'; delimiter: 'HH' }
  | { label: 'minutes'; delimiter: 'mm' }
  | { label: 'seconds'; delimiter: 'ss' }

interface IDateData {
  year: string | number
  month: string | number
  day: string | number
  hours: string | number
  minutes: string | number
  seconds: string | number
}

const __dateParsingProperties: DateParsingData[] = [
  { label: 'day', delimiter: 'dd' },
  { label: 'month', delimiter: 'MM' },
  { label: 'year', delimiter: 'yyyy' },
  { label: 'hours', delimiter: 'HH' },
  { label: 'minutes', delimiter: 'mm' },
  { label: 'seconds', delimiter: 'ss' },
]

/**
 * A class that provides static utilities to manipulate dates.
 */
export class DatesUtils {
  // extract date data from a date object
  /**
   * Extracts date data from a date object.
   * @param {Date} date The date object to extract data from.
   * @param {boolean} pretty If true, the data will be padded with a 0 if it's a single digit.
   * default: false
   * @returns An object containing the date data according to the {@link IDateData} interface.
   */
  static getDateData(date: Date, pretty = false): IDateData | null {
    if (isNaN(date.getTime())) return null

    let year: string | number = date.getUTCFullYear()
    let month: string | number = date.getUTCMonth() + 1
    let day: string | number = date.getUTCDate()
    let hours: string | number = date.getUTCHours()
    let minutes: string | number = date.getUTCMinutes()
    let seconds: string | number = date.getUTCSeconds()

    if (pretty) {
      year = `${year}`
      month = month < 10 ? `0${month}` : `${month}`
      day = day < 10 ? `0${day}` : `${day}`
      hours = hours < 10 ? `0${hours}` : `${hours}`
      minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
      seconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    }

    return {
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
    }
  }

  // extract date data from a string
  /**
   * Extracts date data from a string and a given format.
   * @param {String} strDate The string date to extract data from.
   * @param {String} format The format of the string date.
   * default: 'dd/MM/yyyy HH:mm'
   * @param {boolean} castToInt If true, the data will be cast to an integer.
   * default: false
   * @returns An object containing the date data according to the {@link IDateData} interface.
   */
  static getStrDateData(strDate: string, format = 'dd/MM/yyyy HH:mm', castToInt = false): IDateData | null {
    if (strDate.length !== format.length) return null

    const parsedData: IDateData = { year: '0', month: '1', day: '1', hours: '0', minutes: '0', seconds: '0' }

    for (let i = 0; i < __dateParsingProperties.length; i++) {
      // check if this time data is required
      const delimiter = __dateParsingProperties[i].delimiter
      // if not, skip it
      if (!format.includes(delimiter)) continue

      const dataIndex = format.indexOf(delimiter)

      // means it found the data
      if (dataIndex >= 0) {
        const dateData = strDate.substring(dataIndex, dataIndex + __dateParsingProperties[i].delimiter.length)
        const intData = parseInt(dateData)

        if (!dateData || isNaN(intData)) return null

        parsedData[__dateParsingProperties[i].label] = dateData
      }
      // else it means that the string date doens't match the requested format
      else return null
    }

    if (castToInt) Object.keys(parsedData).forEach((timeScope) => (parsedData[timeScope] = parseInt(parsedData[timeScope])))

    return parsedData
  }

  // create a date object from a string
  /**
   * Creates a date object from a string and a given format.
   * @param {String} strDate The string date to create the date object from.
   * @param {String} format The format of the string date.
   * default: 'dd/MM/yyyy HH:mm'
   * @returns A date object if the string date is valid, null otherwise.
   */
  static getUTCDateFromStr(strDate: string, format = 'dd/MM/yyyy HH:mm'): Date | null {
    const dateData = DatesUtils.getStrDateData(strDate, format)
    if (!dateData) return null

    // cast all string data to number
    Object.keys(dateData).forEach((timeScope) => {
      if (typeof dateData[timeScope] === 'number') dateData[timeScope] = dateData[timeScope]
      else dateData[timeScope] = parseInt(dateData[timeScope])
    })

    const { year, month, day, hours, minutes, seconds } = dateData as Record<keyof IDateData, number>

    const dateUTCTimestamp = Date.UTC(year, month - 1, day, hours, minutes, seconds)
    const date = new Date(dateUTCTimestamp)

    const isDateValid = !isNaN(date.getTime())

    return isDateValid ? date : null
  }

  // take a date object and convert it to the requested string format
  /**
   * Converts a date object to a string with a given format.
   * @param {Date} date The date object to convert.
   * @param {String} format The format of the string date.
   * default: 'dd/MM/yyyy HH:mm'
   * @returns A string date if the date object is valid, null otherwise.
   */
  static getStrFromDate(date: Date, format = 'dd/MM/yyyy HH:mm'): string | null {
    if (isNaN(date.getTime())) return null

    const dateData = DatesUtils.getDateData(date, true)
    if (!dateData) return null

    const dataToParse = [
      { format: 'dd', value: dateData.day },
      { format: 'MM', value: dateData.month },
      { format: 'yyyy', value: dateData.year },
      { format: 'HH', value: dateData.hours },
      { format: 'mm', value: dateData.minutes },
      { format: 'ss', value: dateData.seconds },
    ]

    let formattedDate = format

    for (let i = 0; i < dataToParse.length; i++) {
      // check if data is present in the date, and present in the requested format
      if (dataToParse[i].value && format.indexOf(dataToParse[i].format) >= 0)
        formattedDate = formattedDate.replace(dataToParse[i].format, dataToParse[i].value as string)
    }

    return formattedDate
  }

  // take a str representing a date in a format and convert it to another one
  /**
   * Converts a string date from a format to another.
   * @param {String} strDate The string date to convert.
   * @param {String} formatFrom The format of the string date.
   * @param {String} formatTo The format to convert the string date to.
   * @returns A string date if the string date is valid, null otherwise.
   */
  static convertStrFormat(strDate: string, formatFrom: string, formatTo: string): string | null {
    const dateData = DatesUtils.getStrDateData(strDate, formatFrom)
    if (!dateData) return null

    let formattedDate = formatTo

    // for each possible date property
    __dateParsingProperties.forEach((dateParsingProperty: DateParsingData) => {
      // check if that property is present in the given date, and is expected to be present in the given format
      if (dateData[dateParsingProperty.label] && formattedDate.indexOf(dateParsingProperty.delimiter) >= 0) {
        // if so, replace the property delimiter with the value from the given date
        formattedDate = formattedDate.replace(dateParsingProperty.delimiter, dateData[dateParsingProperty.label] as string)
      }
    })

    return formattedDate
  }

  /**
   * Check if 2 dates are the same day of the first after the other
   *
   * @param {Date} date1 The date that we want to know if it is the same day or after the other
   * @param {Date} date2 The date to compare the first date with
   * @returns true if it is the same day or after the other, false otherwise
   */
  static isDateTheSameDayOrAfter(date1: Date, date2: Date): boolean {
    const d1Data = DatesUtils.getDateData(date1)
    const d2Data = DatesUtils.getDateData(date2)
    if (!d1Data || !d2Data) return false

    if (d1Data.year !== d2Data.year) return (d1Data.year as number) > (d2Data.year as number)
    if (d1Data.month !== d2Data.month) return (d1Data.month as number) > (d2Data.month as number)
    if ((d1Data.day as number) < (d2Data.day as number)) return false

    return true
  }

  /**
   * Check if 2 dates are the same day of the first before the other
   *
   * @param {Date} date1 The date that we want to know if it is the same day or before the other
   * @param {Date} date2 The date to compare the first date with
   * @returns true if it is the same day or before the other, false otherwise
   */
  static isDateTheSameDayOrBefore(date1: Date, date2: Date): boolean {
    const d1Data = DatesUtils.getDateData(date1)
    const d2Data = DatesUtils.getDateData(date2)
    if (!d1Data || !d2Data) return false

    if (d1Data.year !== d2Data.year) return (d1Data.year as number) < (d2Data.year as number)
    if (d1Data.month !== d2Data.month) return (d1Data.month as number) < (d2Data.month as number)
    if ((d1Data.day as number) > (d2Data.day as number)) return false

    return true
  }

  /**
   * Check if a date is between 2 others day-wise
   *
   * @param {Date} date The date to check
   * @param {Date} min The minimum date
   * @param {Date} max The maximum date
   * @returns true the date is between the other 2, false otherwise
   */
  static isDateBetween(date: Date, min: Date, max: Date): boolean {
    if (!DatesUtils.isDateTheSameDayOrAfter(date, min)) return false

    return DatesUtils.isDateTheSameDayOrBefore(date, max)
  }

  /**
   * Check if 2 dates both represent the exact same moment
   *
   * @param {Date} d1 The first date to compare
   * @param {Date} d2 The second date to compare
   * @returns true if the dates represent both the exact same moment, false otherwise
   */
  static areDatesEqual(d1: Date, d2: Date): boolean {
    return d1.toLocaleDateString() === d2.toLocaleDateString()
  }

  /**
   * Check if 2 string dates are strictly equals
   *
   * @param {string} d1 The first date to compare
   * @param {string} d2 The second date to compare
   * @returns true if the dates are strictly equals, false otherwise
   */
  static areStrDatesEqual(d1: string, d2: string): boolean {
    return d1 === d2
  }

  /**
   * JS Date consider that the first day of the week is sunday with index 0, up to saturday with index 6
   * Restore day of week indexing from monday with index 0, up to sunday with index 6
   *
   * @param {number} dayOfWeek the day of week given by a Date object
   * @returns a recalibrated day of week indexing from monday with index 0 up to sunday with index 6,
   * or -1 if the given day of week is invalid
   */
  static getCalibratedDayOfWeek(dayOfWeek: number): number {
    if (dayOfWeek < 0 || dayOfWeek > 6) return -1
    if (dayOfWeek === 0) return 6
    return dayOfWeek - 1
  }
}
