import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async () => ({ action: 'me', ok: 'nice' }),
  loged: async () => ({ action: 'form', me: 'nice' }),
};