import { redirect, type Action } from "@sveltejs/kit";
import { Api } from "lib/api";

export const logout: Action = async ({ cookies }) => {
  const session_id = cookies.get('session_id')
  
  if (!session_id) throw redirect(303, '/')
  
  await Api.Auth.Logout({ session_id })
  cookies.delete('session_id')
  throw redirect(303, '/')
}

export const login: Action = async ({ request, cookies }) => {
    
  const form = await request.formData()
  const input = Object.fromEntries(form.entries()) as any
  
  const result = await Api.Auth.Login(input)
  
  if (result.success == false || result.success == null) {
    return { result: result, username: input.username ?? '' }
  }
  
  const session = result.data
  
  cookies.set('session_id',session.session_id)
  
  throw redirect(303,'/' + session.tipe)
}