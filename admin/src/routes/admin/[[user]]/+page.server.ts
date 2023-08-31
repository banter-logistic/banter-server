import type { PageServerLoad } from "./$types";
import type * as schema from "lib/database/schema";
import { select, displayAlamat, table as t } from "lib/database/util";
import { error } from "@sveltejs/kit";
import type { Pooling } from "lib/util/pooling";
import { date } from "lib/util/date";
import { userId, nameToId } from "lib/database";

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
    ${driver('driver_jenis_kendaraan','driver_kubikase','driver_plat_nomor')}
  from ${t.driver}
  left join ${t.user} on ${user('user_id')} = ${driver('driver_id')} and ${user('user_kode')} = '${userId.DRV}'
  where ${driver('driver_tipe')} = '${userId.DRV}'
  limit 10`)
  
  data.map( (e,i) => {
    for (const key in data[i]) {
      if (key.startsWith('driver_')) {
        // @ts-ignore
        data[i][key.replace('driver_','')] = data[i][key]
        // @ts-ignore
        delete data[i][key]
      }
    }
  })
  
  return data
}

const kurir = async (pool: Pooling) => {
  const user = select.user
  const driver = select.driver
  
  const data = await pool.query<schema.driver & schema.user>(`
  select
    ${user('user_id','user_username','user_nama','user_dibuat')},
    ${driver('driver_jenis_kendaraan','driver_kubikase','driver_plat_nomor')}
  from ${t.driver}
  left join ${t.user} on ${user('user_id')} = ${driver('driver_id')} and ${user('user_kode')} = '${userId.KUR}'
  where ${driver('driver_tipe')} = '${userId.KUR}'
  limit 10`)
  
  data.map( (e,i) => {
    for (const key in data[i]) {
      if (key.startsWith('driver_')) {
        // @ts-ignore
        data[i][key.replace('driver_','')] = data[i][key]
        // @ts-ignore
        delete data[i][key]
      }
    }
  })
  
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