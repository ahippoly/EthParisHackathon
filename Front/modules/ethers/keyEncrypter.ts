import { AES, enc } from 'crypto-js';



export function encryptKey(privateKey: string, userPassword: string): string {
  const encryptedPrivateKey = AES.encrypt(privateKey, userPassword).toString();
  return encryptedPrivateKey;
}

export function decryptKey(encryptedPrivateKey: string, userPassword: string): string {
  const decryptedBytes = AES.decrypt(encryptedPrivateKey, userPassword);
  const decryptedPrivateKey = decryptedBytes.toString(enc.Utf8);
  return decryptedPrivateKey;
}

