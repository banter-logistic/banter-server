import type { Actions } from "@sveltejs/kit";
import { logout } from "../auth/handler";
import type { PageServerLoad } from "./$types"
import { Api } from "lib/handler/api";
import { None, Ok, safeParseInt } from "lib/util";

export const load: PageServerLoad = async ({ locals: { auth } }) => {
  const queries = await Api.ManifestById({ user_id: auth.subjek }, false)
  return {
    queries,
    auth
  }
};

export const actions: Actions = {
  kurir: async ({ request }) => {
    console.log('aaaaaaaaaa')
    const body = await request.formData()
    const ent = body.entries()
    const no_resi = []
    
    const valid = safeParseInt(body.get('driver'))
    console.log(body.get('driver'))
    if (!valid.success)
      return None('Driver id invalid')
      
    body.delete('driver')
    
    for (const [id] of ent) {
      const val = safeParseInt(id)
      
      if (!val.success)
        return None('No resi invalid')
      
      no_resi.push(val.data)
    }
    
    if (no_resi.length != 0) {
      await Api.FinishBarang({ no_resi, subjek: valid.data }, false)
    }
    
    return Ok('nice')
  },
  logout
}