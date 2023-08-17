import { z, type SafeParseReturnType } from "zod";
export const o = z.object
export const s = z.string()
export const i = z.number()


export const publicRoutes = [
  '/auth','/api'
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