/** @class Date */

import '@/extensions'
import { DaysOfWeek } from '@/common/enums/time'
import { DatesUtils } from '@/common/utils'

export enum DateTimeScopes {
  MILLISECONDS = 'ms',
  SECONDS = 's',
  MINUTES = 'm',
  HOURS = 'H',
  DAYS = 'd',
  MONTHS = 'M',
  YEARS = 'y',
}

export interface IDateComparisonOptions {
  precision?: DateTimeScopes
}

declare global {
  interface Date {
    /**
     * Returns the day of the week of the date as an enum value.
     * @returns {DaysOfWeek} The day of the week.
     */
    toDayOfWeek(): DaysOfWeek

    /**
     * Returns the UTC representation of the date.
     * @returns {Date} The UTC date.
     */
    toUTC(): Date

    /**
     * Check whether this date is equal to another date, according to the specified time precision
     *
     * @param {Date} other                     Date to compare to
     * @param {IDateComparisonOptions} options The options to use when comparing. Default precision is seconds
     *
     * @returns {number} a positive number if this date is later than the other date, a negative number if it is earlier, 0 if they are equal
     */
    isNotEqualTo(other: Date, options?: IDateComparisonOptions): number

    /**
     * Check whether this date is equal to another date, according to the specified time precision
     *
     * @param {Date} other                     Date to compare to
     * @param {IDateComparisonOptions} options The options to use when comparing.
     * Default precision is seconds
     *
     * @returns {boolean} a boolean value indicating whether the date is equal to the other or not
     */
    isEqualTo(other: Date, options?: IDateComparisonOptions): boolean

    /**
     * Check whether this date is before another date, according to the specified time precision
     *
     * @param {Date} other                     Date to compare to
     * @param {IDateComparisonOptions} options The options to use when comparing.
     * Default precision is seconds
     *
     * @returns {boolean} a boolean value indicating whether the date is before the other or not
     */
    isBefore(other: Date, options?: IDateComparisonOptions): boolean

    /**
     * Check whether this date is after another date, according to the specified time precision
     *
     * @param {Date} other                     Date to compare to
     * @param {IDateComparisonOptions} options The options to use when comparing.
     * Default precision is seconds
     *
     * @returns {boolean} a boolean value indicating whether the date is after the other or not
     */
    isAfter(other: Date, options?: IDateComparisonOptions): boolean

    /**
     * Check whether this date is after or equal to another date, according to the specified time precision
     *
     * @param {Date} other                     Date to compare to
     * @param {IDateComparisonOptions} options The options to use when comparing.
     * Default precision is seconds
     *
     * @returns {boolean} a boolean value indicating whether the date is after or equal to the other or not
     */
    isAfterOrEqual(other: Date, options?: IDateComparisonOptions): boolean

    /**
     * Check whether this date is before or equal to another date, according to the specified time precision
     *
     * @param {Date} other                     Date to compare to
     * @param {IDateComparisonOptions} options The options to use when comparing.
     * Default precision is seconds
     *
     * @returns {boolean} a boolean value indicating whether the date is before or equal to the other or not
     */
    isBeforeOrEqual(other: Date, options?: IDateComparisonOptions): boolean
  }

  interface DateConstructor {
    /**
     * Converts a date string to a UTC Date object.
     * @param {string} date   The date string.
     * @param {string} format The format of the date string.
     * The default format is 'dd/MM/yyyy HH:mm'.
     * @returns {Date | null} The UTC Date object, or null if the conversion fails.
     */
    asUTC(date: string, format?: string): Date | null
  }
}

function getDateDataPerTimeScopes(date: Date): Record<DateTimeScopes, number> {
  const data: Record<DateTimeScopes, number> = {
    [DateTimeScopes.YEARS]: date.getUTCFullYear(),
    [DateTimeScopes.MONTHS]: date.getUTCMonth(),
    [DateTimeScopes.DAYS]: date.getUTCDate(),
    [DateTimeScopes.HOURS]: date.getUTCHours(),
    [DateTimeScopes.MINUTES]: date.getUTCMinutes(),
    [DateTimeScopes.SECONDS]: date.getUTCSeconds(),
    [DateTimeScopes.MILLISECONDS]: date.getUTCMilliseconds(),
  }

  return data
}

Date.prototype.toDayOfWeek = function toDayOfWeek(): DaysOfWeek {
  return (this.toLocaleString('en-us', { weekday: 'long' }) as string).toUpperCase() as DaysOfWeek
}

Date.prototype.toUTC = function (): Date {
  return new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds()))
}

Date.prototype.isNotEqualTo = function (other: Date, options?: IDateComparisonOptions): number {
  const sortedTimeScopes = [
    DateTimeScopes.YEARS,
    DateTimeScopes.MONTHS,
    DateTimeScopes.DAYS,
    DateTimeScopes.HOURS,
    DateTimeScopes.MINUTES,
    DateTimeScopes.SECONDS,
    DateTimeScopes.MILLISECONDS,
  ]

  const selectedTimeScope = options?.precision || DateTimeScopes.SECONDS

  const thisData: Record<DateTimeScopes, number> = getDateDataPerTimeScopes(this)
  const otherData: Record<DateTimeScopes, number> = getDateDataPerTimeScopes(other)

  for (const scope of sortedTimeScopes) {
    if (thisData[scope] !== otherData[scope]) return thisData[scope] - otherData[scope]
    if (scope === selectedTimeScope) return 0
  }

  return 0
}

Date.prototype.isEqualTo = function (other: Date, options?: IDateComparisonOptions): boolean {
  return !this.isNotEqualTo(other, options)
}

Date.prototype.isBefore = function (other: Date, options?: IDateComparisonOptions): boolean {
  return this.isNotEqualTo(other, options) < 0
}

Date.prototype.isAfter = function (other: Date, options?: IDateComparisonOptions): boolean {
  return this.isNotEqualTo(other, options) > 0
}

Date.prototype.isBeforeOrEqual = function (other: Date, options?: IDateComparisonOptions): boolean {
  return this.isNotEqualTo(other, options) <= 0
}

Date.prototype.isAfterOrEqual = function (other: Date, options?: IDateComparisonOptions): boolean {
  return this.isNotEqualTo(other, options) >= 0
}

/* >==== STATIC METHODS ====> */

Date.asUTC = function (date: string, format = 'dd/MM/yyyy HH:mm'): Date | null {
  return DatesUtils.getUTCDateFromStr(date, format)
}

export {}
