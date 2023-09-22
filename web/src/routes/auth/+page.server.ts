import { logout } from "$lib/auth";
import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
  logout
};