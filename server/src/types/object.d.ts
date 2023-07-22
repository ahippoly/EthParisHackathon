export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/ban-types
  type TClassConstructor<T extends object = object> = new () => T

  type TPropertiesOf<T extends object> = Array<
    keyof T | { [K in keyof T]?: T[K] extends object | undefined ? TPropertiesOf<NonNullable<T[K]>> : never }
  >

  type TPojoOf<T extends object> = { [K in keyof T]?: T[K] }
}
