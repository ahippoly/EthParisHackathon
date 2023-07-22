import { AuthRequest, AuthType, ClaimRequest, ClaimType, SismoConnect, SismoConnectConfig } from '@sismo-core/sismo-connect-client'

export const sismoConnect = () => {
  const config: SismoConnectConfig = {
    // you will need to get an appId from the Factory
    appId: '0x0953a6430e3f1a3e15ebaa4c898f6071',
    displayRawResponse: true
  }

  const sismoConnect = SismoConnect({
    config
  })

  // auth request for a proof of Twitter account ownership
  // const twitterRequest: AuthRequest = {
  //   authType: AuthType.TWITTER
  // }

  // claim request for a proof of "Nouns DAO Nft holders" group membership
  // const nounsDaoRequest: ClaimRequest = {
  //   // id of the group nouns-dao-nft-holders
  //   // https://factory.sismo.io/groups-explorer?search=nouns-dao-nft-holders
  //   groupId: '0x311ece950f9ec55757eb95f3182ae5e2'
  // }

  // claim request for a proof of "Gitcoin Passport holders" group membership

  const maticHolders: ClaimRequest = {
    // id of the group gitcoin-passport-holders
    // https://factory.sismo.io/groups-explorer?search=gitcoin-passport-holders
    groupId: '0x99b98fbff55074d0bdbbc023379f49f1',
    // users should have at least 15 as value in the group to claim the airdrop
    value: 1,
    claimType: ClaimType.GTE
  }

  // redirect users to the Vault App to generate proofs based on the requirements
  // expressed in the auth and claim requests

  sismoConnect.request({
    claims: [maticHolders],
    namespace: 'sismo-edition',
    callbackUrl: 'http://localhost:3000/test'
  })
}
