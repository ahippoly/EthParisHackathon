import { Countries, Interests, Langs, Skills } from '@/assets/ts/enums/meta-datas'

export {}

declare global {
  interface IUser {
    id: string
    idMask?: string
    name: string
    description: string
    goals: string[]
    profile?: IUserProfile
    search?: IUserSearch
    xmtpPublicAddress: string
    openOnlyToThoseMatchingSearch: boolean
  }

  interface IUserProfile {
    country: Countries
    langs: Langs[]
    interests: Interests[]
    skills: Skills[]
  }

  interface IUserSearch extends Partial<IUserProfile> {
    minimumBalance?: number
  }
}
