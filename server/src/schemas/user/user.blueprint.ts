import { User } from '@Schemas/user/user.schema'

/**
 * [User](./user.schema.ts)
 *
 * Blueprints are used to ensure that the property names are well written when used within mongo's queries.
 * Those models must be kept up to date with their schema counterpart
 */
export abstract class UserBlueprint extends User {
  public _name: string
}
