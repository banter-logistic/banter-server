import type { Pooling } from "lib/util/pooling";
import type { PageServerLoad } from "./$types";
import type * as schema from 'lib/database/schema'
import { select } from "lib/database/util";

export const load: PageServerLoad = async ({ locals: { pool }, params: { user } }) => {
  const load = (loadHandle as any)[user ?? 'admin']
  
  // if (!load) throw error(404, { code: 'NOT_FOUND', message: user + ' tidak ada' })
  
  return {
    data: await load?.(pool),
    route: user ?? 'admin',
  }
};

const sales = async (pool: Pooling) => {
  const pos = select.pos
  
  const posList = await pool.query<Pick<schema.pos,'pos_nama'|'pos_id'>>(`
  select ${pos('pos_nama','pos_id')} from pos
  where ${pos('pos_tipe')} = 'CTR'
  `)
  
  return posList.map( e => ({nama: e.pos_nama, id: e.pos_id}) )
}

const loadHandle = { sales }

export type load = { [x in keyof typeof loadHandle]: { data: Awaited<ReturnType<typeof loadHandle[x]>> } }