class MathUtils {
  static generateSeed(seed: string): number {
    let hash = 1779033703 ^ seed.length
    for (let i = 0; i < seed.length; i++) {
      const bitwise_xor_from_character = hash ^ seed.charCodeAt(i)
      hash = Math.imul(bitwise_xor_from_character, 3432918353)
      hash = (hash << 13) | (hash >>> 19)
    }

    // Return the hash that you can use as a seed
    hash = Math.imul(hash ^ (hash >>> 16), 2246822507)
    hash = Math.imul(hash ^ (hash >>> 13), 3266489909)

    return (hash ^= hash >>> 16) >>> 0
  }

  static getSeededRandomNumberGenerator(seed: string): () => number {
    let formattedSeed = MathUtils.generateSeed(seed)
    return () => {
      let for_bit32_mul: number = (formattedSeed += 0x6d2b79f5)
      const cast32_one = for_bit32_mul ^ (for_bit32_mul >>> 15)
      const cast32_two = for_bit32_mul | 1
      for_bit32_mul = Math.imul(cast32_one, cast32_two)
      for_bit32_mul ^= for_bit32_mul + Math.imul(for_bit32_mul ^ (for_bit32_mul >>> 7), for_bit32_mul | 61)
      return ((for_bit32_mul ^ (for_bit32_mul >>> 14)) >>> 0) / 4294967296
    }
  }
}

export default MathUtils
