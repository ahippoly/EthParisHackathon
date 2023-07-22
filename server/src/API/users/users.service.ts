import { UserRepository } from '@/repositories'
import { User } from '@/schemas/user'
import { TUserProfile } from '@/schemas/user/pojos/user-profile'
import { Injectable } from '@nestjs/common'

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
    name: string,
    description: string,
    goals: string[],
    profileData: TUserProfile
  ): Promise<User> {
    const newUser = User.of(idMask, xmtpPublicAddress, name, description, goals, profileData)

    const savedUser = await this.userRepository.create(newUser)

    return savedUser
  }
}
