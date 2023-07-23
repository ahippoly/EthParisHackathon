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
  private config: SismoConnectConfig = { appId }
  private sismoConnect: SismoConnectServer

  constructor() {
    this.sismoConnect = SismoConnect({ config: this.config })
  }

  public async verifyResponse(res: SismoConnectResponse): Promise<IVerifyResponse> {
    const polygonUSDCHolders: ClaimRequest = {
      groupId: '0x94cfd1337f2c6ee17821d9382467d2c8',
      claimType: ClaimType.GTE,
      isOptional: true,
      isSelectableByUser: true,
    }

    const twitterFollowers: ClaimRequest = {
      groupId: '0x2e321327f0de5b1b58d90d0657834d2d',
      claimType: ClaimType.GTE,
      isOptional: true,
      isSelectableByUser: true,
    }

    const result: SismoConnectVerifiedResult = await this.sismoConnect.verify(res, {
      auths: [{ authType: AuthType.VAULT }],
      claims: [polygonUSDCHolders, twitterFollowers],
    })

    const vaultId = result.getUserId(AuthType.VAULT)

    const balance = result.claims.find((claim) => claim.groupId == '0x94cfd1337f2c6ee17821d9382467d2c8')?.value

    const followers = result.claims.find((claim) => claim.groupId == '0x2e321327f0de5b1b58d90d0657834d2d')?.value

    return {
      vaultId,
      balance,
      followers,
    }
  }
}
