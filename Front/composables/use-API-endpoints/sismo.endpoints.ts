import { AuthType, ClaimRequest, ClaimType, SismoConnect, SismoConnectConfig } from '@sismo-core/sismo-connect-client'

const appId = '0x0953a6430e3f1a3e15ebaa4c898f6071'
// const groupId = '0xa3adbf0f27191940ab26f6efa093fb01'

interface IVerifyResponse {
  vaultId?: string
  balance?: number
  followers?: number
}

const config: SismoConnectConfig = { appId }

const sismoConnect = SismoConnect({ config })

const polygonUSDCHolders: ClaimRequest = {
  groupId: '0x94cfd1337f2c6ee17821d9382467d2c8',
  claimType: ClaimType.GTE,
  isOptional: true,
  isSelectableByUser: true
}

const twitterFollowers: ClaimRequest = {
  groupId: '0x2e321327f0de5b1b58d90d0657834d2d',
  claimType: ClaimType.GTE,
  isOptional: true,
  isSelectableByUser: true
}

export class SismoEndpoints {
  public static async connect() {
    sismoConnect.request({
      auths: [{ authType: AuthType.VAULT }],
      claims: [polygonUSDCHolders, twitterFollowers]
    })
  }

  public static async verify() {
    const sismoResponse = sismoConnect.getResponse()

    if (!sismoResponse) return null

    const res = await useRequest().post<IVerifyResponse>('/sismo/verify', {
      body: sismoResponse
    })

    const response = res.data
    const vaultId = response?.vaultId

    if (vaultId) {
      useSessionStore().setIdMask(vaultId)
      useSessionStore().setSismoResponse(response)
      const user = await useAPI().users.logIn(vaultId)
      if (user.data) {
        useRouter().push('/chats')
      } else {
        useRouter().push('/register')
      }
    }
  }
}
