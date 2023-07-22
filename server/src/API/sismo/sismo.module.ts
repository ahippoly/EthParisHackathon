import { Module } from '@nestjs/common'
import { SismoService } from './sismo.service'
import { SismoController } from './sismo.controller'

@Module({
  imports: [],
  exports: [SismoService],
  providers: [SismoService],
  controllers: [SismoController],
})

export class SismoModule {}
