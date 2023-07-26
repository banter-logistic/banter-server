import type { LayoutServerLoad } from "./$types";
import { Api } from "$lib/api";

export const load: LayoutServerLoad = async ({ locals: { auth } }) => {
  return { 
    queries: await Api.Barang.BarangList({ subjek: auth.subjek }) ,
    auth,
  }
};