
// Namespace Handle

export const handles = []

export const build = (schema, handle) => handles.push({schema, handle})
export const toSqlParam = (schema, data) => Object.values(schema.parse(data))

const ui = new Uint8Array(20)
const d = new TextDecoder()

export const createHash = () => d.decode(ui.map(_=>Math.floor(Math.random() * 95) + 33))
export const params = (n) => Array(n).fill('?').join(',');

/** @type {(i: Zod.AnyZodObject) => string} */
export const schema = (schema) => {
  return ''
}
