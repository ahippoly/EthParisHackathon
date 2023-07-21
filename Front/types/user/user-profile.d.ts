export {}

declare global {
  interface IUser {
    _id: string
    name: string
    description: string
    profile: IUserProfile
    search: IUserSearch
  }

  interface IUserProfile {
    country: string
    langs: string[]
    interests: string[]
    goals: string[]
    skills: string[]
  }

  interface IUserSearch extends Partial<IUserProfile> {
    balance: number
  }
}
