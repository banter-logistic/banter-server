import { redirect, type Handle } from "@sveltejs/kit";
import { Api } from "lib/api";

const userTipeRoute: {[x:string]:string} = {
  admin: '/admin',
  sales: '/sales',
  driver: '/driver',
  kurir: '/driver',
}

// all route protected by default
const noAuth = [ '/auth','/test' ,'/qr' ]

export const handle = (async ({ event, resolve }) => {
  if (inNonProtectedRoute(event.url)) { return await resolve(event); }
  
  const cookie = event.cookies.get('session_id')
  const valid = cookie ? await Api.Auth.GetSession({ cookie }) : null
  
  if (valid && valid.success === false) {
    console.log('[SERVER ERR]')
    console.error(valid)
    console.log('[/SERVER ERR]')
    return new Response('Terjadi Kesalahan, coba lagi\nps: Server Hook')
  }
  
  if (valid && valid.success === null) {
    event.cookies.delete('session_id')
    event.cookies.set('msg','sesi berakhir, login kembali')
    throw redirect(303, '/')
  }
  
  if (!valid) {
    // if in protected route, but no cookie
    event.cookies.set('msg','anda harus login')
    throw redirect(303, '/')
  }
  
  // if in protected route and have cookie
  const session = valid.data
  
  // user tipe invalid
  if ( !Object.hasOwn(userTipeRoute, session.tipe) ) {
    event.cookies.set('msg',`user ${session.tipe} tidak valid`)
    throw redirect(303, '/')
  }
  
  // if user not in the right route
  const url = userTipeRoute[session.tipe]
  if (!event.url.pathname.startsWith(url)) {
    throw redirect(303, url)
  }
  
  event.locals.auth = session
  
  return await resolve(event);
}) satisfies Handle;






import type { HandleServerError } from '@sveltejs/kit';

export const handleError = (({ error }) => {
  console.log('[HANDLE ERR]')
  console.error(error);
  console.log('[/HANDLE ERR]')
  return {
    message: JSON.stringify(error),
    code: (error as any).code ?? 'UNKNOWN'
  };
}) satisfies HandleServerError;

/**
 * if no auth, throw redirect
 * @param url 
 */
function inNonProtectedRoute(url: URL) {
  const ent = Object.values(noAuth)
  
  if (url.pathname == '/') return true
  
  for (const u of ent) {
    if (url.pathname.startsWith(u)) return true
  }
  
  return false
  // throw redirect(302, '/?to=' + url.pathname + url.search)
}
