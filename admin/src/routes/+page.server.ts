import { id_to_route } from "lib/database";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, locals: { user } }) => {
  
  const message = cookies.get('msg')
  
  if (message) cookies.delete('msg')
  
  const session = user ? id_to_route[user.id.slice(0,3)] : null
  
  return {
    message, session
  }
};