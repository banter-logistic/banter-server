import type { Actions } from "@sveltejs/kit";
import { Api } from "lib/api";

export const actions: Actions = {
  default: async () => {
    const a  = await Api.Auth.Session({ cookie: '' })
    
  }
};