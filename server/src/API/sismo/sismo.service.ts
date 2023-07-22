import { Injectable } from '@nestjs/common'

import {
  SismoConnect,
  AuthType,
  SismoConnectVerifiedResult,
  SismoConnectConfig,
  SismoConnectResponse,
  SismoConnectServer,
  ClaimRequest,
  ClaimType,
} from '@sismo-core/sismo-connect-server'

const appId = '0x0953a6430e3f1a3e15ebaa4c898f6071'
// const groupId = '0xa3adbf0f27191940ab26f6efa093fb01'

@Injectable()
export class SismoService {
  // private groupClaim: ClaimRequest = {
  //   groupId,
  //   value: 1,
  //   claimType: ClaimType.GTE,
  // }

  private config: SismoConnectConfig = { appId }
  private sismoConnect: SismoConnectServer

  constructor() {
    this.sismoConnect = SismoConnect({ config: this.config })
  }

  public async verifyResponse(res: SismoConnectResponse): Promise<string | undefined> {
    const result: SismoConnectVerifiedResult = await this.sismoConnect.verify(res, {
      auths: [{ authType: AuthType.VAULT }],
      // claims: [this.groupClaim],
    })

    const vaultId = result.getUserId(AuthType.VAULT)

    return vaultId
  }
}
