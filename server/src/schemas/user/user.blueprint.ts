import { User } from '@Schemas/user/user.schema'
import { UserProfile } from './pojos/user-profile'
import { UserSearch } from './pojos/user-search'

/**
 * [User](./user.schema.ts)
 *
 * Blueprints are used to ensure that the property names are well written when used within mongo's queries.
 * Those models must be kept up to date with their schema counterpart
 */
export abstract class UserBlueprint extends User {
  public _idMask: string
  public _xmtpPublicAddress: string
  public _xmtpCryptedPrivateKey: string
  public _name: string
  public _description: string
  public _goals: string[]
  public _profile: UserProfile
  public _search: UserSearch
  public _openOnlyToThoseMatchingSearch: boolean
  public _balance: number
  public _followers: number
}
