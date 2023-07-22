import { UserRepository } from '@/repositories'
import { User } from '@/schemas/user'
import { TUserProfile } from '@/schemas/user/pojos/user-profile'
import { ForbiddenException, Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUserByIdMask(idMask: string): Promise<User> {
    return this.userRepository.findByIdMask(idMask)
  }

  public async getUserByXmtpAddress(address: string): Promise<User> {
    return this.userRepository.findByXmtpAddress(address)
  }

  public async getAllUsersByXmtpAddress(addresses: string[]): Promise<User[]> {
    return this.userRepository.findManyByXmtpAddress(addresses)
  }

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
}
