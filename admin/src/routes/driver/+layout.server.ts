import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { Api } from "lib/api";

export const load: LayoutServerLoad = async ({ locals: { auth } }) => {

  const pr = await Promise.all([
    Api.User.GetDriver({ driver_id: auth.user_id, tipe: auth.tipe as any, nocheck: true }),
    Api.Manifest.ListManifest({ driver_id: auth.user_id })
  ])

  if (pr[0].success == false) {
    console.log('[SERVER ERR]')
    console.error(pr[0].error)
    console.log('[/SERVER ERR]')
    throw error(404, { message: 'Error, ' + pr[0].error.message, code: 'FETCH_ERR' })
  }
  
  if (pr[0].success == null) {
    throw error(404, { message: 'Error, ' + pr[0].message, code: 'RESPONSE_ERR' })
  }

  if (pr[1].success == false) {
    console.log('[SERVER ERR]')
    console.error(pr[1].error)
    console.log('[/SERVER ERR]')
    throw error(404, { message: 'Error, ' + pr[1].error.message, code: 'FETCH_ERR' })
  }
  
  if (pr[1].success == null) {
    throw error(404, { message: 'Error, ' + pr[1].message, code: 'RESPONSE_ERR' })
  }

  return {
    auth,
    driver: pr[0].data,
    manifest: pr[1].data
  }
};
