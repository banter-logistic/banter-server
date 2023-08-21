import { fail, type Actions, redirect, error } from "@sveltejs/kit";

import { toQuery } from "lib/util/query";
import { SessionSchema, o, s, session_key } from "lib/const";
import { id_to_route } from "lib/database";
import { encryptToken } from "lib/auth";
import type { user } from "lib/database/schema";
import { compare } from "bcrypt";
import { select } from "lib/database/util";


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
    
    // auth success
    const token = encryptToken(toQuery({ id: `${user.user_kode}-${user.user_id}`, username: user.user_username }, SessionSchema))
    cookies.set(session_key, token)
    
    throw redirect(302, id_to_route[ user.user_kode ])
  },
  logout: async ({ cookies }) => {
    cookies.delete(session_key)
    throw redirect(302, '/')
  }
};
