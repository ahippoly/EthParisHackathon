import { HttpException } from '@nestjs/common/exceptions'

/**
 * It is an abstract base class providing a structure for handling promise-based data.
 * It offers different methods to retrieve data, allowing to either throw an error, return null, or return
 * provided fallback data when the data is missing.
 * This class should be extended to create wrappers for specific data types.
 */
export abstract class AbstractDataWrapper<TData> {
  /**
   * Returns a promise that resolves to the requested data if there is, or else throws an error
   * @param error the error to throw if data was not found. defaults to `new NotFoundException('Ressource introuvable')`
   * @returns     a promise that will resolve to the requested data
   */
  public abstract getOrThrow(error?: string | HttpException): Promise<TData>

  /**
   * Returns a promise that resolves to the requested data if there is, or else to null
   * @returns a promise that will resolve to the requested data
   */
  public abstract getOrNull(): Promise<TData | null>

  /**
   * Returns a promise that resolves to the requested data if there is, or else to the provided fallback data
   * @returns a promise that will resolve to the requested data
   */
  public abstract getOr(fallbackData: TData): Promise<TData>
}
