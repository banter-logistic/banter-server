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
  const cookie = event.cookies.get('session_id')
  const valid = cookie ? await Api.Auth.GetSession({ cookie }) : null
  
  if (valid && valid.success === false) {
    logErr(valid.error)
    throw new Error('Kesalahan saat mengambil sesi data',{ cause: 'FETCH_ERR' })
  }
  
  if (inNonProtectedRoute(event.url)) {
    event.locals.session = (valid?.success ? {...valid.data, tipe: userTipeRoute[valid.data.tipe]} : null) ?? undefined
    return await resolve(event);
  }
  
  if (valid && valid.success === null) {
    event.cookies.delete('session_id')
    event.cookies.set('msg',valid.message)
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
    event.cookies.set('msg',`tidak diizinkan`)
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
import { logErr } from "$lib";

// the return are the one that user will receive
export const handleError = (({ error }) => {
  console.log('\x1b[91m[HANDLE ERR]\x1b[0m')
  console.error(error);
  console.log('\x1b[91m[/HANDLE ERR]\x1b[0m')
  return {
    message: 'Gagal memuat data',
    code: (error as any).code ?? 'FETCH_ERR',
    id: '1'
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
}
