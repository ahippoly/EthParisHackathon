import { prop } from '@typegoose/typegoose'
import { Expose } from 'class-transformer'

export class UserProfile {
  /* eslint-disable prettier/prettier */
  @prop({ required: true, _id: false }) @Expose({ name: 'country' })   protected _country: string
  @prop({ required: true, _id: false }) @Expose({ name: 'langs' })     protected _langs: string[]
  @prop({ required: true, _id: false }) @Expose({ name: 'interests' }) protected _interests: string[]
  @prop({ required: true, _id: false }) @Expose({ name: 'skills' })    protected _skills: string[]
  /* eslint-enable prettier/prettier */

  /* >==== INIT ====> */
  /**
   * @deprecated You should use static {@link of} method.
   * This constructor is used by class-transformation to convert plain objects to instance.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public static of(country: string, langs: string[], interests: string[], skills: string[]): UserProfile {
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
  public get country()                           : string      { return this._country           }
  public set country(country: string)                          { this._country = country        }
  
  public get langs()                             : string[]    { return this._langs             }
  public set langs(langs: string[])                            { this._langs = langs            }
  
  public get interests()                         : string[]    { return this._interests         }
  public set interests(interests: string[])                    { this._interests = interests    }
  
  public get skills()                            : string[]    { return this._skills            }
  public set skills(skills: string[])                          { this._skills = skills          }
  /* eslint-enable prettier/prettier */
}
