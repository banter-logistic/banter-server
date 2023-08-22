
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { capital } from "lib/util";

const modules = import.meta.glob('../form/*.svelte', { eager: true })

export const load: PageLoad = async ({ params: { user }, data }) => {
  const page = (modules as any)[`../form/${capital(user ?? 'admin')}.svelte`]
  
  if (!page) throw error(404, { code: 'NOT_FOUND', message: user + ' tidak ada' })
  
  return {
    page: page.default,
    ...data
  }
};