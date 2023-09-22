

import { login } from "$lib/auth";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async (event) => {
    
    const a = await login(event)
    
    if (a)
      throw redirect(302, '/')
    
    else
      return { msg: 'email atau password salah' }
  }
};