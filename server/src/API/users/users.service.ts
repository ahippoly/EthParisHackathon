import { Countries, Interests, Langs, Skills } from '@/common/enums/meta-datas'
import { UserRepository } from '@/repositories'
import { User, UserBlueprint } from '@/schemas/user'
import { TUserProfile, UserProfile } from '@/schemas/user/pojos/user-profile'
import { UserSearch } from '@/schemas/user/pojos/user-search'
import { ForbiddenException, Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  public async registerUser(
    idMask: string,
    xmtpPublicAddress: string,
    xmtpCryptedPrivateKey: string,
    name: string,
    description: string,
    goals: string[],
    profileData: TUserProfile
  ): Promise<User> {
    // check that all unique user data are available
    if (
      await this.userRepository
        .findBy({
          $or: [{ _idMask: idMask }, { _xmtpPublicAddress: xmtpPublicAddress }, { _xmtpCryptedPrivateKey: xmtpCryptedPrivateKey }],
        })
        .getOrNull()
    ) {
      throw new ForbiddenException('Some unique user data are already taken')
    }

    const newUser = User.of(idMask, xmtpPublicAddress, xmtpCryptedPrivateKey, name, description, goals, profileData)

    const savedUser = await this.userRepository.create(newUser)

    return savedUser
  }

  public async updateProfile(
    idMask: string,
    name: string,
    description: string,
    goals: string[],
    openOnlyToThoseMatchingSearch: boolean,
    profileData: TUserProfile
  ): Promise<User> {
    const user = await this.getUserByIdMask(idMask)

    user.name = name
    user.description = description
    user.goals = goals

    const { country, langs, interests, skills } = profileData
    user.profile = UserProfile.of(country, langs, interests, skills)

    user.openOnlyToThoseMatchingSearch = openOnlyToThoseMatchingSearch

    this.userRepository.updateAsIs(user)

    return user
  }

  public async updateSearch(
    idMask: string,
    minimumBalance: number | undefined,
    country: Countries | undefined,
    langs: Langs[],
    interests: Interests[],
    skills: Skills[]
  ): Promise<User> {
    const user = await this.getUserByIdMask(idMask)

    user.search = UserSearch.of(minimumBalance, country, langs, interests, skills)

    this.userRepository.updateAsIs(user)

    return user
  }

  public async updateCryptedPrivateKey(idMask: string, cryptedKey: string): Promise<boolean> {
    const user = await this.getUserByIdMask(idMask)

    user.xmtpCryptedPrivateKey = cryptedKey

    return await this.userRepository.updateAsIs(user)
  }

  public async getUserByIdMask(idMask: string): Promise<User> {
    return this.userRepository.findByIdMask(idMask)
  }

  public async getUserByXmtpAddress(address: string): Promise<User> {
    return this.userRepository.findByXmtpAddress(address)
  }

  public async getAllUsersByXmtpAddress(addresses: string[]): Promise<User[]> {
    return this.userRepository.findManyByXmtpAddress(addresses)
  }

  public async getRelevantMatches(idMask: string): Promise<User[]> {
    const userSearching = await this.getUserByIdMask(idMask)

    const { /* minimumBalance,  */ country, langs, interests, skills } = userSearching.search

    const query: TDocumentMongoFilterQuery<UserBlueprint> = { _id: { $ne: userSearching._id } }

    if (country) query['_profile._country'] = country
    if (langs && langs.length) query['_profile._langs'] = { $in: langs }
    if (skills && skills.length) query['_profile._skills'] = { $in: skills }
    if (interests && interests.length) query['_profile._interests'] = { $in: interests }

    const relevantUsers = await this.userRepository.findMany(query).getOr([])

    // TODO: filter by balance

    // filter users that searcher doesn't interest and that set the filter in their profiles
    const filteredRelevantUsers = relevantUsers.filter((relevantUser) => {
      if (relevantUser.openOnlyToThoseMatchingSearch) return this.checkIfUser1MatchesUser2Criterias(userSearching, relevantUser)

      return true
    })

    return filteredRelevantUsers
  }

  private checkIfUser1MatchesUser2Criterias(user1: User, user2: User): boolean {
    const { /* minimumBalance,  */ country, langs, interests, skills } = user2.search

    // check country
    if (country && user1.profile.country !== country) return false
    // check langs
    if (langs && langs.length) {
      let found = false
      for (const wantedLanguage of langs) {
        if ((found = user1.profile.langs.includes(wantedLanguage))) break
      }

      if (!found) return false
    }
    // check skills
    if (skills && skills.length) {
      let found = false
      for (const wantedSkill of skills) {
        if ((found = user1.profile.skills.includes(wantedSkill))) break
      }

      if (!found) return false
    }
    // check interests
    if (interests && interests.length) {
      let found = false
      for (const wantedInterest of interests) {
        if ((found = user1.profile.interests.includes(wantedInterest))) break
      }

      if (!found) return false
    }

    return true
  }
}
