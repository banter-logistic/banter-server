import type { Actions } from "@sveltejs/kit";
import { hash } from "bcrypt";
import { i, o, s, saltRounds } from "lib/const";
import type { PageServerLoad } from "./$types";
import type * as schema from "lib/database/schema";
import { select, displayAlamat } from "lib/database/util";
import { error } from "@sveltejs/kit";
import type { Pooling } from "lib/util/pooling";
import { date } from "lib/util/date";

const userInput = {
  username: s,
  nama: s,
  passwd: s,
}

const adminInput = o({
  ...userInput,
  level: i
})

const salesInput = o({
  ...userInput,
  pos_id: i,
})

const driverInput = o({
  ...userInput,
  jenis_kendaraan: s,
  kubikase: i,
  nohp: s,
  plat_nomor: s,
})

const alamatInsert = {
  alamat_detail: s,
  alamat_kabupaten: s,
  alamat_kecamatan: s,
  alamat_kelurahan: s,
  alamat_kodepos: s,
  alamat_provinsi: s
}

const posInput = o({
  ...alamatInsert,
  pos_nama: s,
  pos_tipe: s,
})

const insertUser = async (
  pool: Pooling, insertId: number, kode: string,
  i: { nama: string, username: string, passwd: string }
) => {
  await pool.insertFormat<schema.user>('user',{
    user_id: insertId,
    user_kode: kode,
    user_nama: i.nama,
    user_username: i.username,
    user_passwd: await hash(i.passwd,saltRounds)
  });
}

const insertDriver = (tipe: 'DRV'|'KUR'): typeof actions[''] => 
  async ({ locals: { pool, formData } }) => {
    const {
      jenis_kendaraan, kubikase,
      nohp, plat_nomor, 
      ...user
    } = await formData(driverInput)
    
    const { insertId } = await pool.insertFormat<schema.driver>('driver',{
      driver_jenis_kendaraan: jenis_kendaraan,
      driver_kubikase: kubikase,
      driver_nohp: nohp,
      driver_plat_nomor: plat_nomor,
      driver_tipe: tipe
    })

    await insertUser(pool, insertId, tipe, user)
    
    return { success: true }
  }

export const actions: Actions = {
  admin: async ({ locals: { pool, formData } }) => {
    
    const { level, ...user } = await formData(adminInput)
    
    const { insertId } = await pool.insertFormat<schema.admin>('admin',{
      admin_level: level
    });
    
    await insertUser(pool, insertId, 'ADM', user)
    
    return { success: true }
  }, 
  sales: async ({ locals: { pool, formData } }) => {
    const { pos_id, ...user } = await formData(salesInput)
    
    const { insertId } = await pool.insertFormat<schema.sales>('sales',{
      sales_pos_id: pos_id,
    })
    
    await insertUser(pool, insertId, 'CTR', user)
    
    return { success: true }
  },
  driver: insertDriver('DRV'),
  kurir: insertDriver('KUR'),
  operator: async ({ locals: { pool, formData }}) => {
    const { pos_id, ...user } = await formData(salesInput)
    
    const { insertId } = await pool.insertFormat<schema.operator>('operator',{
      operator_pos_id: pos_id
    })
    
    await insertUser(pool, insertId, 'OPR', user)
    
    return { success: true }
  },
  pos: async ({ locals: { pool, formData } }) => {
    const { pos_nama, pos_tipe, ...alamat } = await formData(posInput)
    
    const { insertId: alamatId } = await pool.insertFormat<schema.alamat>('alamat',alamat)
    
    await pool.insertFormat<schema.pos>('pos',{
      pos_alamat_id: alamatId,
      pos_nama,
      pos_tipe,
    })
    
    return { success: true }
  }
};



/// LOAD


export const load: PageServerLoad = async ({ locals: { pool }, params }) => {
  const load = (loadHandle as any)[params.user ?? 'admin']
  
  if (!load) throw error(404, { code: 'NOT_FOUND', message: params.user + ' tidak ada' })
  const data = await load(pool)
  
  if (data.length != 0){
    (data as Array<any>)?.map( (e,i) => {
      if (e.user_dibuat) {
        e.user_dibuat = date(data[i].user_dibuat).display
      }
    })
  }
  return {
    data,
    route: params.user ?? 'admin',
  }
};

const admin = async (pool: Pooling) => {
  const user = select.user
  const admin = select.admin
  
  const data = await pool.query<schema.admin & schema.user>(`
  select 
    ${user('user_id','user_username','user_nama','user_dibuat')},
    ${admin('admin_level')}
  from admin 
  left join user on ${user('user_kode')} = 'ADM' and ${user('user_id')} = ${admin('admin_id')}
  limit 10`)
  return data
}

const sales = async (pool: Pooling) => {
  const user = select.user
  const sales = select.sales
  const pos = select.pos
  
  const data = await pool.query<schema.sales & schema.user & Pick<schema.pos,'pos_nama'>>(`
  select 
    ${user('user_id','user_username','user_nama','user_dibuat')},
    ${pos('pos_nama')}
  from sales
  left join user on ${user('user_kode')} = 'SLS' and ${user('user_id')} = ${sales('sales_id')}
  left join pos on ${pos('pos_tipe')} = 'CTR' and ${pos('pos_id')} = ${sales('sales_pos_id')}
  limit 10`)
  
  return data
};

const driver = async (pool: Pooling) => {
  const user = select.user
  const driver = select.driver
  
  const data = await pool.query<schema.driver & schema.user>(`
  select
    ${user('user_id','user_username','user_nama','user_dibuat')},
    ${driver('driver_nohp','driver_jenis_kendaraan','driver_kubikase',
      'driver_plat_nomor')
    }
  from driver
  left join user on ${user('user_kode')} = 'DRV'
  where ${driver('driver_tipe')} = 'DRV'
  limit 10`)
  
  return data
}

const kurir = async (pool: Pooling) => {
  const user = select.user
  const driver = select.driver
  
  const data = await pool.query<schema.driver & schema.user>(`
  select
    ${user('user_id','user_nama','user_username','user_dibuat')},
    ${driver('driver_nohp','driver_jenis_kendaraan','driver_kubikase',
      'driver_plat_nomor')
    }
  from driver
  left join user on ${user('user_kode')} = 'KUR'
  where ${driver('driver_tipe')} = 'KUR'
  limit 10`)
  
  return data
};

const operator = async (pool: Pooling) => {
  const user = select.user
  const operator = select.operator
  const pos = select.pos
  
  const data = await pool.query<schema.operator & schema.user & schema.pos>(`
  select
    ${user('user_id','user_nama','user_username','user_dibuat')},
    ${pos('pos_nama','pos_tipe')}
    from operator
    left join user on ${user('user_kode')} = 'OPR'
    left join pos on ${operator('operator_pos_id')} = ${pos('pos_id')}
    limit 10`)
    
  return data
}

const pos = async (pool: Pooling) => {
  const alamat = select.alamat
  const pos = select.pos
  
  const posQuery = pos('pos_id','pos_nama','pos_tipe','pos_dibuat').replaceAll(/pos_\w+?`/g,(e) => `${e} as ${e.replaceAll(/(`|pos_)/g,'')}` )
  
  const data = await pool.query(`
  select
    ${posQuery},
    ${alamat()}
  from pos
  left join alamat on ${alamat('alamat_id')} = ${pos('pos_id')}
  limit 10`)
  
  data.map( (e,i) => {
    data[i].dibuat = date(e.dibuat).display
    
    const alamat = displayAlamat(data[i])
    for (const key in data[i]) {
      if (key.startsWith('alamat_')) {
        delete data[i][key]
      }
    }
    data[i]["alamat"] = alamat
  })
  
  return data as (schema.pos & schema.alamat)[]
}

const loadHandle = { admin, sales, driver, kurir, operator, pos }

export type pageData = { [x in keyof typeof loadHandle]: {data: Awaited<ReturnType<typeof loadHandle[x]>>} }