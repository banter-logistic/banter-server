import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { Api } from "lib/api";

export const load: LayoutServerLoad = async ({ locals: { auth } }) => {

  const pr = await Promise.all([
    Api.User.GetDriver({ driver_id: auth.user_id, tipe: 'driver' }),
    Api.Manifest.ListManifest({ driver_id: auth.user_id })
  ])

  if (!pr[0].success) {
    throw error(404, 'Terjadi Kesalahan saat meminta data driver')
  }

  if (pr[1].success == false) {
    throw error(404, 'Error, ' + pr[1].error.message)
  }

  return {
    auth,
    driver: pr[0].data,
    manifest: pr[1].success ? pr[1].data : []
  }
};
