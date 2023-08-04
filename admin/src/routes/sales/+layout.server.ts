import { error, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { Api } from "lib/api";

export const load: LayoutServerLoad = async ({ cookies, locals: { auth } }) => {
  
  if (auth.tipe != 'sales') {
    cookies.set('msg','role anda bukan disana')
    console.log('WRONG TIPE',auth)
    throw redirect(303, '/')
  }
  
  const session = await Api.User.GetSales({ sales_id: auth.user_id });
  
  if (!session.success) {
    // @TODO: redirect if user_id not correspond to any sales
    throw error(500, {
      message: 'tidak dapat mengambil data', code: 'FETCH_ERR'
    })
  }
  const queries = await Api.Barang.BarangCounterList({ pos_id: session.data.pos_id })
  return { 
    queries,
    session: session.data,
  }
};