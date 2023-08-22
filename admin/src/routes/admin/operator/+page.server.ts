import type { operator, user, pos } from "lib/database/schema";
import { select } from "lib/database/util";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { pool } }) => {
  const user = select.user
  const operator = select.operator
  const pos = select.pos
  
  const data = await pool.query<operator & user & pos>(`
  select
    ${user('user_id','user_nama','user_username','user_dibuat')},
    ${pos('pos_nama','pos_tipe')}
  from operator
  left join user on ${user('user_kode')} = 'OPR'
  left join pos on ${operator('operator_pos_id')} = ${pos('pos_id')}
  limit 10`)
  
  return { data }
};
