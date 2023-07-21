declare global {
  interface IBuilder {
    build: <T>() => T
  }
}

export abstract class AbstactBuilder<T> implements IBuilder {
  abstract build(): T
}
