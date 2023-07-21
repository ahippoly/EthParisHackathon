/* DATES */

const __dateParsingProperties: DateParsingData[] = [
  { label: 'day', delimiter: 'dd' },
  { label: 'month', delimiter: 'MM' },
  { label: 'year', delimiter: 'yyyy' },
  { label: 'hours', delimiter: 'HH' },
  { label: 'minutes', delimiter: 'mm' },
  { label: 'seconds', delimiter: 'ss' }
]

class DatesUtils {
  // extract date data from a date object
  static getDateData(date: Date, pretty = false): DateData {
    const year = date.getFullYear()
    let month: string | number = date.getMonth() + 1
    let day: string | number = date.getDate()
    let hours: string | number = date.getHours()
    let minutes: string | number = date.getMinutes()
    let seconds: string | number = date.getSeconds()

    if (pretty) {
      month = month < 10 ? `0${month}` : month
      day = day < 10 ? `0${day}` : day
      hours = hours < 10 ? `0${hours}` : hours
      minutes = minutes < 10 ? `0${minutes}` : minutes
      seconds = seconds < 10 ? `0${seconds}` : seconds
    }

    return {
      year,
      month,
      day,
      hours,
      minutes,
      seconds
    }
  }

  // extract date data from a string
  static getStrDateData(strDate: string, format = 'dd/MM/yyyy HH:mm', castToInt = false): DateData {
    const parsedData: DateData = {}

    for (let i = 0; i < __dateParsingProperties.length; i++) {
      const dataIndex = format.indexOf(__dateParsingProperties[i].delimiter)

      // means it found the data
      if (dataIndex >= 0) {
        const dateData = strDate.substring(dataIndex, dataIndex + __dateParsingProperties[i].delimiter.length)
        parsedData[__dateParsingProperties[i].label] = castToInt ? parseInt(dateData) : dateData
      }
    }

    return parsedData
  }

  // create a date object from a string
  static getDateFromStr(strDate: string, format = 'dd/MM/yyyy HH:mm'): Date {
    const dateData = DatesUtils.getStrDateData(strDate, format)

    let initStr = `${dateData.month}/${dateData.day}/${dateData.year}`

    // include hours if there is
    if (dateData.hours) {
      initStr += ` ${dateData.hours}`

      // include minutes if there is
      if (dateData.minutes) {
        initStr += `:${dateData.minutes}`

        // include seconds if there is
        if (dateData.seconds) {
          initStr += `:${dateData.seconds}`
        }
      }
    }

    return new Date(initStr)
  }

  // take a date object and convert it to the requested string format
  static getStrFromDate(date: Date, format = 'dd/MM/yyyy HH:mm'): string {
    const dateData = DatesUtils.getDateData(date, true)
    const dataToParse = [
      { format: 'dd', value: dateData.day },
      { format: 'MM', value: dateData.month },
      { format: 'yyyy', value: dateData.year },
      { format: 'YY', value: Math.floor(Number(dateData.year || 0) * 0.01) },
      { format: 'HH', value: dateData.hours },
      { format: 'mm', value: dateData.minutes },
      { format: 'ss', value: dateData.seconds },
      { format: 'DD', value: this.getDayOfTheWeekStr(date) },
      { format: 'Mm', value: this.getMonthName(date) }
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
  static formatStrDate(strDate: string, formatFrom: string, formatTo: string): string {
    const dateData = DatesUtils.getStrDateData(strDate, formatFrom)
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
   * @returns true if the dates represents both the exact same moment, false otherwise
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
   * JS Date consider that the first day of week is sunday with index 0, up to saturday with index 6
   * Restore day of week indexing from monday with index 0, up to sunday with index 6
   *
   * @param {number} dayOfWeek the day of week given by a Date object
   * @returns a recalibrated day of week indexing from monday with index 0, up to sunday with index 6
   */
  static getCalibratedDayOfWeek(dayOfWeek: number): number {
    if (dayOfWeek === 0) return 6
    return dayOfWeek - 1
  }

  static getDayOfTheWeekStr(date: Date): string {
    const dayOfTheWeek: number = this.getCalibratedDayOfWeek(date.getDay())
    switch (dayOfTheWeek) {
      case 0:
        return 'Lundi'
      case 1:
        return 'Mardi'
      case 2:
        return 'Mercredi'
      case 3:
        return 'Jeudi'
      case 4:
        return 'Vendredi'
      case 5:
        return 'Samedi'
      case 6:
        return 'Dimanche'
    }
    return ''
  }

  static getMonthName(date: Date): string {
    return date.toLocaleString('default', { month: 'long' })
  }

  static getTimeFromTimeStr(timeStr: string, format = 'HH:mm'): Date {
    let hours: number
    let minutes: number
    let seconds: number

    if (format === 'HH:mm:ss') {
      const timeComponents = timeStr.split(':').map(Number)
      hours = timeComponents[0]
      minutes = timeComponents[1]
      seconds = timeComponents[2]
    } else if (format === 'HH:mm') {
      const timeComponents = timeStr.split(':').map(Number)
      hours = timeComponents[0]
      minutes = timeComponents[1]
      seconds = 0
    } else {
      throw new Error('Invalid format. Supported formats are "HH:mm" and "HH:mm:ss"')
    }

    const date = new Date()
    date.setHours(hours)
    date.setMinutes(minutes)
    date.setSeconds(seconds)
    date.setMilliseconds(0)
    return date
  }

  static isTimeSameOrBefore(time1: Date, time2: Date): boolean {
    if (time1.getHours() < time2.getHours()) {
      return true
    } else if (time1.getHours() === time2.getHours()) {
      if (time1.getMinutes() <= time2.getMinutes()) {
        return true
      }
    }
    return false
  }

  static isTimeSameOrAfter(time1: Date, time2: Date): boolean {
    if (time1.getHours() > time2.getHours()) {
      return true
    } else if (time1.getHours() === time2.getHours()) {
      if (time1.getMinutes() >= time2.getMinutes()) {
        return true
      }
    }
    return false
  }
}

export default DatesUtils
