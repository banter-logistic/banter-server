import { json, type RequestHandler } from "@sveltejs/kit";
import { Api } from "lib/api";
import { safeParseInt } from "$lib";

export const GET: RequestHandler = async ({ url }) => {
  
  const param = url.searchParams.get('q')
  const id = safeParseInt(param)
  
  if (!id.success) return json(None('Manifest id diperlukan'))
  
  const data = await Api.Manifest.GetManifest({ manifest_id: id.data })
  
  return json(data)
};