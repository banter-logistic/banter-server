import { SessionSchema, session_key } from "../const";
import { type Cookies, redirect } from "@sveltejs/kit";
import { zodUrlSafeParse } from "../util";

export function createToken(data: Cookies) {
  
}

/** read token from cookie */
export function readToken(data: Cookies, errorRedirect: string = '/') {
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
