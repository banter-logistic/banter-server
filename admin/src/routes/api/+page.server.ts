import { fail, type Actions, redirect, error } from "@sveltejs/kit";
import { Query, zodUrlSafeParse } from "lib";
import { SessionSchema, o, s, session_key } from "lib/const";
import { id_to_route } from "lib/database";
import { createToken } from "lib/auth";
import type { user } from "lib/database/schema";
import { compare } from "bcrypt";


export const actions: Actions = {
  login: async ({ request, cookies, locals }) => {
    
    const form = await request.formData()
    const auth = zodUrlSafeParse(o({ username: s, passwd: s }) , form)
    
    if (!auth.success) {
      return fail(400, { message: 'data invalid, coba lagi' })
    }
    
    // database check
    const { username, passwd } = auth.data
    
    let user
    
    try {
      const [q] = await locals.pool.query<user>('select * from user where username = ?', [username])
      
      if (!q || !(await compare(passwd, q.passwd))) {
        return fail(400, { message: 'username atau password salah', username })
      }
      
      user = q
    } catch (err) {
      console.error(err)
      throw error(500, { code: 'DATABASE_ERROR', message: 'Maaf, terjadi kesalahan, coba lagi nanti', username })
    }
    
    // auth success
    const token = createToken(Query.to_query_string({ id: user.id, username: user.username }, SessionSchema))
    cookies.set(session_key, token)
    
    throw redirect(302, id_to_route['SLS'])
  },
  logout: async ({ cookies }) => {
    cookies.delete(session_key)
    throw redirect(302, '/')
  }
};