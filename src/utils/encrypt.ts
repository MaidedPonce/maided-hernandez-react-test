import CryptoJS from 'crypto-js'

export const handleEncrypt = (info: string) => {
  const encrypted = CryptoJS.AES.encrypt(info, 'secretKey').toString()
  return encrypted
}

export const handleDecrypt = (info: string) => {
  const bytes = CryptoJS.AES.decrypt(info, 'secretKey')
  return bytes.toString(CryptoJS.enc.Utf8)
}
