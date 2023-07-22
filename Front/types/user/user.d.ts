import { Countries } from "../../assets/ts/enums/meta-datas/countries"
import { Interests } from "../../assets/ts/enums/meta-datas/interests"
import { Langs } from "../../assets/ts/enums/meta-datas/langs"
import { Skills } from "../../assets/ts/enums/meta-datas/skills"

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
