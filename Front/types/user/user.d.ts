import { Countries } from "./meta-datas/countries"
import { Interests } from "./meta-datas/interests"
import { Langs } from "./meta-datas/langs"
import { Skills } from "./meta-datas/skills"

export {}

declare global {

  interface IUser extends IBaseUser {
    _id: string
    name: string
    description: string
    goals: string[]
    profile?: IUserProfile
    search?: IUserSearch
    openOnlyToThoseMatchingSearch: boolean
  }

  interface IUserProfile {
    country: Countries
    langs: Langs[]
    interests: Interests[]
    skills: Skills[]
  }

  interface IUserSearch extends Partial<IUserProfile> {
    minimumBalance: number
  }
}

export class User implements IUser {
  private readonly  _id: string
  private           _name: string
  private           _description: string
  private           _goals: string[]
  private           _profile?: UserProfile
  private           _search?: UserSearch
  private           _openOnlyToThoseMatchingSearch: boolean

  constructor(id: string) {
    this._id = id
    this._name = ''
    this._description = ''
    this._goals = []
    this._openOnlyToThoseMatchingSearch = false
  }

  public static of(user: IUser): User {
    const userInstance = new User(user._id)
    userInstance.setName(user.name)
    userInstance.setDescription(user.description)
    userInstance.setGoals(user.goals)
    if (user.profile) userInstance.setProfile(UserProfile.of(user.profile))
    if (user.search) userInstance.setSearch(UserSearch.of(user.search))
    userInstance.setOpenToAllState(user.openOnlyToThoseMatchingSearch)
    
    return userInstance
  }

  /* >==== GETTERS & SETTERS ====> */
  get id():                                       string                      { return this._id                                   }
  get name():                                     string                      { return this._name                                 }
  get description():                              string                      { return this._description                          }
  get goals():                                    string[]                    { return this._goals                                }
  get profile():                                  IUserProfile | undefined    { return this._profile                              }
  get search():                                   IUserSearch | undefined     { return this._search                               }
  get openOnlyToThoseMatchingSearch():            boolean                     { return this._openOnlyToThoseMatchingSearch        }

  public setName(name: string):                   void                        { this._name = name                                 }
  public setDescription(description: string):     void                        { this._description = description                   }
  public setGoals(goals: string[]):               void                        { this._goals = goals                               }
  public setProfile(profile: IUserProfile):       void                        { this._profile = profile                           }
  public setSearch(search: IUserSearch):          void                        { this._search = search                             }
  public setOpenToAllState(openToAll: boolean):   void                        { this._openOnlyToThoseMatchingSearch = !openToAll  }

  /* >==== METHODS ====> */
  public hasCompletedHisProfile(): boolean {
    return !!this._profile
  }
}

export class UserProfile implements IUserProfile {
  private           _country: Countries
  private           _interests: Interests[]
  private           _langs: Langs[]
  private           _skills: Skills[]

  constructor(country: Countries, langs: Langs[], interests: Interests[], skills: Skills[]) {
    this._country = country
    this._langs = langs
    this._interests = interests
    this._skills = skills
  }

  public static of(userProfile: IUserProfile): UserProfile {
    return new UserProfile(userProfile.country, userProfile.langs, userProfile.interests, userProfile.skills)
  }

  /* >==== GETTERS & SETTERS ====> */
  get country():                                Countries    { return this._interests        }
  get interests():                              Interests[]  { return this._langs            }
  get langs():                                  Langs[]      { return this._skills           }
  get skills():                                 Skills[]     { return this._search           }

  public setCountry(country: Countries):        void         { this._country = country       }
  public setLangs(langs: Langs[]):              void         { this._langs = langs           }
  public setInterests(interests: Interests[]):  void         { this._interests = interests   }
  public setSkills(skills: Skills[]):           void         { this._skills = skills         }
}



export class UserSearch implements IUserSearch {
  private           _minimumBalance?: number
  private           _country?: Countries
  private           _interests?: Interests[]
  private           _langs?: Langs[]
  private           _skills?: Skills[]

  constructor(minimumBalance?: number, country?: Countries, interests?: Interests[], langs?: Langs[], skills?: Skills[]) {
    this._minimumBalance = minimumBalance
    this._country = country
    this._langs = langs
    this._interests = interests
    this._skills = skills
  }

  public static of(userSearch: IUserSearch): UserSearch {
    return new UserProfile(userProfile.country, userProfile.langs, userProfile.interests, userProfile.skills)
  }

  /* >==== GETTERS & SETTERS ====> */
  get country():                                Countries | undefined       { return this._interests        }
  get interests():                              Interests[] | undefined     { return this._langs            }
  get langs():                                  Langs[] | undefined         { return this._skills           }
  get skills():                                 Skills[] | undefined        { return this._search           }

  public setCountry(country?: Countries):        void                       { this._country = country       }
  public setLangs(langs?: Langs[]):              void                       { this._langs = langs           }
  public setInterests(interests?: Interests[]):  void                       { this._interests = interests   }
  public setSkills(skills?: Skills[]):           void                       { this._skills = skills         }
}