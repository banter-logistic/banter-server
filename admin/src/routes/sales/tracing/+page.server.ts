import type { Actions } from "@sveltejs/kit";
import { Api } from "lib/api";
import { Err, safeParseInt } from "lib/util";


export const actions: Actions = {
  default: async ({ request }) => {    
    const body = await request.formData()
    const valid = safeParseInt(body.get('id'))
    
    if (!valid.success) {
      return Err()
    }
    
    return await Api.Tracing.TracingList({ barang_id: valid.data })
  }
};