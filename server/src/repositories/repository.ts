import * as mongoose from 'mongoose'
import { DBDocument } from '@/schemas/db-document.abstract-schema'
import { InstantiatingDataWrapper } from '@Common/classes'

export interface Repository<TSchema extends DBDocument, TBlueprint extends TSchema> {
  findById(id: string | mongoose.Types.ObjectId): InstantiatingDataWrapper<Promise<TSchema>, TSchema>

  findBy(query: TDocumentMongoFilterQuery<TBlueprint>): InstantiatingDataWrapper<Promise<TSchema>, TSchema>

  findMany(query: TDocumentMongoFilterQuery<TBlueprint>): InstantiatingDataWrapper<Promise<TSchema[]>, TSchema>

  findList(ids: string[]): InstantiatingDataWrapper<Promise<TSchema[]>, TSchema>

  findAll(): InstantiatingDataWrapper<Promise<TSchema[]>, TSchema>

  updateAsIs(instance: TSchema): Promise<boolean>

  update(query: TMongoQuery<TBlueprint>): Promise<boolean>

  updateMany(query: TMongoQuery<TBlueprint>): Promise<number>

  create(instance: TSchema): Promise<TSchema>

  createMany(instances: TSchema[]): Promise<TSchema[]>

  delete(id: string): Promise<boolean>

  deleteMany(query: TMongoDeleteQuery<TBlueprint>): Promise<number>

  deleteList(ids: string[]): Promise<string[]>
}
