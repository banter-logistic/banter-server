import type { pos, alamat } from "lib/database/schema";
import type { PageServerLoad } from "./$types";
import { select } from "lib/database/util";

export const load: PageServerLoad = async ({ locals: { pool } }) => {
  const alamat = select.alamat
  const pos = select.pos
  
  const data = await pool.query<pos & alamat>(`
  select * from pos
  left join alamat on ${alamat('alamat_id')} = ${pos('pos_id')}
  limit 10`)
  
  return { data }
};

