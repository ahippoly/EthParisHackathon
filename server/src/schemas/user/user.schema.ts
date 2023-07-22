import { modelOptions, Severity } from '@typegoose/typegoose'
import { SoftDeletableDBDocument } from '@/schemas/db-document.abstract-schema'
import { BadRequestException } from '@nestjs/common/exceptions'

@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { timestamps: true } })
export class User extends SoftDeletableDBDocument {
  protected _name: string

  /* >==== INIT ====> */
  /**
   * @deprecated You should use static {@link of} method.
   * This constructor is used by class-transformation to convert plain objects to instance.
   */
  constructor() {
    super()
  }

  public static of(name: string): User {
    const user = new User()
    user.initialize(name)

    return user
  }

  protected initialize(name: string): void {
    User.validateInputs(name)
  }

  private static validateInputs(name: string): void {
    /* eslint-disable prettier/prettier */
    if (!name) throw new BadRequestException("User's name cannot be undefined")
    /* eslint-enable prettier/prettier */
  }
  /* <==== INIT ====< */

  /* >==== GETTERS && SETTERS ====> */
  /* eslint-disable prettier/prettier */
  public get name()                                                     : string                          { return this._name                       }
  public set name(name: string)                                                                           { this._name = name                       }
  /* eslint-enable prettier/prettier */
}
