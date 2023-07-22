import { plainToInstance } from 'class-transformer'

/**
 * Represents a utility class providing static methods to convert plain JavaScript objects (POJOs)
 * into instances of a specified class.
 * It's used to handle data returned from sources like databases or APIs, where data is typically in plain object form
 * but needs to be worked with as instances of certain classes for
 * added functionalities (like methods or getters/setters).
 *
 * Usage:
 * This class is used whenever you need to convert a plain object
 * or an array of plain objects into instances of a class.
 */
export class ConvertPojoToInstance {
  /**
   * Convert a plain object or an array of plain objects into instances of a specified class.
   *
   * @param plainObject A plain object or an array of plain objects to convert.
   * @param parameters  Parameters specifying the class to convert to and optional properties to omit during conversion.
   * @returns           An instance of the specified class or an array of instances if an array was provided.
   *
   * @example
   * const userPojo = { name: "Alice", age: 20 };
   * const user = ConvertPojoToInstance.convert(userPojo, { targetClass: User });
   */
  public static convert<
    TClass extends object,
    TClassProto extends TClassConstructor<TClass> | undefined = undefined,
    TClassBlueprint extends TClass | undefined = undefined
  >(
    plainObject: RecursivePartial<TClassShape<TClass, TClassBlueprint>> | RecursivePartial<TClassShape<TClass, TClassBlueprint>>[],
    parameters: TToInstanceOptions<TClass, TClassProto, TClassBlueprint>
  ): TClass | TClass[] {
    if (Array.isArray(plainObject)) return ConvertPojoToInstance.convertArray(plainObject, parameters)
    else return ConvertPojoToInstance.convertOne(plainObject, parameters)
  }

  /**
   * Convert an array of plain objects into instances of a specified class.
   *
   * @param plainObjects An array of plain objects to convert.
   * @param parameters   Parameters specifying the class to convert to and optional properties to omit during conversion.
   * @returns            An array of instances of the specified class.
   *
   * @example
   * const usersPojo = [{ name: "Alice", age: 20 }, { name: "Bob", age: 25 }];
   * const users = ConvertPojoToInstance.convertArray(usersPojo, { targetClass: User });
   */
  public static convertArray<
    TClass extends object,
    TClassProto extends TClassConstructor<TClass> | undefined = undefined,
    TClassBlueprint extends TClass | undefined = undefined
  >(
    plainObjects: Array<RecursivePartial<TClassShape<TClass, TClassBlueprint>>>,
    parameters: TToInstanceOptions<TClass, TClassProto, TClassBlueprint>
  ): TClass[] {
    return plainObjects.map((pojo) => ConvertPojoToInstance.convertOne(pojo, parameters))
  }

  /**
   * Convert a single plain object into an instance of a specified class.
   *
   * @param plainObject A plain object to convert.
   * @param parameters  Parameters specifying the class to convert to and optional properties to omit during conversion.
   * @returns           An instance of the specified class.
   *
   * @example
   * const userPojo = { name: "Alice", age: 20 };
   * const user = ConvertPojoToInstance.convertOne(userPojo, { targetClass: User });
   */
  public static convertOne<
    TClass extends object,
    TClassProto extends TClassConstructor<TClass> | undefined = undefined,
    TClassBlueprint extends TClass | undefined = undefined
  >(
    plainObject: RecursivePartial<TClassShape<TClass, TClassBlueprint>>,
    parameters: TToInstanceOptions<TClass, TClassProto, TClassBlueprint>
  ): TClass {
    if (plainObject && parameters.propertiesToOmit?.length) ConvertPojoToInstance.deletePropertyRecursively(plainObject, parameters.propertiesToOmit)

    const instance = plainToInstance(parameters.targetClass, plainObject, { ignoreDecorators: true })

    return instance as TClass
  }

  /**
   * Recursively delete specified properties from a source object.
   *
   * @param sourceObject     The source object to delete properties from.
   * @param propertiesToOmit An array of property names to delete.
   *
   * Note: This method is private and used internally by the `convert` and `convertOne` methods.
   */
  private static deletePropertyRecursively<RecursiveT extends object>(sourceObject: RecursiveT, propertiesToOmit: TPropertiesOf<RecursiveT>): void {
    if (!sourceObject) return

    propertiesToOmit.forEach((propertyToOmit) => {
      // if type is string, it means that it's the name of the property to delete
      if (typeof propertyToOmit === 'string') delete sourceObject[propertyToOmit]
      // else it means that we want to delete a nested property
      else if (typeof propertyToOmit === 'object') {
        // and propertyToOmit's type is = { [propertyName]: TPropertiesOf<sourceObject[propertyName]> }
        for (const nestedProperty in propertyToOmit) {
          ConvertPojoToInstance.deletePropertyRecursively(sourceObject[nestedProperty] as object, propertyToOmit[nestedProperty as string])
        }
      }
    })
  }
}

export type TClassShape<TClass extends object, TClassBlueprint extends TClass | undefined = undefined> = TClassBlueprint extends undefined
  ? TClass
  : TClassBlueprint

export type TToInstanceOptions<
  TClass extends object,
  TClassProto extends TClassConstructor<TClass> | undefined = undefined,
  TClassBlueprint extends TClass | undefined = undefined
> = {
  targetClass: TClassProto extends TClassConstructor<TClass> ? TClassProto : TClassConstructor<TClass>
  propertiesToOmit?: TPropertiesOf<RecursivePartial<TClassShape<TClass, TClassBlueprint>>>
}
