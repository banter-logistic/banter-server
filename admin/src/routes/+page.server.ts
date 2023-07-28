import type { Actions } from "@sveltejs/kit";
import { logout, login } from "./auth/handler";
import type { PageServerLoad } from "./$types";

export const actions: Actions = {
  login, logout
};

export const load: PageServerLoad = async ({ cookies }) => {
  const msg = cookies.get('msg')
  if (msg)
    cookies.delete('msg')
  return {
    msg,
  }
};