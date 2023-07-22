import { TTransformFunction, TTransformFunctionParams } from './base'
import { ObjectId } from 'mongoose'

export const objectIdToString: TTransformFunction<ObjectId, string> = (source: TTransformFunctionParams<ObjectId>): string => {
  return source.obj[source.key].toString()
}
