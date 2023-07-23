import { Countries, Interests, Langs, Skills } from '@/assets/ts/enums/meta-datas'

export {}

declare global {
  interface IVerifyResponse {
    vaultId?: string
    balance?: number
    followers?: number
  }
  interface IUser {
    _id: string
    name: string
    description: string
    goals: string[]
    profile?: IUserProfile
    search?: IUserSearch
    xmtpPublicAddress: string
    xmtpCryptedPrivateKey?: string
    openOnlyToThoseMatchingSearch: boolean
    balance: number
    followers: number
  }

  interface IUserProfile {
    country: Countries
    langs: Langs[]
    interests: Interests[]
    skills: Skills[]
    balance: number
  }

  interface IUserSearch extends Partial<IUserProfile> {
    minimumBalance?: number
  }
}
