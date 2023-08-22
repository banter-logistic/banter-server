import type { driver, user, pos } from "lib/database/schema";
import { select } from "lib/database/util";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { pool } }) => {
  const user = select.user
  const driver = select.driver
  
  const data = await pool.query<driver & user>(`
  select
    ${user('user_id','user_nama','user_username','user_dibuat')},
    ${driver('driver_nohp','driver_jenis_kendaraan','driver_kubikase',
      'driver_plat_nomor')
    }
  from driver
  left join user on ${user('user_kode')} = 'DRV'
  where ${driver('driver_tipe')} = 'DRV'
  limit 10`)
  
  return { data }
};
