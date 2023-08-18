import { redirect, type Handle } from "@sveltejs/kit";
import { id_to_route } from "lib/database";

import { SessionSchema, publicRoutes, session_key } from "lib/const";
import { Pooling } from "lib/util/pooling";
import { fromQuerySafeParse } from "lib/util/query";
import { decryptToken } from "lib/auth";


export const handle: Handle = async ({ event, resolve }) => {
  event.locals.pool = new Pooling()
  
  const path = event.url.pathname
  
  const token = event.cookies.get(session_key)
  
  // if in public route, proceed
  if (path == '/' || publicRoutes.find( pubRoute => path.startsWith(pubRoute) )) {
    if (token) {
      const sessionParse = fromQuerySafeParse(SessionSchema, decryptToken(token) )
      event.locals.user = sessionParse.success ? sessionParse.data : null as any
    }
    const res = await resolve(event)
    event.locals.pool.conn?.release()
    return res
  }
  
  if (!token) {
    event.cookies.set('msg','anda harus login')
    throw redirect(302, '/')
  }
  
  const session = fromQuerySafeParse(SessionSchema, decryptToken(token) )
  
  if (!session.success) {
    event.cookies.delete(session_key)
    event.cookies.set('msg','session invalid, login kembali')
    throw redirect(302, '/')
  }
  
  if (!path.startsWith( id_to_route[ session.data.id.slice(0,3) ] )) {
    event.cookies.set('msg','tidak diizinkan')
    throw redirect(302, '/')
  }
  
  event.locals.user = session.data
  const res = await resolve(event)
  event.locals.pool.conn?.release()
  return res
}
