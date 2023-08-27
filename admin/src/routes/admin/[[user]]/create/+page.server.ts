import type { Pooling } from "lib/util/pooling";
import type { PageServerLoad } from "./$types";
import type * as schema from 'lib/database/schema'
import { select, table as t } from "lib/database/util";
import { posId } from "lib/database";

export const load: PageServerLoad = async ({ locals: { pool }, params: { user }, fetch }) => {
  const load = (loadHandle as any)[user ?? 'admin']
  
  return {
    data: await load?.(pool,fetch),
    route: user ?? 'admin',
  }
};

const sales = async (pool: Pooling) => {
  const pos = select.pos
  
  const posList = await pool.query<Pick<schema.pos,'pos_nama'|'pos_id'>>(`
  select ${pos('pos_nama','pos_id')} from ${t.pos}
  where ${pos('pos_tipe')} = '${posId.CTR}'
  `)
  
  return posList.map( e => ({nama: e.pos_nama, id: e.pos_id}) )
}

const pos = async (_:any,_fetch: typeof fetch) => {
  const data = await _fetch('/api/kodepos').then(e=>e.text())
  
  return { provinsi: JSON.parse(data).data as string[] }
}

const loadHandle = { sales, operator: sales, pos, pelanggan: pos }

export type load = { [x in keyof typeof loadHandle]: { data: Awaited<ReturnType<typeof loadHandle[x]>> } }