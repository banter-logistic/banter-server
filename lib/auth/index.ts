import { createCipheriv, createDecipheriv } from "crypto";
import { readFileSync } from "fs";

const key = readFileSync('.env.key')
const iv = readFileSync('.env.iv')

/** create encrypted token from url query string */
export function encryptToken(data: string) {
  const cipher = createCipheriv('aes256', key, iv)
  return cipher.update(data, 'utf-8', 'hex') + cipher.final('hex')
}

/** decrypt token from url query string */
export function decryptToken(token: string) {
  const decipher = createDecipheriv('aes256', key, iv)
  return decipher.update(token, 'hex', 'utf-8') + decipher.final('utf-8')
}