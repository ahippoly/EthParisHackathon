import { HttpException } from '@nestjs/common/exceptions'
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception'
import { AbstractDataWrapper } from './abstract-data-wrapper.abstract-class'

/**
 * It is a subclass of AbstractDataWrapper and is designed to work with data.
 * It provides a way to handle promise-based data retrieval for a primitive data.
 * The main feature is to handle cases when the data might be absent, by either throwing an error, returning null,
 * or returning provided fallback data.
 *
 * Usage:
 * This class is typically used when you need to fetch a primitive data in a flexible and reliable manner.
 */
export class DataWrapper<TData extends Promise<unknown>> extends AbstractDataWrapper<TData> {
  constructor(private readonly data: TData) {
    super()
  }

  /**
   * Returns a promise that resolves to the requested data if there is, or else throws an error
   * @param error the error to throw if data was not found. defaults to `new NotFoundException('Ressource introuvable')`
   * @returns     a promise that will resolve to the requested data
   */
  public async getOrThrow(error?: string | HttpException): Promise<TData> {
    const resolvedData = (await this.data) as TData | null

    // if no resolved data, throw an error
    if (!resolvedData) throw error && typeof error !== 'string' ? error : new NotFoundException(error || 'Ressource introuvable')
    // else it means there is data and that's all that matters, so it's ok :thumbs-up:
    else return resolvedData
  }

  /**
   * Returns a promise that resolves to the requested data if there is, or else to null
   * @returns a promise that will resolve to the requested data
   */
  public async getOrNull(): Promise<TData | null> {
    const resolvedData = await this.data
    if (!resolvedData) return null
    // else it means there is data and that's all that matters, so it's ok :thumbs-up:
    else return resolvedData
  }

  public async getOr(fallbackData: Awaited<TData>): Promise<TData> {
    const resolvedData = await this.data
    if (!resolvedData) return fallbackData
    else return resolvedData
  }

  static fromData<TStaticData extends Promise<unknown>>(data: TStaticData): DataWrapper<TStaticData> {
    return new DataWrapper(data)
  }
}
