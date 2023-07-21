class TimesUtils {
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
export default TimesUtils
