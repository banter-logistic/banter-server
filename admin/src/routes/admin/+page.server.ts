import { i, o, s, saltRounds } from "lib/const";
import type { PageServerLoad } from "./$types";
import type { admin, user } from "lib/database/schema";
import { select } from "lib/database/util";
import type { Actions } from "@sveltejs/kit";
import { hash } from "bcrypt";

const adminInput = o({
  username: s,
  nama: s,
  passwd: s,
  level: i
})

export const actions: Actions = {
  default: async ({ locals: { pool, formData } }) => {
    
    const { username, nama, passwd, level } = await formData(adminInput)
    
    const { insertId } = await pool.insertFormat<admin>('admin',{
      admin_level: level
    });
    
    await pool.insertFormat<user>('user',{
      user_id: insertId,
      user_kode: 'ADM',
      user_nama: nama,
      user_username: username,
      user_passwd: await hash(passwd,saltRounds)
    });
    
    return { success: true }
  }
};

export const load: PageServerLoad = async ({ locals: { pool } }) => {
  const user = select.user
  const admin = select.admin
  
  const data = await pool.query<admin & user>(`
  select * from admin 
  left join user on ${user('user_kode')} = 'ADM' and ${user('user_id')} = ${admin('admin_id')}
  limit 10`)
  
  return { data }
};