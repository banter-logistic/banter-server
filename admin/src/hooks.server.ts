import { redirect, type Handle } from "@sveltejs/kit";
import { Api } from "$lib/api";

const protectedUrl = {
  counter: '/counter',
  driver: '/driver',
  kurir: '/kurir',
}

const noAuthUrl = [ '/auth','/test' ]
// @TODO, make system that automate url that need auth, optional, or not at all
export const handle = (async ({ event, resolve }) => {
  console.log("SERVER HOOK")
  
  const cookie = event.cookies.get('sessionId')
  const valid = cookie ? await Api.Auth.Session({ cookie }) : null
  
  if (valid && valid.success === false) {
    console.log(valid)
    return new Response('Terjadi Kesalahan, coba lagi')
  }
  
  const session = valid?.success == true && valid?.data
  
  if (noAuthUrl.find( url => event.url.pathname.startsWith(url)) || event.url.pathname == '/') { }
  else {
    if (!session) throw redirect(303, '/')
    
    // if user visit incorrect page with the auth type
    const url = Object.entries(protectedUrl).find( ([authType,url]) =>
      session.type == authType && event.url.pathname.startsWith(url)
    )
    
    if (!url) throw redirect(303, '/' + session.type)
    
    event.locals.auth = { type: session.type, username: session.username, subjek: session.subjek }
  }
  
  return await resolve(event);
}) satisfies Handle;






import type { HandleServerError } from '@sveltejs/kit';

export const handleError = (({ error, event }) => {
  return {
    message: JSON.stringify(error),
    code: (error as any).code ?? 'UNKNOWN'
  };
}) satisfies HandleServerError;