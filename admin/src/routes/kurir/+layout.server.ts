import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { Api } from "lib/api";

export const load: LayoutServerLoad = async ({ locals: { auth } }) => {

  const [driver, manifest] = await Promise.all([
    Api.User.GetDriver({ driver_id: auth.user_id, tipe: auth.tipe as any, nocheck: true }),
    Api.Manifest.ManifestById({ kurir_id: auth.user_id })
    // Api.Manifest.ListManifest({ driver_id: auth.user_id })
  ])

  if (driver.success == false) {
    console.log('[SERVER ERR]')
    console.error(driver.error)
    console.log('[/SERVER ERR]')
    throw error(404, { message: 'Error, ' + driver.error.message, code: 'FETCH_ERR' })
  }
  
  if (driver.success == null) {
    throw error(404, { message: 'Error, ' + driver.message, code: 'RESPONSE_ERR' })
  }

  if (manifest.success == false) {
    console.log('[SERVER ERR]')
    console.error(manifest.error)
    console.log('[/SERVER ERR]')
    throw error(404, { message: 'Error, ' + manifest.error.message, code: 'FETCH_ERR' })
  }
  
  if (manifest.success == null) {
    throw error(404, { message: 'Error, ' + manifest.message, code: 'RESPONSE_ERR' })
  }

  return {
    auth,
    driver: driver.data,
    manifest: manifest.data
  }
};
