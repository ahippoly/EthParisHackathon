declare global {
  interface ObjectConstructor {
    /**
     * Check if the value is defined (not null and not undefined)
     * @param value The value to check
     */
    isDefined<T>(value: T | undefined | null): value is T

    /**
     * Create a pojo by reflection
     *
     * @param properties The properties to set
     */
    createPojoByReflection<T extends object>(properties: TPojoOf<T>): T

    /**
     * Create a class by reflection
     *
     * @param classToReflect The class to reflect
     * @param properties     The properties to set
     */
    initClassByReflection<T extends object, TBlueprint extends T | undefined = undefined>(
      classToReflect: TClassConstructor<T>,
      properties: Partial<TBlueprint extends undefined ? TPojoOf<T> : TBlueprint extends T ? TPojoOf<TBlueprint> : never>
    ): T

    /**
     * Create a class by reflection
     * @param classToReflect The class to reflect
     * @param properties     The properties to set
     */
    initStrictlyClassByReflection<T extends object, TBlueprint extends T | undefined = undefined>(
      classToReflect: TClassConstructor<T>,
      properties: TBlueprint extends undefined ? TPojoOf<T> : TBlueprint extends T ? TPojoOf<TBlueprint> : never
    ): T
  }
}

Object.isDefined = function <T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}

Object.createPojoByReflection = function <T extends object>(properties: TPojoOf<T>): T {
  const pojo: Record<string, unknown> = {}

  Object.keys(properties).forEach((key) => Reflect.defineProperty(pojo, key, { value: properties[key], enumerable: true, writable: true }))

  return pojo as T
}

Object.initClassByReflection = function <T extends object, TBlueprint extends T | undefined = undefined>(
  classToReflect: TClassConstructor<T>,
  properties: Partial<TBlueprint extends undefined ? TPojoOf<T> : TBlueprint extends T ? TPojoOf<TBlueprint> : never>
): T {
  const instance = Reflect.construct(classToReflect, [])

  Object.keys(properties).forEach((key) => Reflect.defineProperty(instance, key, { value: properties[key], enumerable: true, writable: true }))

  return instance
}

Object.initStrictlyClassByReflection = function <T extends object, TBlueprint extends T | undefined = undefined>(
  classToReflect: TClassConstructor<T>,
  properties: TBlueprint extends undefined ? TPojoOf<T> : TBlueprint extends T ? TPojoOf<TBlueprint> : never
): T {
  return Object.initClassByReflection(classToReflect, properties)
}

export {}
