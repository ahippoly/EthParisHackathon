import { User } from '@/schemas/user'
import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { UsersService } from './users.service'
import { UserRepository } from '@/repositories'
import { UsersController } from './users.controller'

@Module({
  imports: [TypegooseModule.forFeature([User])],
  exports: [UsersService, UserRepository],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
