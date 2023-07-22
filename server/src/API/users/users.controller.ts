import { Body, Controller, Get, Post, Patch, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { User } from '@/schemas/user'
import { RegisterUserRequest, XmtpAddressesRequest, SearchDataRequest, UpdateUserRequest } from './requests'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async registerUser(@Body() request: RegisterUserRequest): Promise<User> {
    return await this.usersService.registerUser(
      request.idMask,
      request.xmtpPublicAddress,
      request.xmtpCryptedPrivateKey,
      request.name,
      request.description,
      request.goals,
      request.profileData
    )
  }

  @Get('by-id-mask')
  public async getUserByIdMask(@Query('id-mask') idMask: string): Promise<User> {
    return await this.usersService.getUserByIdMask(idMask)
  }

  @Get('by-id')
  public async getUserById(@Query('id') id: string): Promise<User> {
    return await this.usersService.getUserById(id)
  }

  @Get('by-address')
  public async getUserByXmtpAddress(@Query('address') address: string): Promise<User> {
    return await this.usersService.getUserByXmtpAddress(address)
  }

  @Post('all/by-address')
  public async getAllUsersByXmtpAddress(@Body() { addresses }: XmtpAddressesRequest): Promise<User[]> {
    return await this.usersService.getAllUsersByXmtpAddress(addresses)
  }

  @Get('relevant-matchs')
  public async getRelevantMatches(@Query('id-mask') idMask: string): Promise<User[]> {
    return await this.usersService.getRelevantMatches(idMask)
  }

  @Patch('profile')
  public async updateProfile(@Query('id-mask') idMask: string, @Body() request: UpdateUserRequest): Promise<User> {
    return await this.usersService.updateProfile(
      idMask,
      request.name,
      request.description,
      request.goals,
      request.openOnlyToThoseMatchingSearch,
      request.profileData
    )
  }

  @Patch('search')
  public async updateSearch(@Query('id-mask') idMask: string, @Body() request: SearchDataRequest): Promise<User> {
    return await this.usersService.updateSearch(idMask, request.minimumBalance, request.country, request.langs, request.interests, request.skills)
  }

  @Patch('xmtp-crypted-private-key')
  public async updateXmtpCryptedPrivateKey(
    @Query('id-mask') idMask: string,
    @Query('crypted-key') cryptedKey: string,
    @Query('public-address') publicAddress: string
  ): Promise<boolean> {
    return await this.usersService.updateCryptedPrivateKey(idMask, cryptedKey, publicAddress)
  }
}
