import { json, type RequestHandler } from "@sveltejs/kit";
import type { pos } from "lib/database/schema";
import { select, table as t } from "lib/database/util";
import { posId } from "lib/database";

export type out = Pick<pos,'pos_nama'|'pos_id'>

/**
 * list pos data, for `sales` and `operator` insert
 */
export const GET: RequestHandler = async ({ locals: { pool } }) => {
  const pos = select.pos
  
  const posList = await pool.query<out>(`
  select ${pos('pos_nama','pos_id')} from ${t.pos}
  `)
  // where ${pos('pos_tipe')} = '${posId.CTR}'
  
  return json(posList)
};
