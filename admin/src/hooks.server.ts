import { redirect, type Handle } from "@sveltejs/kit";
import { zodUrlSafeParse } from "lib";
import { readToken } from "lib/auth";
import { SessionSchema, publicRoutes, session_key,  } from "lib/const";
import { id_to_route } from "lib/database";
import { pool } from "lib/database/connection";
import type { PoolConnection } from "mysql2/promise";

export class Pooling {
  conn: PoolConnection | null = null
  
  async query<T = any>(sql: string, value?: any[]): Promise<T[]> {
    if (!this.conn) {
      this.conn = await pool.getConnection()
    }
    
    const [res] = await this.conn.query(sql,value)
    
    return res as T[]
  }
}

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.pool = new Pooling()
  
  const path = event.url.pathname
  
  const cookie = event.cookies.get(session_key)
  
  // if in public route, proceed
  if (path == '/' || publicRoutes.find( pubRoute => path.startsWith(pubRoute) )) {
    let session
    if (cookie) {
      const valid = zodUrlSafeParse(SessionSchema, readToken(cookie) )
      session = valid.success ? valid.data : null
    }
    event.locals.user = session ?? null as any
    const res = await resolve(event)
    event.locals.pool.conn?.release()
    return res
  }
  
  if (!cookie) {
    event.cookies.set('msg','anda harus login')
    throw redirect(302, '/')
  }
  
  const session = zodUrlSafeParse(SessionSchema, readToken(cookie) )
  
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
