import { redirect, type Handle, type HandleServerError } from "@sveltejs/kit";
import { id_to_route } from "lib/database";
import "lib/util/error";

import { SessionSchema, publicRoutes, session_key } from "lib/const";
import { Pooling } from "lib/util/pooling";
import { fromQuerySafeParse, fromQueryParse } from "lib/util/query";
import { decryptToken } from "lib/auth";
import { ZodError } from "zod";


export const handle: Handle = async ({ event, resolve }) => {
  event.locals.pool = new Pooling()
  event.locals.formData = async (z) => fromQueryParse(z,await event.request.formData())
  
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

export const handleError: HandleServerError = ({ error: err, event }) => {
  let er: {
    name: string
    code?: string
    message: string
  }
  
  if (err instanceof ZodError) {
    er = {
      name: 'VALIDATION_ERROR',
      message: 'Data tidak valid, coba lagi',
      code: err.name,
    }
  } else if (err instanceof Error && 'sql' in err) {
    er = {
      name: 'DATABASE_ERROR',
      message: 'Terjadi kesalahan, coba lagi nanti',
      code: err.name,
    }
  } else if (err instanceof Error) {
    const errName = err.message.split(':')[0].toLowerCase()
    
    if (errName in expectedError) {
      er = expectedError[errName]
    } else {
      er = {
        name: 'SERVER_ERROR',
        message: 'Terjadi kesalahan, coba lagi nanti',
        code: err.name,
      }
    }
  } else {
    er = {
      name: 'UNKNOWN_ERROR',
      message: 'Terjadi kesalahan, coba lagi nanti',
      code: 'UNKNOWN_ERROR',
    }
  }
  
  if (er.code)
    console.warn(err, er.code)
  
  return {
    message: er.message,
    code: er.name,
  };
};

const expectedError = {
  'not found': {
    name: 'NOT_FOUND',
    message: 'Halaman tidak ditemukan'
  }
} as Record<string,{ name: string, message: string, code?: string }>