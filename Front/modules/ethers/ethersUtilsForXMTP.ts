import { ethers, Wallet } from 'ethers'
import { exampleWallet1, exampleWallet2, exampleWallet3 } from '@/mockups/ethers/wallet'

export const createUserWallet = () => {
  return ethers.Wallet.createRandom()
}

export const decryptPrivateKey = (secretPhrase: string, cryptedPK: string) => {
  //mockedImplementation
  if (secretPhrase == '1') return exampleWallet1.privateKey
  if (secretPhrase == '2') return exampleWallet2.privateKey
  return exampleWallet3.privateKey
}

export const retrieveUserWallet = (secretPhrase: string, cryptedPK: string) => {
  return new Wallet(decryptPrivateKey(secretPhrase, cryptedPK))
}

export const getOrCreateUserWallet = (secretPhrase?: string, cryptedPK?: string) => {
  if (!secretPhrase || !cryptedPK) return createUserWallet()
  return retrieveUserWallet(secretPhrase, cryptedPK)
}
