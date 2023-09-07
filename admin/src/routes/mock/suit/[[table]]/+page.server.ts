import type { PageServerLoad } from "./$types";
import { Master } from "lib/script/suit";

export const load: PageServerLoad = async ({ params: { table } }) => {
  
  table ??= 'airline'
  
  // @ts-ignore
  const data = Master[table]
  
  return { data, title: table.split('-').map(e=>e[0].toUpperCase() + e.slice(1)).join(' ') }
};