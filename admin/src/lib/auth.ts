import { redirect, type Cookies, type Action } from "@sveltejs/kit";
import { Api } from "lib/api";
import {  } from "$lib";


export const login = async (
  input: { username:string, passwd:string},
  cookies: Cookies
) => {
  const result = await Api.Auth.Login(input)
  
  if (result.success == false || result.success == null) {
    return { result: result, username: input.username ?? '' }
  }
  const session = result.data
  
  cookies.set('session_id',session.session_id)
  throw redirect(303,'/' + session.tipe)
}

export const logout = async (cookies: Cookies) => {
  const session_id = cookies.get('session_id')
  
  if (!session_id) throw redirect(303, '/')
  
  await Api.Auth.Logout({ session_id })
  cookies.delete('session_id')
  throw redirect(303, '/')
}

export const loginHandler: Action = async ({ request, cookies }) => {
  const form = await request.formData()
  const data = Object.fromEntries(form.entries()) as any
  return await login(data,cookies)
}
export const logoutHandler: Action = async ({ cookies }) => {
  return await logout(cookies)
}