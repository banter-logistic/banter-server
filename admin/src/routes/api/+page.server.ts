import { fail, type Actions, redirect, error } from "@sveltejs/kit";
// import { toQuery } from "lib/util/query";
import { SessionSchema, o, s, session_key } from "lib/const";
import { idToRoute } from "lib/db/data";
import { encryptToken } from "lib/parser/auth";
import type { user } from "lib/db/schema";
import { compare } from "bcrypt";
import { select } from "lib/db";
import type { ids } from "lib/schema/user";
import { log } from "lib/util";


export const actions: Actions = {
  login: async ({ cookies, locals: { pool, formData } }) => {
    const { username, passwd } = await formData(o({ username: s.max(100), passwd: s.max(100) }))
    
    let user
    
    const [q] = await pool.query<user>(`select * from user where ${select.user('user_username')} = ?`, [username])
    
    if (q && await compare(passwd, q.user_passwd)) {
      user = q
    } else {
      return fail(400, { message: 'username atau password salah', username })
    }
    
    // extra information
    const sales = select.sales
    const admin = select.admin
    
    let table: string
    let prop: string
        
    switch (log(q.user_kode) as ids) {
      case 'ADM':
        table = 'admin'
        prop = admin('admin_level:level')
        break;
      case 'SLS':
        table = 'sales'
        prop = sales('sales_pos_id:posId')
        break;
      default:
        throw error(500, { code: 'UNIMPLEMENTED', message: 'Server sedang dalam pembangunan' })
    }
    
    const [extra] = await pool.query(`
    select
      ${prop}
    from ${table}
    where ${table}_id = ?
    `,[q.user_id])
    
    console.log({q,extra})
    
    // auth success
    const token = encryptToken(JSON.stringify({
      id: user.user_id,
      kode: user.user_kode as any,
      username: user.user_username,
      ...extra
    } satisfies Zod.infer<typeof SessionSchema> ))
    
    cookies.set(session_key, token)
    
    throw redirect(302, idToRoute[ user.user_kode ])
  },
  logout: async ({ cookies }) => {
    cookies.delete(session_key)
    throw redirect(302, '/')
  }
};
