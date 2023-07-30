import type { Actions } from "@sveltejs/kit";
import { Api } from "lib/api";
import { Err, safeParseInt } from "lib/util";

export const actions: Actions = {
  default: async ({ request }) => {
    
    const body = await request.formData()
    
    const pos_id_val = safeParseInt(body.get('pos_id'))
    const manifest_id_val = safeParseInt(body.get('manifest_id'))
    const ent = body.entries()
    const no_resi = []
    
    if (!pos_id_val.success || !manifest_id_val.success) {
      return Err<api.Gateway.GatewayIn.Output>('Invalid pos_id / manifest_id')
    }
    
    body.delete('pos_id')
    body.delete('manifest_id')
    
    for (const [id] of ent) {
      const val = safeParseInt(id)
      
      if (!val.success)
        return Err<api.Gateway.GatewayIn.Output>('No resi invalid')
      
      no_resi.push(val.data)
    }
    
    
    return await Api.Gateway.GatewayIn({
      manifest_id: manifest_id_val.data,
      pos_id: pos_id_val.data,
      no_resi,
    })
  }
};