import type { sales, user, pos } from "lib/database/schema";
import { select } from "lib/database/util";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { pool } }) => {
  const user = select.user
  const sales = select.sales
  const pos = select.pos
  
  const data = await pool.query<sales & user & Pick<pos,'pos_nama'>>(`
  select 
    ${user('user_id','user_username','user_nama','user_dibuat')},
    ${pos('pos_nama')}
  from sales
  left join user on ${user('user_kode')} = 'SLS' and ${user('user_id')} = ${sales('sales_id')}
  left join pos on ${pos('pos_tipe')} = 'CTR' and ${pos('pos_id')} = ${sales('sales_pos_id')}
  limit 10`)
  
  const posList = (await pool.query<Pick<pos,'pos_nama'>>(`
  select ${pos('pos_nama')} from pos where ${pos('pos_tipe')} = 'CTR'
  `)).map( e => e.pos_nama )
  
  return { data, posList }
};

