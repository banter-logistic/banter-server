import { fail, type Action, type Actions, error } from "@sveltejs/kit";
import { hash } from "bcrypt";
import { saltRounds } from "lib/const";
import type * as schema from "lib/database/schema";
import { table as t } from "lib/database/util";
import type { Pooling } from "lib/util/pooling";
import { userId } from "lib/database";
import { AdminInput, SalesInput, PelangganInput, PosInput, DriverInput } from "lib/zod/input";
import { superValidate as valider, setError } from "sveltekit-superforms/server";
import type { SuperValidated } from "sveltekit-superforms";

/// ADMIN

const admin: Action = async ({ locals: { pool, superForm } }) => {
  const { valid, data: { level, ...user } } = await superForm(AdminInput)
  
  if (!valid) {
    return fail(400);
  }
  
  const { insertId } = await pool.insertFormat<schema.admin>(t.admin,{
    admin_level: level
  });
  
  try { // TODO, somehow automate
    await insertUser(pool, insertId, userId.ADM, user)
  } catch (error: any) {
    await pool.query('delete from admin where admin_id = ?',[insertId])
    await pool.query('ALTER TABLE admin AUTO_INCREMENT = ?',[insertId])
    throw error
  }
  
  return { success: true, _msg: 'Admin berhasil ditambahkan' }
}

/// SALES

const sales: Action = async ({ locals: { pool, superForm } }) => {
  const { valid, data: {pos_id, ...user} } = await superForm(SalesInput)
  
  if (!valid) {
    return fail(400);
  }
  
  const { insertId } = await pool.insertFormat<schema.sales>(t.sales,{
    sales_pos_id: pos_id,
  })
  
  try { // TODO, somehow automate
    await insertUser(pool, insertId, userId.SLS, user)
  } catch (error: any) {
    await pool.query('delete from sales where sales_id = ?',[insertId])
    await pool.query('ALTER TABLE sales AUTO_INCREMENT = ?',[insertId])
    throw error
  }
  
  return { success: true, _msg: 'Sales berhasil ditambahkan' }
}

/// OPERATOR
const operator: Action = async ({ locals: { pool, superForm }}) => {
  const { valid, data: { pos_id, ...user }} = await superForm(SalesInput)
  
  if (!valid) {
    return fail(400);
  }
  
  const { insertId } = await pool.insertFormat<schema.operator>(t.operator,{
    operator_pos_id: pos_id
  })
  
  try { // TODO, somehow automate
    await insertUser(pool, insertId, userId.OPR, user)
  } catch (error: any) {
    await pool.query('delete from operator where operator_id = ?',[insertId])
    await pool.query('ALTER TABLE operator AUTO_INCREMENT = ?',[insertId])
    throw error
  }
  
  return { success: true, _msg: 'Operator berhasil ditambahkan' }
}

/// POS

const pos: Action = async ({ locals: { pool, superForm } }) => {
  const { valid, data: {pos_nama, pos_tipe, ...alamat} } = await superForm(PosInput)
  
  if (!valid) {
    return fail(400);
  }
  
  const { insertId: alamatId } = await pool.insertFormat<schema.alamat>(t.alamat,alamat)
  
  await pool.insertFormat<schema.pos>(t.pos,{
    pos_alamat_id: alamatId,
    pos_nama,
    pos_tipe,
  })
  
  return { success: true, _msg: 'Pos berhasil ditambahkan' }
}

/// PELANGGAN

const pelanggan: Action = async ({ locals: { pool, superForm } }) => {
  const { valid, data:{nama, passwd, username, nohp, ...alamat} } = await superForm(PelangganInput)
  
  if (!valid) {
    return fail(400);
  }
  
  const { insertId: alamatId } = await pool.insertFormat<schema.alamat>(t.alamat,alamat)
  
  const { insertId } = await pool.insertFormat<schema.pelanggan>(t.pelanggan,{
    pelanggan_alamat_id: alamatId,
  })
  
  try { // TODO, somehow automate
    await insertUser(pool, insertId, userId.PLG, { nama, passwd, username, nohp })
  } catch (error: any) {
    await Promise.all([
      pool.query('delete from alamat where alamat_id = ?',[alamatId]),
      pool.query('ALTER TABLE alamat AUTO_INCREMENT = ?',[alamatId]),
      pool.query('delete from pelanggan where pelanggan_id = ?',[insertId]),
      pool.query('ALTER TABLE pelanggan AUTO_INCREMENT = ?',[insertId]),
    ])
    throw error
  }
  
  
  return { success: true, _msg: 'Pelanggan berhasil ditambahkan' }
}

const insertUser = async (
  pool: Pooling, insertId: number, kode: keyof typeof userId,
  i: { nama: string, username: string, passwd: string, nohp: string }
) => {
  await pool.insertFormat<schema.user>(t.user,{
    user_id: insertId,
    user_kode: kode,
    user_nama: i.nama,
    user_username: i.username,
    user_nohp: i.nohp,
    user_passwd: await hash(i.passwd,saltRounds)
  });
}


/// DRIVER & KURIR

const insertDriver = (tipe: 'DRV'|'KUR'): typeof actions[''] => 
async ({ locals: { pool, superForm } }) => {
  const { valid, data:{jenis_kendaraan, kubikase, plat_nomor, ...user} } = await superForm(DriverInput)
  
  if (!valid) {
    return fail(400);
  }
  
  const { insertId } = await pool.insertFormat<schema.driver>(t.driver,{
    driver_jenis_kendaraan: jenis_kendaraan,
    driver_kubikase: kubikase,
    driver_plat_nomor: plat_nomor,
    driver_tipe: tipe
  })

  
  try { // TODO, somehow automate
    await insertUser(pool, insertId, tipe, user)
  } catch (error: any) {
    const table = tipe == 'DRV' ? 'driver' : 'kurir'
    await pool.query(`delete from ${table} where ${table}_id = ?`,[insertId])
    await pool.query(`ALTER TABLE ${table} AUTO_INCREMENT = ?`,[insertId])
    throw error
  }
  // await insertUser(pool, insertId, tipe, user)
  
  return { success: true, _msg: ((tipe == 'DRV' ? 'Driver' : 'Kurir') + ' berhasil ditambahkan') }
}

/**
 * main actions
 * here where we put all actions
 */
const _actions: Actions = {
  admin,
  sales,
  driver: insertDriver(userId.DRV),
  kurir: insertDriver(userId.KUR),
  operator,
  pelanggan,
  pos
};

/**
 * automate returning `form` for superForm
 * - when action return `_msg` property, it will be displayed in the form
 */
export const actions: Actions = Object.fromEntries(Object.entries(_actions).map( ([k,v])=>{
  const proxy: Action = async (event) => {
    let form: SuperValidated<any, any> = {} as any
    
    event.locals.superForm = async (zod) => {
      const v = await valider(event, zod)
      form = v
      return v
    }
    
    let res = {} as any
    
    try {
      res = await v(event)
    } catch (error: any) {
      if (error.code == 'ER_DUP_ENTRY') {
        setError(form, `username`, 'Username sudah digunakan, silahkan pilih yang lain')
        return fail(400,{ form })
      } else {
        throw error
      }
    }
    
    if (res?._msg) {
      form.message = res._msg
      delete res._msg
    }
    
    return { ...res, form }
  }
  return [k,proxy]
}))


