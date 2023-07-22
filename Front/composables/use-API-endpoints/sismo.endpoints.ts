import {
  AuthType,
  ClaimRequest,
  ClaimType,
  SismoConnect,
  SismoConnectConfig,
} from '@sismo-core/sismo-connect-client'

const appId = '0x0953a6430e3f1a3e15ebaa4c898f6071'
const groupId = '0xa3adbf0f27191940ab26f6efa093fb01'

const config: SismoConnectConfig = { appId }

const sismoConnect = SismoConnect({ config })

const groupClaim: ClaimRequest = {
  groupId,
  value: 1,
  claimType: ClaimType.GTE
}

export class SismoEndpoints {
  public static async connect() {
    sismoConnect.request({
      auths: [{ authType: AuthType.VAULT }],
      claims: [groupClaim],
    })
  }

  public static async verify() {
    const sismoResponse = sismoConnect.getResponse()

    if (!sismoResponse) return null

    const res = await useRequest().post<any>('/sismo/verify', {
      body: sismoResponse
    })

    console.log('🦋 | SismoEndpoints | res | res', res)
  }
}
