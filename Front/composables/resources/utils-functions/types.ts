/* TYPES */

class TypesUtils {
  static isInt(n: number): boolean {
    return Number.isInteger(n)
  }

  static isFloat(n: number): boolean {
    return !TypesUtils.isInt(n)
  }

  static isBoolean(value: unknown): value is boolean {
    return value === true || value === false
  }

  static isNumber(value: unknown): value is number {
    return typeof value === 'number'
  }

  static isString(value: unknown): value is string {
    return typeof value === 'string'
  }

  static colorToHex(color: number): string {
    const hex = color.toString(16)
    return hex.length == 1 ? `0${hex}` : hex
  }

  static RGBToHex(color: RGBColor): string {
    return `#${TypesUtils.colorToHex(color.red)}${TypesUtils.colorToHex(color.green)}${TypesUtils.colorToHex(color.blue)}`
  }
}

export default TypesUtils
