import { redirect, type RequestHandler } from "@sveltejs/kit";
import { Api } from "lib/api";

export const GET: RequestHandler = async ({ cookies }) => {
  const session_id = cookies.get('session_id')
  console.log('?',session_id)
  if (!session_id) throw redirect(303, '/')
  
  await Api.Auth.Logout({ session_id })
  cookies.delete('session_id')
  throw redirect(303, '/')
};