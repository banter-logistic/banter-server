import type { Actions } from "@sveltejs/kit";
import { hash } from "bcrypt";
import { i, o, s, saltRounds } from "lib/const";
import type { PageServerLoad } from "./$types";
import type * as schema from "lib/database/schema";
import { select, displayAlamat, table as t } from "lib/database/util";
import { error } from "@sveltejs/kit";
import type { Pooling } from "lib/util/pooling";
import { date } from "lib/util/date";
import { userId, idToRoute, nameToId } from "lib/database";

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

const alamatInput = {
  alamat_detail: s,
  alamat_kabupaten: s,
  alamat_kecamatan: s,
  alamat_kelurahan: s,
  alamat_kodepos: s,
  alamat_provinsi: s
}

const posInput = o({
  ...alamatInput,
  pos_nama: s,
  pos_tipe: s,
})

const pelangganInput = o({
  ...alamatInput,
  ...userInput,
  nohp: s,
})

const insertUser = async (
  pool: Pooling, insertId: number, kode: keyof typeof userId,
  i: { nama: string, username: string, passwd: string }
) => {
  await pool.insertFormat<schema.user>(t.user,{
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
      jenis_kendaraan, kubikase, nohp, plat_nomor, ...user
    } = await formData(driverInput)
    
    const { insertId } = await pool.insertFormat<schema.driver>(t.driver,{
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
    
    const { insertId } = await pool.insertFormat<schema.admin>(t.admin,{
      admin_level: level
    });
    
    await insertUser(pool, insertId, userId.ADM, user)
    
    return { success: true }
  }, 
  sales: async ({ locals: { pool, formData } }) => {
    const { pos_id, ...user } = await formData(salesInput)
    
    const { insertId } = await pool.insertFormat<schema.sales>(t.sales,{
      sales_pos_id: pos_id,
    })
    
    await insertUser(pool, insertId, userId.SLS, user)
    
    return { success: true }
  },
  driver: insertDriver(userId.DRV),
  kurir: insertDriver(userId.KUR),
  operator: async ({ locals: { pool, formData }}) => {
    const { pos_id, ...user } = await formData(salesInput)
    
    const { insertId } = await pool.insertFormat<schema.operator>(t.operator,{
      operator_pos_id: pos_id
    })
    
    await insertUser(pool, insertId, userId.OPR, user)
    
    return { success: true }
  },
  pelanggan: async ({ locals: { pool, formData } }) => {
    const { nohp: pelanggan_nohp, nama, passwd, username, ...alamat } = await formData(pelangganInput)
    
    const { insertId: alamatId } = await pool.insertFormat<schema.alamat>(t.alamat,alamat)
    
    const { insertId } = await pool.insertFormat<schema.pelanggan>(t.pelanggan,{
      pelanggan_alamat_id: alamatId,
      pelanggan_nohp,
    })
    
    await insertUser(pool, insertId, userId.PLG, { nama, passwd, username })
    
  },
  pos: async ({ locals: { pool, formData } }) => {
    const { pos_nama, pos_tipe, ...alamat } = await formData(posInput)
    
    const { insertId: alamatId } = await pool.insertFormat<schema.alamat>(t.alamat,alamat)
    
    await pool.insertFormat<schema.pos>(t.pos,{
      pos_alamat_id: alamatId,
      pos_nama,
      pos_tipe,
    })
    
    return { success: true }
  }
};



/// LOAD
const clamp0 = (i: number) => i < 0 ? 0 : i
const dp = (i: number) => { return Array(clamp0(5 - i.toString().length)).fill('0').join('') + i.toString() }

export const load: PageServerLoad = async ({ locals: { pool }, params }) => {
  const param = params.user ?? 'admin'
  const load = (loadHandle as any)[param]
  
  if (!load) throw error(404, { code: 'NOT_FOUND', message: params.user + ' tidak ada' })
  const data = await load(pool)
  
  if (data.length != 0){
    (data as Array<any>)?.map( (e,i) => {
      if (e["user_dibuat"]) {
        e["user_dibuat"] = date(e["user_dibuat"]).display
      }
      if (e['user_id']) {
        // @ts-ignore
        e['user_id'] = nameToId[param] + '-' + dp(e['user_id'])
      }
      if (e['tipe']) {
        // @ts-ignore
        e['id'] = e['tipe'] + '-' + dp(e['id'])
      }
      
    })
  }
  return {
    data,
    route: param,
  }
};

const admin = async (pool: Pooling) => {
  const user = select.user
  const admin = select.admin
  
  const data = await pool.query<schema.admin & schema.user>(`
  select 
    ${user('user_id','user_username','user_nama','user_dibuat')},
    ${admin('admin_level')}
  from ${t.admin}
  left join ${t.user} on ${user('user_id')} = ${admin('admin_id')} and ${user('user_kode')} = '${userId.ADM}'
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
  from ${t.sales}
  left join ${t.user} on ${user('user_id')} = ${sales('sales_id')} and ${user('user_kode')} = '${userId.SLS}'
  left join ${t.pos} on ${pos('pos_id')} = ${sales('sales_pos_id')}
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
  from ${t.driver}
  left join ${t.user} on ${user('user_id')} = ${driver('driver_id')} and ${user('user_kode')} = '${userId.DRV}'
  where ${driver('driver_tipe')} = '${userId.DRV}'
  limit 10`)
  
  return data
}

const kurir = async (pool: Pooling) => {
  const user = select.user
  const driver = select.driver
  
  const data = await pool.query<schema.driver & schema.user>(`
  select
    ${user('user_id','user_username','user_nama','user_dibuat')},
    ${driver('driver_nohp','driver_jenis_kendaraan','driver_kubikase',
      'driver_plat_nomor')
    }
  from ${t.driver}
  left join ${t.user} on ${user('user_id')} = ${driver('driver_id')} and ${user('user_kode')} = '${userId.KUR}'
  where ${driver('driver_tipe')} = '${userId.KUR}'
  limit 10`)
  
  return data
};

const operator = async (pool: Pooling) => {
  const user = select.user
  const operator = select.operator
  const pos = select.pos
  
  const data = await pool.query<schema.operator & schema.user & schema.pos>(`
  select
    ${user('user_id','user_username','user_nama','user_dibuat')},
    ${pos('pos_nama','pos_tipe')}
  from ${t.operator}
  left join ${t.user} on ${user('user_id')} = ${operator('operator_id')} and ${user('user_kode')} = '${userId.OPR}'
  left join ${t.pos} on ${operator('operator_pos_id')} = ${pos('pos_id')}
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
  from ${t.pos}
  left join ${t.alamat} on ${alamat('alamat_id')} = ${pos('pos_alamat_id')}
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

const pelanggan = async (pool: Pooling) => {
  const plg = select.pelanggan
  const alamat = select.alamat
  const user = select.user
  
  const data = await pool.query(`
  select
    ${user('user_id','user_username','user_nama','user_dibuat')},
    ${plg('pelanggan_nohp')},
    ${alamat()}
  from ${t.pelanggan}
  left join ${t.user} on ${user('user_id')} = ${plg('pelanggan_id')} and ${user('user_kode')} = '${userId.PLG}'
  left join ${t.alamat} on ${alamat('alamat_id')} = ${plg('pelanggan_alamat_id')}
  limit 10
  `)
  
  data.map( (e,i) => {
    const alamat = displayAlamat(data[i])
    for (const key in data[i]) {
      if (key.startsWith('alamat_')) {
        delete data[i][key]
      }
    }
    data[i]["alamat"] = alamat
  })
  
  return data as (schema.user & schema.alamat & schema.pelanggan)[]
}

const loadHandle = { admin, sales, driver, kurir, operator, pos, pelanggan }

export type pageData = { [x in keyof typeof loadHandle]: {data: Awaited<ReturnType<typeof loadHandle[x]>>} }