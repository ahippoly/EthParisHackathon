import { BrowserProvider, JsonRpcSigner } from 'ethers'
import { getWalletClient, WalletClient } from '@wagmi/core'

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient
  console.log('🚀 ~ file: walletClientToSigner.ts:6 ~ walletClientToSigner ~ transport:', transport)
  console.log('🚀 ~ file: walletClientToSigner.ts:6 ~ walletClientToSigner ~ chain:', chain)
  console.log('🚀 ~ file: walletClientToSigner.ts:6 ~ walletClientToSigner ~ account:', account)

  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address
  }
  const provider = new BrowserProvider(transport, network)
  const signer = new JsonRpcSigner(provider, account.address)
  return signer
}

/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getEthersSigner({ chainId }: { chainId?: number } = {}) {
  const walletClient = await getWalletClient({ chainId })
  if (!walletClient) return undefined
  return walletClientToSigner(walletClient)
}
