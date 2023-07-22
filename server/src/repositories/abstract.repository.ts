import { DBDocument, SoftDeletableDBDocument, SoftDeletableDBDocumentBlueprint } from '@Schemas/db-document.abstract-schema'
import { ReturnModelType } from '@typegoose/typegoose'
import { InstantiatingDataWrapper, TToInstanceOptions } from '@Common/classes'
import mongoose from 'mongoose'
import { Repository } from '@/repositories/repository'
import { InternalServerErrorException } from '@nestjs/common/exceptions'

export abstract class AbstractBaseRepository<TSchema extends DBDocument, TBlueprint extends TSchema> implements Repository<TSchema, TBlueprint> {
  protected constructor(
    protected readonly model: ReturnModelType<TClassConstructor<TSchema>>,
    protected readonly options?: TToInstanceOptions<TSchema, TClassConstructor<TSchema>, TBlueprint>
  ) {}

  public async create(instance: TSchema): Promise<TSchema> {
    const savedDocument = await new this.model(instance).save()
    return await this.findById(savedDocument._id).getOrThrow(new InternalServerErrorException())
  }

  public async createMany(instances: TSchema[]): Promise<TSchema[]> {
    return (await this.model.insertMany(instances)) as TSchema[]
  }

  public async delete(id: string): Promise<boolean> {
    return !!(await this.model.deleteOne({ _id: id })).deletedCount
  }

  public async deleteList(ids: string[]): Promise<string[]> {
    const notDeletedInstances: string[] = []

    for (const id of ids) {
      if (!(await this.delete(id))) notDeletedInstances.push(id)
    }

    return notDeletedInstances
  }

  public async deleteMany(query: TMongoDeleteQuery<TBlueprint>): Promise<number> {
    return ((await this.model.deleteMany(query.filter, query.options)) as unknown as TMongoDeleteResult).deletedCount
  }

  public findAll(): InstantiatingDataWrapper<Promise<TSchema[]>, TSchema, TClassConstructor<TSchema>, TBlueprint> {
    const data = this.model.find().lean().exec()

    return InstantiatingDataWrapper.fromData(data, this.options)
  }

  public findBy(
    query: TDocumentMongoFilterQuery<TBlueprint>
  ): InstantiatingDataWrapper<Promise<TSchema>, TSchema, TClassConstructor<TSchema>, TBlueprint> {
    const data = this.model
      .findOne({ ...query })
      .lean()
      .exec() as Promise<TSchema>

    return InstantiatingDataWrapper.fromData(data, this.options)
  }

  public findById(id: string | mongoose.Types.ObjectId): InstantiatingDataWrapper<Promise<TSchema>, TSchema, TClassConstructor<TSchema>, TBlueprint> {
    const data = this.model.findById(id).lean().exec() as Promise<TSchema>

    return InstantiatingDataWrapper.fromData(data, this.options)
  }

  public findList(ids: string[]): InstantiatingDataWrapper<Promise<TSchema[]>, TSchema, TClassConstructor<TSchema>, TBlueprint> {
    const data = this.model
      .find({ _id: { $in: ids } })
      .lean()
      .exec()

    return InstantiatingDataWrapper.fromData(data, this.options)
  }

  public findMany(
    query: TDocumentMongoFilterQuery<TBlueprint>
  ): InstantiatingDataWrapper<Promise<TSchema[]>, TSchema, TClassConstructor<TSchema>, TBlueprint> {
    const data = this.model
      .find({ ...query })
      .lean()
      .exec() as Promise<TSchema[]>

    return InstantiatingDataWrapper.fromData(data, this.options)
  }

  public async update(query: TMongoQuery<TBlueprint>): Promise<boolean> {
    const updateResult: TMongoUpdateResult = (await this.model
      .updateOne(query.filter, query.update, query.options)
      .lean()
      .exec()) as unknown as TMongoUpdateResult

    return !!updateResult.modifiedCount
  }

  public async updateAsIs(instance: TSchema): Promise<boolean> {
    const updateResult: TMongoUpdateResult = (await this.model
      .updateOne({ _id: instance._id }, instance)
      .lean()
      .exec()) as unknown as TMongoUpdateResult

    return !!updateResult.modifiedCount
  }

  public async updateMany(query: TMongoQuery<TBlueprint>): Promise<number> {
    return ((await this.model.updateMany(query.filter, query.update, query.options).lean().exec()) as unknown as TMongoUpdateResult).modifiedCount
  }
}

export class AbstractSoftDeletableRepository<TSchema extends SoftDeletableDBDocument, TBlueprint extends TSchema> extends AbstractBaseRepository<
  TSchema,
  TBlueprint
> {
  protected static ACTIVE_FILTER = { _deletedAt: { $exists: false } }

  public findActiveById(id: string): InstantiatingDataWrapper<Promise<TSchema>, TSchema, TClassConstructor<TSchema>, TBlueprint> {
    const query: TDocumentMongoFilterQuery<SoftDeletableDBDocumentBlueprint> = { _id: id, ...AbstractSoftDeletableRepository.ACTIVE_FILTER }
    return this.findBy(query as TDocumentMongoFilterQuery<TBlueprint>)
  }
  public findAllActives(): InstantiatingDataWrapper<Promise<TSchema[]>, TSchema, TClassConstructor<TSchema>, TBlueprint> {
    const query: TDocumentMongoFilterQuery<SoftDeletableDBDocumentBlueprint> = { ...AbstractSoftDeletableRepository.ACTIVE_FILTER }
    return this.findManyActiveBy(query as TDocumentMongoFilterQuery<TBlueprint>)
  }

  public findActiveBy(
    query: TDocumentMongoFilterQuery<TBlueprint>
  ): InstantiatingDataWrapper<Promise<TSchema>, TSchema, TClassConstructor<TSchema>, TBlueprint> {
    return this.findBy({ ...AbstractSoftDeletableRepository.ACTIVE_FILTER, ...query })
  }

  public findManyActiveBy(
    query: TDocumentMongoFilterQuery<TBlueprint>
  ): InstantiatingDataWrapper<Promise<TSchema[]>, TSchema, TClassConstructor<TSchema>, TBlueprint> {
    return this.findMany({ ...AbstractSoftDeletableRepository.ACTIVE_FILTER, ...query })
  }
}
