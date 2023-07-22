import { Body, Controller, Get, Post, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { User } from '@/schemas/user'
import { RegisterUserRequest, XmtpAddressesRequest } from './requests'

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

  @Get('by-id-mask/:ID_MASK')
  public async getUserByIdMask(@Param('ID_MASK') idMask: string): Promise<User> {
    return await this.usersService.getUserByIdMask(idMask)
  }

  @Get('by-address/:ADDRESS')
  public async getUserByXmtpAddress(@Param('ADDRESS') address: string): Promise<User> {
    return await this.usersService.getUserByXmtpAddress(address)
  }

  @Get('all/by-address')
  public async getAllUsersByXmtpAddress(@Body() { addresses }: XmtpAddressesRequest): Promise<User[]> {
    return await this.usersService.getAllUsersByXmtpAddress(addresses)
  }
}
