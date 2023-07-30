import type { Actions } from "@sveltejs/kit";
import { Api } from "lib/api";
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
    if (no_resi.length == 0) 
      return None('Kesalahan no resi data, coba lagi')
    
    const gateResult = await Api.Gateway.GatewayOut({ driver_id: subjek.data, no_resi })
    console.log(gateResult)
    return gateResult
  }
};