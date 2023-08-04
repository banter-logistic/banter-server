import { Api } from "lib/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return await Api.Manifest.GetManifest({ manifest_id: 6 })
};