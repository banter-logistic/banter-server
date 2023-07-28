import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { Api } from "lib/api";

export const load: LayoutServerLoad = async ({ cookies }) => {
  const cookie = cookies.get('session_id')
  
  if (!cookie)
    throw redirect(302,'/');
  
  const session = await Api.Auth.GetSalesSession({ cookie })
  
  if (session.success == null) {
    cookies.delete('session_id')
    cookies.set('msg','silahkan login kembali')
    throw redirect(302,'/');
  }
  
  if (session.success == false) {
    cookies.delete('session_id')
    cookies.set('msg','server error, silahkan login kembali')
    throw redirect(302,'/');
  }
  
  return { 
    queries: await Api.Barang.BarangCounterList({ pos_id: session.data.pos_id }),
    session: session.data,
  }
};