import { HttpException } from '@nestjs/common/exceptions'
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception'
import { ConvertPojoToInstance, TClassShape, TToInstanceOptions } from '../convert-pojo-to-instance.class'
import { AbstractDataWrapper } from './abstract-data-wrapper.abstract-class'

/**
 * It is a subclass of AbstractDataWrapper and is designed to work with classes or pojos to convert into class instances.
 * It provides a way to handle promise-based data retrieval for this type of data.
 * The main feature is to handle cases when the data might be absent, by either throwing an error, returning null,
 * or returning provided fallback data.
 *
 * Usage:
 * This class is typically used when you need to fetch pojos and cast it to class instances in a flexible and reliable manner.
 */
export class InstantiatingDataWrapper<
  TDataPromise extends Promise<TClass | TClass[]>,
  TClass extends object,
  TClassProto extends TClassConstructor<TClass> | undefined = undefined,
  TClassBlueprint extends TClass | undefined = undefined
> extends AbstractDataWrapper<TDataPromise> {
  constructor(private readonly data: TDataPromise, private readonly options?: TToInstanceOptions<TClass, TClassProto, TClassBlueprint>) {
    super()
  }

  /**
   * Returns a promise that resolves to the requested data if there is, or else throws an error
   * @param error the error to throw if data was not found. defaults to `new NotFoundException('Ressource introuvable')`
   * @returns     a promise that will resolve to the requested data
   */
  public async getOrThrow(error?: string | HttpException): Promise<TDataPromise> {
    const resolvedData = await this.data

    // if no resolved data, throw an error
    if (!resolvedData) throw error && typeof error !== 'string' ? error : new NotFoundException(error || 'Ressource introuvable')
    // else if options were provided,
    // it means that data is supposed to be an object or an array of objects
    // that must be turned into Class instance(s)
    if (this.options) return (await this.convertPojoToClassInstance(resolvedData as TClassShape<TClass, TClassBlueprint>)) as Awaited<TDataPromise>
    // else it means there is data and that's all that matters, so it's ok :thumbs-up:
    else return resolvedData
  }

  /**
   * Returns a promise that resolves to the requested data if there is, or else to null
   * @returns a promise that will resolve to the requested data
   */
  public async getOrNull(): Promise<TDataPromise | null> {
    const resolvedData = await this.data
    if (!resolvedData) return null
    // else if options were provided,
    // it means that data is supposed to be an object or an array of objects
    // that must be turned into Class instance(s)
    if (this.options) return (await this.convertPojoToClassInstance(resolvedData as TClassShape<TClass, TClassBlueprint>)) as Awaited<TDataPromise>
    // else it means there is data and that's all that matters, so it's ok :thumbs-up:
    else return resolvedData
  }

  public async getOr(fallbackData: Awaited<TDataPromise>): Promise<TDataPromise> {
    const resolvedData = await this.data
    if (!resolvedData) return fallbackData
    // else it means there is data and that's all that matters, so it's ok :thumbs-up:
    if (this.options) return (await this.convertPojoToClassInstance(resolvedData as TClassShape<TClass, TClassBlueprint>)) as Awaited<TDataPromise>
    else return resolvedData
  }

  static fromData<
    TSDataPromise extends Promise<TSData | TSData[]>,
    TSData extends object,
    TSClassProto extends TClassConstructor<TSData> | undefined = undefined,
    TSObjectBlueprint extends TSData | undefined = undefined
  >(
    data: TSDataPromise,
    options?: TToInstanceOptions<TSData, TSClassProto, TSObjectBlueprint>
  ): InstantiatingDataWrapper<TSDataPromise, TSData, TSClassProto, TSObjectBlueprint> {
    return new InstantiatingDataWrapper(data, options)
  }

  private async convertPojoToClassInstance(resolvedData: TClassShape<TClass, TClassBlueprint> | null): Promise<TClass | null> {
    if (typeof resolvedData !== 'object') throw new TypeError('Cannot convert non-object value to a class instance')

    if (!resolvedData || !this.options) return null

    return ConvertPojoToInstance.convertOne(resolvedData, this.options)
  }
}
