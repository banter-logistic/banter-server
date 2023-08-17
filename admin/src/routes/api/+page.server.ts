import { fail, type Actions, redirect } from "@sveltejs/kit";
import { Query, zodUrlSafeParse } from "lib";
import { SessionSchema, o, s, session_key } from "lib/const";
import { id_to_route } from "lib/database";
import { setTimeout } from "node:timers/promises";

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    await setTimeout(2000)
    const form = await request.formData()
    const auth = zodUrlSafeParse(o({ username: s, passwd: s }) , form)
    
    if (!auth.success) {
      return fail(400, { msg: 'data invalid, coba lagi' })
    }
    
    // database check
    const { username, passwd } = auth.data
    if (username == 'mason' && passwd == 'mason123') {
      cookies.set(session_key, Query.to_query_string({ id: 'SLS-00001', username: "Mason Ct" }, SessionSchema))
    } else {
      return fail(400, { msg: 'username atau password salah', username })
    }
    
    throw redirect(302, id_to_route['SLS'])
  },
  logout: async ({ cookies }) => {
    cookies.delete(session_key)
    throw redirect(302, '/')
  }
};