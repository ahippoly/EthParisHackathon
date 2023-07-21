class UsersUtils {
  static getUserColor(userId: string): RGBColor {
    const generateRandomNumber = useUtils().math.getSeededRandomNumberGenerator(userId)
    const red = Math.round(generateRandomNumber() * 205 + 50)
    const green = Math.round(generateRandomNumber() * 205 + 50)
    const blue = Math.round(generateRandomNumber() * 205 + 50)
    return { red, blue, green }
  }

  static getUserColorAsHex(userId: string): string {
    const color = UsersUtils.getUserColor(userId)
    return useUtils().types.RGBToHex(color)
  }

  static getComplementaryColor(color: RGBColor): string {
    const { red, green, blue } = color
    const complementaryRed = 255 - red
    const complementaryGreen = 255 - green
    const complementaryBlue = 255 - blue
    const complementaryColor = { red: complementaryRed, blue: complementaryBlue, green: complementaryGreen }
    return useUtils().types.RGBToHex(complementaryColor)
  }
}

export default UsersUtils
