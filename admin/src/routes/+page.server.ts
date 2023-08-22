import { idToRoute } from "lib/database";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, locals: { user } }) => {
  
  const message = cookies.get('msg')
  
  if (message) cookies.delete('msg')
  
  const session = user ? idToRoute[user.id.slice(0,3)] : null
  
  return {
    message, session
  }
};