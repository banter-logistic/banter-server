import { object as o, string, number } from "zod";
export { o }
export const s = string()
export const i = number()


export const publicRoutes = [
  '/auth','/api','/temp'
]

export const session_key = 'session_id'

export const SessionSchema = o({
  id: s,
  username: s
})

export const input_element = [
  "button",
  "fieldset",
  "input",
  "optgroup",
  "option",
  "select",
  "textarea",
]