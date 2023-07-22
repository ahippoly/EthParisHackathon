export type TTransformFunctionParams<T> = { value: T; key: string; obj: object }
export type TTransformFunction<TIn, TOut> = (source: TTransformFunctionParams<TIn>) => TOut
