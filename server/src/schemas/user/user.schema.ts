import { modelOptions, prop, Severity } from '@typegoose/typegoose'
import { TimestampedDBDocument } from '@/schemas/db-document.abstract-schema'
import { Exclude, Expose, Type } from 'class-transformer'
import { TUserProfile, UserProfile } from './pojos/user-profile'
import { UserSearch } from './pojos/user-search'

@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { timestamps: true } })
export class User extends TimestampedDBDocument {
  /* eslint-disable prettier/prettier */
  @prop({ required: true, _id: false })   @Exclude()                                              protected _idMask: string
  @prop({ required: true, _id: false })   @Expose({ name: 'xmtpPublicAddress' })                  protected _xmtpPublicAddress: string
  @prop({ required: true, _id: false })   @Expose({ name: 'xmtpCryptedPrivateKey' })              protected _xmtpCryptedPrivateKey: string
  @prop({ required: true, _id: false })   @Expose({ name: 'name' })                               protected _name: string
  @prop({ required: true, _id: false })   @Expose({ name: 'description' })                        protected _description: string
  @prop({ required: true, _id: false })   @Expose({ name: 'goals' })                              protected _goals: string[]
  @prop({ required: false, _id: false })  @Expose({ name: 'profile' })  @Type(() => UserProfile)  protected _profile: UserProfile
  @prop({ required: false, _id: false })  @Expose({ name: 'search' })   @Type(() => UserSearch)   protected _search: UserSearch
  @prop({ required: true, _id: false })   @Expose({ name: 'openOnlyToThoseMatchingSearch' })      protected _openOnlyToThoseMatchingSearch: boolean
  @prop({ required: true, _id: false })   @Expose({ name: 'balance' })                            protected _balance: number
  @prop({ required: true, _id: false })   @Expose({ name: 'followers' })                          protected _followers: number
  /* eslint-enable prettier/prettier */

  /* >==== INIT ====> */
  /**
   * @deprecated You should use static {@link of} method.
   * This constructor is used by class-transformation to convert plain objects to instance.
   */
  constructor() {
    super()
  }

  public static of(
    idMask: string,
    xmtpPublicAddress: string,
    xmtpCryptedPrivateKey: string,
    name: string,
    description: string,
    goals: string[],
    profileData: TUserProfile,
    balance: number,
    followers: number
  ): User {
    const user = new User()

    user._idMask = idMask
    user._xmtpPublicAddress = xmtpPublicAddress
    user._xmtpCryptedPrivateKey = xmtpCryptedPrivateKey
    user._name = name
    user._description = description
    user._goals = goals
    user._balance = balance
    user._followers = followers

    const { country, langs, interests, skills } = profileData
    user._profile = UserProfile.of(country, langs, interests, skills)

    user._search = UserSearch.new()

    user._openOnlyToThoseMatchingSearch = true

    return user
  }

  public static new(idMask: string): User {
    const user = new User()

    user._idMask = idMask
    user._xmtpPublicAddress = ''
    user._xmtpCryptedPrivateKey = ''
    user._name = ''
    user._description = ''
    user._goals = []
    user._balance = 0
    user._followers = 0

    return user
  }
  /* <==== INIT ====< */

  /* >==== GETTERS && SETTERS ====> */
  /* eslint-disable prettier/prettier */
  public get idMask()                                                               : string        { return this._idMask                                                   }
  public set idMask(idMask: string)                                                                 { this._idMask = idMask                                                 }
  
  public get xmtpPublicAddress()                                                    : string        { return this._xmtpPublicAddress                                        }
  public set xmtpPublicAddress(xmtpPublicAddress: string)                                           { this._xmtpPublicAddress = xmtpPublicAddress                           }

  public get xmtpCryptedPrivateKey()                                                : string        { return this._xmtpCryptedPrivateKey                                    }
  public set xmtpCryptedPrivateKey(xmtpCryptedPrivateKey: string)                                   { this._xmtpCryptedPrivateKey = xmtpCryptedPrivateKey                   }

  public get name()                                                                 : string        { return this._name                                                     }
  public set name(name: string)                                                                     { this._name = name                                                     }

  public get description()                                                          : string        { return this._description                                              }
  public set description(description: string)                                                       { this._description = description                                       }

  public get goals()                                                                : string[]      { return this._goals                                                    }
  public set goals(goals: string[])                                                                 { this._goals = goals                                                   }

  
  public get profile()                                                              : UserProfile   { return this._profile                                                  }
  public set profile(profile: UserProfile)                                                          { this._profile = profile                                               }

  
  public get search()                                                               : UserSearch    { return this._search                                                   }
  public set search(search: UserSearch)                                                             { this._search = search                                                 }
  
  public get openOnlyToThoseMatchingSearch()                                        : boolean       { return this._openOnlyToThoseMatchingSearch                            }
  public set openOnlyToThoseMatchingSearch(openOnlyToThoseMatchingSearch: boolean)                  { this._openOnlyToThoseMatchingSearch = openOnlyToThoseMatchingSearch   }

  public get balance()                                        : number       { return this._balance                            }
  public set balance(balance: number)                  { this._balance = balance   }

  public get followers()                                        : number       { return this._followers                            }
  public set followers(followers: number)                  { this._followers = followers   }
  /* eslint-enable prettier/prettier */
}
