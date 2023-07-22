import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'

import * as process from 'process'
import { UsersModule } from './API/users/users.module'

const ENV_FOLDER = 'envs'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${ENV_FOLDER}/.${process.env.NODE_ENV}.env`, `${ENV_FOLDER}/.env`],
      isGlobal: true,
    }),
    TypegooseModule.forRoot(<string>process.env.DB_URI),
    UsersModule,
  ],
  providers: [],
})
export class AppModule {}
