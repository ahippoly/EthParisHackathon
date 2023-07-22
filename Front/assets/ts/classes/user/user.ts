import { Countries, Interests, Langs, Skills } from '@/assets/ts/enums/meta-datas'

export class User {
  /* eslint-disable prettier/prettier */
  public  readonly  _id: string
  private           _name: string
  private           _description: string
  private           _goals: string[]
  private           _profile?: UserProfile
  private           _search?: UserSearch
  private           _openOnlyToThoseMatchingSearch: boolean
  /* eslint-enable prettier/prettier */

  constructor(id: string) {
    this._id = id
    this._name = ''
    this._description = ''
    this._goals = []
    this._openOnlyToThoseMatchingSearch = false
  }

  public static fromIUser(user: IUser): User {
    const userInstance = new User(user._id)
    userInstance.setName(user.name)
    userInstance.setDescription(user.description)
    userInstance.setGoals(user.goals)
    if (user.profile) userInstance.setProfile(UserProfile.fromIUserProfile(user.profile))
    if (user.search) userInstance.setSearch(UserSearch.fromIUserSearch(user.search))
    userInstance.setOpenToAllState(!user.openOnlyToThoseMatchingSearch)

    return userInstance
  }

  public static fromRawUser(user: Record<string, unknown>): User {
    const userInstance = new User(user._id as string)
    userInstance.setName(user._name as string)
    userInstance.setDescription(user._description as string)
    userInstance.setGoals(user._goals as string[])
    if (user._profile) userInstance.setProfile(UserProfile.fromRawUserProfile(user._profile as Record<string, unknown>))
    if (user._search) userInstance.setSearch(UserSearch.fromRawUserSearch(user._search as Record<string, unknown>))
    userInstance.setOpenToAllState(!user._openOnlyToThoseMatchingSearch as boolean)

    return userInstance
  }

  /* >==== GETTERS & SETTERS ====> */
  get id(): string {
    return this._id
  }
  get name(): string {
    return this._name
  }
  get description(): string {
    return this._description
  }
  get goals(): string[] {
    return this._goals
  }
  get profile(): UserProfile | undefined {
    return this._profile
  }
  get search(): UserSearch | undefined {
    return this._search
  }
  get openOnlyToThoseMatchingSearch(): boolean {
    return this._openOnlyToThoseMatchingSearch
  }

  public setName(name: string): void {
    this._name = name
  }
  public setDescription(description: string): void {
    this._description = description
  }
  public setGoals(goals: string[]): void {
    this._goals = goals
  }
  public setProfile(profile: UserProfile): void {
    this._profile = profile
  }
  public setSearch(search: UserSearch): void {
    this._search = search
  }
  public setOpenToAllState(openToAll: boolean): void {
    this._openOnlyToThoseMatchingSearch = !openToAll
  }

  /* >==== METHODS ====> */
  public hasCompletedHisProfile(): boolean {
    return !!this._profile
  }
}

export class UserProfile implements IUserProfile {
  private _country: Countries
  private _interests: Interests[]
  private _langs: Langs[]
  private _skills: Skills[]

  constructor(country: Countries, langs: Langs[], interests: Interests[], skills: Skills[]) {
    this._country = country
    this._langs = langs
    this._interests = interests
    this._skills = skills
  }

  public static fromIUserProfile(userProfile: IUserProfile): UserProfile {
    return new UserProfile(userProfile.country, userProfile.langs, userProfile.interests, userProfile.skills)
  }

  public static fromRawUserProfile(userProfile: Record<string, unknown>): UserProfile {
    // @ts-ignore
    return new UserProfile(userProfile._country, userProfile._langs, userProfile._interests, userProfile._skills)
  }

  /* >==== GETTERS & SETTERS ====> */
  get country(): Countries {
    return this._country
  }
  get langs(): Langs[] {
    return this._langs
  }
  get interests(): Interests[] {
    return this._interests
  }
  get skills(): Skills[] {
    return this._skills
  }

  public setCountry(country: Countries): void {
    this._country = country
  }
  public setLangs(langs: Langs[]): void {
    this._langs = langs
  }
  public setInterests(interests: Interests[]): void {
    this._interests = interests
  }
  public setSkills(skills: Skills[]): void {
    this._skills = skills
  }
}

export class UserSearch {
  private _minimumBalance?: number
  private _country?: Countries
  private _interests?: Interests[]
  private _langs?: Langs[]
  private _skills?: Skills[]

  constructor(minimumBalance?: number, country?: Countries, langs?: Langs[], interests?: Interests[], skills?: Skills[]) {
    this._minimumBalance = minimumBalance
    this._country = country
    this._langs = langs
    this._interests = interests
    this._skills = skills
  }

  public static fromIUserSearch(userSearch: IUserSearch): UserSearch {
    return new UserSearch(userSearch.minimumBalance, userSearch.country, userSearch.langs, userSearch.interests, userSearch.skills)
  }

  public static fromRawUserSearch(userSearch: Record<string, unknown>): UserSearch {
    // @ts-ignore
    return new UserSearch(userSearch._minimumBalance, userSearch._country, userSearch._langs, userSearch._interests, userSearch._skills)
  }

  /* >==== GETTERS & SETTERS ====> */
  get minimumBalance(): number | undefined {
    return this._minimumBalance
  }
  get country(): Countries | undefined {
    return this._country
  }
  get langs(): Langs[] | undefined {
    return this._langs
  }
  get interests(): Interests[] | undefined {
    return this._interests
  }
  get skills(): Skills[] | undefined {
    return this._skills
  }

  public setCountry(country?: Countries): void {
    this._country = country
  }
  public setLangs(langs?: Langs[]): void {
    this._langs = langs
  }
  public setInterests(interests?: Interests[]): void {
    this._interests = interests
  }
  public setSkills(skills?: Skills[]): void {
    this._skills = skills
  }
}
