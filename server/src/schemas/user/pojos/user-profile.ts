import { Countries, Interests, Langs, Skills } from '@/common/enums/meta-datas'
import { prop } from '@typegoose/typegoose'
import { Expose } from 'class-transformer'

export type TUserProfile = { country: Countries; langs: Langs[]; interests: Interests[]; skills: Skills[] }
export class UserProfile {
  /* eslint-disable prettier/prettier */
  @prop({ required: true, _id: false }) @Expose({ name: 'country' })   protected _country: Countries
  @prop({ required: true, _id: false }) @Expose({ name: 'langs' })     protected _langs: Langs[]
  @prop({ required: true, _id: false }) @Expose({ name: 'interests' }) protected _interests: Interests[]
  @prop({ required: true, _id: false }) @Expose({ name: 'skills' })    protected _skills: Skills[]
  /* eslint-enable prettier/prettier */

  /* >==== INIT ====> */
  /**
   * @deprecated You should use static {@link of} method.
   * This constructor is used by class-transformation to convert plain objects to instance.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public static of(country: Countries, langs: Langs[], interests: Interests[], skills: Skills[]): UserProfile {
    const profile = new UserProfile()

    profile._country = country
    profile._langs = langs
    profile._interests = interests
    profile._skills = skills

    return profile
  }
  /* <==== INIT ====< */

  /* >==== GETTERS && SETTERS ====> */
  /* eslint-disable prettier/prettier */
  public get country()                           : Countries      { return this._country           }
  public set country(country: Countries)                          { this._country = country        }
  
  public get langs()                             : Langs[]        { return this._langs             }
  public set langs(langs: Langs[])                                { this._langs = langs            }
  
  public get interests()                         : Interests[]    { return this._interests         }
  public set interests(interests: Interests[])                    { this._interests = interests    }
  
  public get skills()                            : Skills[]       { return this._skills            }
  public set skills(skills: Skills[])                             { this._skills = skills          }
  /* eslint-enable prettier/prettier */
}
