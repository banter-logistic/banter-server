import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  
  const msg = cookies.get('msg')
  
  if (msg) cookies.delete('msg')
  
  return {
    msg
  }
};