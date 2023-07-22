import * as mongoose from 'mongoose'
import { FilterQuery, QueryOptions, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose'
import { DocumentType } from '@typegoose/typegoose'
import { DBDocument } from '@Schemas/db-document.abstract-schema'

export {}

declare global {
  /* >==== MONGO FILTER QUERIES ====> */
  interface IMongoFilterQueryConditions<T> {
    $ne: T
    $eq: T
    $gt: number | T
    $gte: number | T
    $lt: number | T
    $lte: number | T
    $in: T[]
    $nin: T[]
    $all: T
    $size: number
    $exists: boolean
    $type: string
  }

  /* eslint-disable prettier/prettier */
  type TPrimaryMongoFilterQuery<T extends number | string | boolean> = Partial<IMongoFilterQueryConditions<T>>
  type TObjectMongoFilterQuery<T extends object> = { [TProp in keyof T]?: T[TProp] | Partial<IMongoFilterQueryConditions<T[TProp]>> }

  type TIdQuery = string | mongoose.Types.ObjectId | Partial<IMongoFilterQueryConditions<string | mongoose.Types.ObjectId>>
  type TStrictDocumentMongoFilterQuery<T extends DBDocument> = { [TProp in keyof T]?: TProp extends '_id' ? TIdQuery : T[TProp] | Partial<IMongoFilterQueryConditions<T[TProp]>> }
  type TDocumentMongoFilterQuery<T extends DBDocument> = TStrictDocumentMongoFilterQuery<T> & Record<string, unknown>

  type TMongoFilterQuery<T> = T extends DBDocument
    ? TDocumentMongoFilterQuery<T>
    : T extends object
      ? TObjectMongoFilterQuery<T>
      : TPrimaryMongoFilterQuery<T>
  /* eslint-enable prettier/prettier */

  /* >==== MONGO UPDATE QUERY ====> */
  type TMongoUpdateQuery<T> = {
    $currentDate?: Record<string, unknown>
    $inc?: Record<string, unknown>
    $min?: Record<string, unknown>
    $max?: Record<string, unknown>
    $mul?: Record<string, unknown>
    $rename?: Record<string, string>
    $set?: Partial<{ [key in keyof T]: T[key] }> & Record<string, unknown>
    $setOnInsert?: Record<string, unknown>
    $unset?: Partial<{ [key in keyof T]: T[key] }> & Record<string, unknown>
    $addToSet?: Record<string, unknown>
    $pop?: Record<string, unknown>
    $pull?: Record<string, unknown>
    $push?: Record<string, unknown>
    $pullAll?: Record<string, unknown>
    $bit?: Partial<T>
  }

  /* >==== MONGO QUERY OPTIONS  ====> */
  type TMongoQueryOptions = {
    arrayFilters: Record<string, unknown>[]
  } & Record<string, unknown>

  /* >==== MONGO QUERY  ====> */
  type TMongoQuery<T = unknown> = {
    filter: FilterQuery<T>
    update: UpdateQuery<DocumentType<T>> | UpdateWithAggregationPipeline
    options?: QueryOptions
  }

  /* >==== MONGO DELETE QUERY  ====> */
  type TMongoDeleteQuery<T = unknown> = { filter: TMongoFilterQuery<T>; options?: TMongoFilterQueryOptions }

  type TMongoUpdateResult = { aknowledged: boolean; modifiedCount: number }
  type TMongoDeleteResult = { aknowledged: boolean; deletedCount: number }
}
