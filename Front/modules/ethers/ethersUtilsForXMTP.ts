import { ethers, Wallet } from 'ethers'
import { exampleWallet1, exampleWallet2, exampleWallet3, wallets } from '@/mockups/ethers/wallet'
import { decryptKey } from './keyEncrypter'

export const createUserWallet = () => {
  return ethers.Wallet.createRandom()
}

// export const decryptPrivateKey = (secretPhrase: string, cryptedPrivateKey: string) => {
//   //mockedImplementation

//   return wallets[Number(secretPhrase)].privateKey
// }

// export const encryptPrivateKey = (privateKey: string, passPhrase: string): string => {
//   //mockedImplementation
//   return privateKey
// }

export const retrieveUserWallet = (secretPhrase: string, cryptedPK: string) => {
  return new Wallet(decryptKey(secretPhrase, cryptedPK))
}

export const getOrCreateUserWallet = (secretPhrase?: string, cryptedPK?: string) => {
  if (!secretPhrase || !cryptedPK) return createUserWallet()
  return retrieveUserWallet(secretPhrase, cryptedPK)
}
