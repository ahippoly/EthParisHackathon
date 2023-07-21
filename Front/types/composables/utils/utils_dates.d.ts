export {}

declare global {
  type DateDelimiter = 'yyyy' | 'MM' | 'dd' | 'HH' | 'mm' | 'ss'

  type DateDataProperties = 'year' | 'month' | 'day' | 'hours' | 'minutes' | 'seconds'

  type DateParsingData =
    | { label: 'year'; delimiter: 'yyyy' }
    | { label: 'month'; delimiter: 'MM' }
    | { label: 'day'; delimiter: 'dd' }
    | { label: 'hours'; delimiter: 'HH' }
    | { label: 'minutes'; delimiter: 'mm' }
    | { label: 'seconds'; delimiter: 'ss' }

  interface DateData {
    year?: string | number
    month?: string | number
    day?: string | number
    hours?: string | number
    minutes?: string | number
    seconds?: string | number
    year?: string | number
  }
}
