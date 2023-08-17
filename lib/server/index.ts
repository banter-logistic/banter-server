
import { createCipheriv, createDecipheriv } from "crypto";
import { readFileSync } from "fs";

const key = readFileSync('../.key.env')
const iv = readFileSync('../.iv.env')

export namespace Auth {
  /** create encrypted token */
  export function createToken(data: string) {
    const cipher = createCipheriv('aes256', key, iv)
    return cipher.update(data, 'utf-8', 'hex') + cipher.final('hex')
  }
  
  /** decrypt token to urlformencoded */
  export function readToken(token: string) {
    const decipher = createDecipheriv('aes256', key, iv)
    return decipher.update(token, 'hex', 'utf-8') + decipher.final('utf-8')
  }
}

export namespace Code {
  export const id = {
    SLS: '/sales',
    DRV: '/driver',
    KRR: '/kurir',
  } as Record<string,string>
  
  export function parse_user_tipe(id: string) {
    return Code.id[id.slice(0,3)]
  }
}