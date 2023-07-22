import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { SismoService } from './sismo.service'
import { SismoConnectResponse } from '@sismo-core/sismo-connect-server'

@ApiTags('sismo')
@Controller('sismo')
export class SismoController {
  constructor(private readonly sismoService: SismoService) {}

  @Post('verify')
  public async verifySismoResponse(@Body() sismoConnectResponse: SismoConnectResponse): Promise<string | undefined> {
    return await this.sismoService.verifyResponse(sismoConnectResponse)
  }
}
