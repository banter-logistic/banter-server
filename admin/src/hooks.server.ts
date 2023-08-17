import { redirect, type Handle } from "@sveltejs/kit";
import { zodUrlSafeParse } from "lib";
import { SessionSchema, publicRoutes, session_key,  } from "lib/const";
import { id_to_route } from "lib/database";


export const handle: Handle = async ({ event, resolve }) => {
  
  const path = event.url.pathname
  
  // if in public route, proceed
  if (path == '/' || publicRoutes.find( pubRoute => path.startsWith(pubRoute) )) {
    return await resolve(event)
  }
  
  const cookie = event.cookies.get(session_key)
  
  if (!cookie) {
    event.cookies.set('msg','anda harus login')
    throw redirect(302, '/')
  }
  
  const session = zodUrlSafeParse(SessionSchema, cookie)
  
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
  return await resolve(event)
}
