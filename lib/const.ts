import { object as o, string, number, z } from "zod";
export { o }
export const s = string()
export const i = number()

export const publicRoutes = [
  '/auth','/api','/temp','/warehouse'
]

export const session_key = 'session_id'
export const saltRounds = 10

export const SessionSchema = o({
  id: z.number(),
  kode: s,//z.enum(['ADM','OPR','PLG','SLS']),
  username: s,
}).passthrough()

export const input_element = [
  "button",
  "fieldset",
  "input",
  "optgroup",
  "option",
  "select",
  "textarea",
]