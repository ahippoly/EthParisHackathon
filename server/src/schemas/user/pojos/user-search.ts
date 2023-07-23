import { Countries, Interests, Langs, Skills } from '@/common/enums/meta-datas'
import { prop } from '@typegoose/typegoose'
import { Expose } from 'class-transformer'

export class UserSearch {
  /* eslint-disable prettier/prettier */
  @prop({ required: false, _id: false })  @Expose({ name: 'minimumBalance' })   protected _minimumBalance: number | undefined
  @prop({ required: false, _id: false })  @Expose({ name: 'minimumFollowers' })   protected _minimumFollowers: number | undefined
  @prop({ required: false, _id: false })  @Expose({ name: 'country' })          protected _country: Countries | undefined
  @prop({ required: true, _id: false })   @Expose({ name: 'langs' })            protected _langs: Langs[]
  @prop({ required: true, _id: false })   @Expose({ name: 'interests' })        protected _interests: Interests[]
  @prop({ required: true, _id: false })   @Expose({ name: 'skills' })           protected _skills: Skills[]
  /* eslint-enable prettier/prettier */

  /* >==== INIT ====> */
  /**
   * @deprecated You should use static {@link of} method.
   * This constructor is used by class-transformation to convert plain objects to instance.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public static of(
    minimumBalance: number | undefined,
    country: Countries | undefined,
    langs: Langs[],
    interests: Interests[],
    skills: Skills[],
    minimumFollowers: number | undefined
  ): UserSearch {
    const search = new UserSearch()

    search._minimumBalance = minimumBalance
    search._country = country
    search._langs = langs
    search._interests = interests
    search._skills = skills
    search._minimumFollowers = minimumFollowers

    return search
  }

  public static new(): UserSearch {
    const search = new UserSearch()

    search._langs = []
    search._interests = []
    search._skills = []

    return search
  }
  /* <==== INIT ====< */

  /* >==== GETTERS && SETTERS ====> */
  /* eslint-disable prettier/prettier */
  public get minimumBalance()                                     : number | undefined      { return this._minimumBalance             }
  public set minimumBalance(minimumBalance: number | undefined)                             { this._minimumBalance = minimumBalance   }

  public get minimumFollowers()                                     : number | undefined      { return this._minimumFollowers             }
  public set minimumFollowers(minimumFollowers: number | undefined)                             { this._minimumFollowers = minimumFollowers   }

  public get country()                                            : Countries | undefined   { return this._country                    }
  public set country(country: Countries | undefined)                                        { this._country = country                 }
  
  public get langs()                                              : Langs[]                 { return this._langs                      }
  public set langs(langs: Langs[])                                                          { this._langs = langs                     }
  
  public get interests()                                          : Interests[]             { return this._interests                  }
  public set interests(interests: Interests[])                                              { this._interests = interests             }
  
  public get skills()                                             : Skills[]                { return this._skills                     }
  public set skills(skills: Skills[])                                                       { this._skills = skills                   }
  /* eslint-enable prettier/prettier */
}
