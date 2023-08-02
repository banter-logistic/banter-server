import type { Actions } from "@sveltejs/kit";
import { logoutHandler, loginHandler } from "$lib/auth";
import type { PageServerLoad } from "./$types";

export const actions: Actions = {
  login: loginHandler,
  logout: logoutHandler
};

export const load: PageServerLoad = async ({ cookies, locals: { session } }) => {
  const msg = cookies.get('msg')
  if (msg) cookies.delete('msg')

  return {
    msg,
    session: session ? { username: session.username, target: session.tipe} : null
  }
};