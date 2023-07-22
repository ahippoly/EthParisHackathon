declare global {
  interface Array<T> {
    /**
     * Get the minimum value of an array
     * @param callback The callback to use to compare the values.
     * (Optional)
     * @returns        The minimum value of the array
     * @throws         An error if the array contains NaN and no callback is provided
     */
    min(callback?: (entry1: T, entry2: T) => number): T | null

    /**
     * Get the maximum value of an array
     * @param callback The callback to use to compare the values
     * @returns        The maximum value of the array
     * @throws         An error if the array contains NaN and no callback is provided
     */
    max(callback?: (entry1: T, entry2: T) => number): T | null

    /**
     * Return a new array without the entries matching the callback
     * @param callback The callback to use to remove the entries
     * @returns         The array without the removed entries
     */
    remove(callback: (entry: T) => boolean): Array<T>

    /**
     * Remove the entries matching the callback from the array
     * @param callback The callback to use to remove the entry
     * @returns        The array without the removed entry
     * @throws         An error if the entry is not found
     */
    removeInPlace(callback: (entry: T) => boolean): Array<T>

    /**
     * Create a deep copy of an array
     * @returns The copied array
     */
    copy<U extends T = T>(): Array<U>

    /**
     * Returns a duplicate-free copy of the original array
     *
     * @returns the copy of the original array
     */
    removeDuplicates(): Array<T>

    /**
     * Find the first entry of the array that is not in the given enum
     * @param enumType  The enum to check
     * @returns         The first entry of the array that is not in the given enum,
     * or null if all the entries are in the enum
     */
    findNotInEnum<U extends object>(enumType: U): T | null
  }
}

/* ==== MIN ==== */
Array.prototype.min = function <T>(callback?: (entry1: T, entry2: T) => number): T | null {
  if (!this.length) return null

  const baseCallback = (entry1: T, entry2: T): number => {
    if (typeof entry1 !== 'number' || typeof entry2 !== 'number')
      throw new Error('You cannot call min() on an array of NaN without providing a custom callback')

    return entry1 - entry2
  }

  callback = callback || baseCallback

  let currentMin = this[0]
  for (const entry of this) {
    if (callback(currentMin, entry) > 0) currentMin = entry
  }

  return currentMin
}

/* ==== MAX ==== */
Array.prototype.max = function <T>(callback?: (entry1: T, entry2: T) => number): T | null {
  if (!this.length) return null

  const baseCallback = (entry1: T, entry2: T): number => {
    if (typeof entry1 !== 'number' || typeof entry2 !== 'number')
      throw new Error('You cannot call max() on an array of NaN without providing a custom callback')

    return entry1 - entry2
  }

  callback = callback || baseCallback

  let currentMax = this[0]
  for (const entry of this) {
    if (callback(currentMax, entry) < 0) currentMax = entry
  }

  return currentMax
}

/* ==== REMOVE ==== */
Array.prototype.remove = function <T>(callback: (entry: T) => boolean): Array<T> {
  return this.filter(callback)
}

/* ==== REMOVE IN PLACE ==== */
Array.prototype.removeInPlace = function <T>(callback: (entry: T) => boolean): T[] {
  const index = this.findIndex(callback)

  if (index < 0) return []

  return this.splice(index, 1)
}

/* ==== COPY ==== */
Array.prototype.copy = function <T>(): Array<T> {
  return JSON.parse(JSON.stringify(this)) as T[]
}

/* ==== REMOVE DUPLICATES ==== */
Array.prototype.removeDuplicates = function <T>(): Array<T> {
  return this.filter((element, index) => this.indexOf(element) === index)
}

/* ==== VERIFY ENUM MEMBERSHIP ==== */
Array.prototype.findNotInEnum = function <T extends object>(enumType: T): T | null {
  for (const item of this) {
    if (!Object.values(enumType).includes(item)) {
      return item
    }
  }

  return null
}

export {}
