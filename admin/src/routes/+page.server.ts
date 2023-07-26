import type { Actions } from "@sveltejs/kit";
import { logout, login } from "./auth/handler";

export const actions: Actions = {
  login, logout
};