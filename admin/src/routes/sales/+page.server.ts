import type { Actions } from "@sveltejs/kit";
import { logout } from "../auth/handler";

export const actions: Actions = {
  logout,
};