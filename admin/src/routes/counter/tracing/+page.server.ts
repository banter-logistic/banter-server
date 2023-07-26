import type { Actions } from "@sveltejs/kit";
import { Api } from "lib/handler/api";
import type { TracingList } from "lib/handler/schema";
import { Err, safeParseInt } from "lib/help";


export const actions: Actions = {
  default: async ({ request }) => {    
    const body = await request.formData()
    const valid = safeParseInt(body.get('id'))
    
    if (!valid.success) {
      return Err<typeof TracingList["Output"]>()
    }
    
    return await Api.TracingList({ barang_id: valid.data }, false )
  }
};