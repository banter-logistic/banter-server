import { redirect, type Handle } from "@sveltejs/kit";

const protectedUrl = {
  sales: '/sales',
  driver: '/driver',
  kurir: '/kurir',
}

const noAuthUrl = [ '/auth','/test' ]
// @TODO, make system that automate url that need auth, optional, or not at all
export const handle = (async ({ event, resolve }) => {
  console.log("SERVER HOOK")
  
  const cookie = event.cookies.get('session_id')
  
  if (!cookie)
    checkAuth(event.url)
  
  // const valid = cookie ? await Api.Auth.GetSession({ cookie }) : null
  
  // if (valid && valid.success === false) {
  //   console.error(valid)
  //   return new Response('Terjadi Kesalahan, coba lagi, ' + valid.error.message)
  // }
  
  // const session = valid?.success == true && valid?.data
  
  // if (noAuthUrl.find( url => event.url.pathname.startsWith(url)) || event.url.pathname == '/') { }
  // else {
  //   if (!cookie) throw redirect(303, '/')
    
    // if user visit incorrect page with the auth type
    // const url = Object.entries(protectedUrl).find( ([authType,url]) =>
    //   session.tipe == authType && event.url.pathname.startsWith(url)
    // )
    
    // if (!url) throw redirect(303, '/' + session.tipe)
    
    // event.locals.auth = { tipe: session.tipe, subjek: session.subjek }
  // }
  
  // const ent = Object.entries(protectedUrl)
  // for (let i = 0;i < ent.length;i++) {
  //   if (!cookie && event.url.pathname.startsWith(ent[i][1]))
  //     throw redirect(302, '/')
  // }
  
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


function checkAuth(url: URL) {
  const ent = Object.values(protectedUrl)
  
  for (const u of ent) {
    if (url.password.startsWith(u))
      throw redirect(302, '/')
  }
}