import { json, type RequestHandler } from "@sveltejs/kit";
import { None, safeParseInt } from "lib/util";
import { Api } from "lib/api";

export const GET: RequestHandler = async ({ url }) => {
  
  const q = safeParseInt(url.searchParams.get('q'))
  
  const tipe = url.searchParams.get('tipe')
  
  if (!q.success || !tipe)
    return json(None('Kesalahan data, coba lagi'));
    
  return json(await Api.User.GetDriver({ driver_id: q.data, tipe: tipe as any }))
};

// export const POST: RequestHandler = async ({ request }) => {
  
//   const data = await request.json()
  
//   return json( await Barang.insert(data) );
// };