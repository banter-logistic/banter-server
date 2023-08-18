import { SessionSchema, session_key } from "../const";
import { type Cookies, redirect } from "@sveltejs/kit";
import { zodUrlSafeParse } from "../util";

import { createCipheriv, createDecipheriv } from "crypto";
import { readFileSync } from "fs";

const key = readFileSync('.env.key')
const iv = readFileSync('.env.iv')

export function createToken(data: string) {
  const cipher = createCipheriv('aes256', key, iv)
  return cipher.update(data, 'utf-8', 'hex') + cipher.final('hex')
}

export function readToken(token: string) {
  const decipher = createDecipheriv('aes256', key, iv)
  return decipher.update(token, 'hex', 'utf-8') + decipher.final('utf-8')
}

/** read token from cookie */
export function parseToken(data: Cookies, errorRedirect: string = '/') {
  const cookie = data.get(session_key)
  
  if (!cookie) {
    throw redirect(302, errorRedirect)
  }
  
  const valid = zodUrlSafeParse(SessionSchema, cookie)
  
  if (valid.success) {
    return valid.data
  }
  
  console.error(valid.error)
  
  data.delete(session_key)
  return redirect(302, errorRedirect)
}
