import { json, type RequestHandler } from "@sveltejs/kit";
import { Err, None, safeParseInt } from "lib/util";
import { Api } from "lib/api";

export const GET: RequestHandler = async ({ url }) => {
  
  const q = url.searchParams.get('q')
  
  if (!q)
    return json(Err('invalid data'));
    
  const id = safeParseInt(q);
  
  if (!id.success) return json(None('ID diperlukan'))
    
  const data = await Api.Manifest.GetManifest({ manifest_id: id.data })
  
  return json(data)
};