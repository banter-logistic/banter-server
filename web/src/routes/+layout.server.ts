import { loadAuth } from "$lib/auth";
import type { LayoutServerLoad } from "./$types";




export const load: LayoutServerLoad = async (event) => {
  const auth = loadAuth(event)
  return { auth }
};