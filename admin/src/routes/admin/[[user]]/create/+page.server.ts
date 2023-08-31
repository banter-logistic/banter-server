
import { superValidate } from "sveltekit-superforms/server";
import * as zod from "lib/zod/input";
import { capital } from "lib";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params: { user } }) => {
  const _user = capital(user ?? 'admin')

  const form = await superValidate( (zod as any)[_user + 'Input'] );
  
  return { form, route: user ?? 'admin' }
}) satisfies PageServerLoad;


export { actions } from "./action"