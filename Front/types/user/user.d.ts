import { Countries } from "./meta-datas/countries"
import { Interests } from "./meta-datas/interests"
import { Langs } from "./meta-datas/langs"
import { Skills } from "./meta-datas/skills"

export {}

declare global {
  interface IUser {
    _id: string
    name: string
    description: string
    goals: string[]
    profile: IUserProfile
    search: IUserSearch
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
