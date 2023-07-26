import type { Actions } from "@sveltejs/kit";
import { Api } from "lib/handler/api";
import type { GatewayOut } from "lib/handler/schema";
import { Err, None, safeParseInt } from "lib/util";

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    
    const subjek = safeParseInt(data.get('driver'))
    const tipe = data.get('tipe')
    const no_resi = []
    const ent = data.entries()
    
    if (!subjek.success || !tipe)
      return None('Kesalahan data, coba lagi')
    
    data.delete('driver')
    data.delete('tipe')
    
    for (const [id] of ent) {
      const val = safeParseInt(id)
      
      if (!val.success)
        return None('Kesalahan no resi, coba lagi')
      
      no_resi.push(val.data)
    }
    if (no_resi.length == 0) None('Kesalahan no resi data, coba lagi')
    
    return await Api.GatewayOut({ subjek: subjek.data, no_resi, tipe: tipe as any },false)
  }
};