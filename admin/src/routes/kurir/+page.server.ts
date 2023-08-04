import type { Actions } from "@sveltejs/kit";
import { logoutHandler } from "$lib/auth";

export const actions: Actions = {
  logout: logoutHandler,
}
