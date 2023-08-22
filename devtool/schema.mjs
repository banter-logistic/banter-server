import { createConnection } from "mysql2/promise";

const conn = await createConnection({
  user: 'deuzo',
  password: 'mariadb2017',
  database: 'banter_db',
  socketPath: '/var/run/mysqld/mysqld.sock'
})

// @ts-ignore
const tables = (await conn.query('show tables'))[0].map( e => e.Tables_in_banter_db )

await export_schema()

conn.end()
/**
 * @typedef {{
*  Field: string,
*  Type: string,
*  Null: 'NO' | 'YES',
*  Key: string,
*  Default: string | null,
*  Extra: string
* }} field
*/


/**
 * @param {string} str
 */
function parse(str) {
  if (str.includes('int') || str.includes('float')) {
    return "number"
  } else if (str.includes('char') || str.includes('enum')) {
    return "string"
  } else {
    return 'Date'
  }
  
}

/**
 * @param {string} str
 */
function parseZod(str) {
  if (str.includes('int') || str.includes('float')) {
    return "i"
  } else if (str.includes('char') || str.includes('enum')) {
    return "s"
  } else {
    return 'z.date()'
  }
}



async function export_schema() {
  /** @type { { name: string, fields: field[] }[] } */
  const describes = []

  for (const table of tables) {
    describes.push( { name: table, fields: (/** @type {any} */(await conn.query('describe ' + table))[0])} )
  }

  let content = `/** auto generated */
import { z } from 'zod'
const o = z.object
const s = z.string()
const i = z.number()
`

  for (const table of describes) {
    
    // TYPE
    content += `export type ${table.name} = {`
    for (const field of table.fields) {
      content += `${field.Field}: ${parse(field.Type)},`
    }
    content += `}`
    
    // ZOD
    content += `export const ${table.name} = o({`
    for (const field of table.fields) {
      content += `${field.Field}: ${parseZod(field.Type)},`
    }
    content += `})`
  }
  
  content += `export type Schema = { ${describes.map( e => `${e.name}: ${e.name}` ).join(',')} };`

  console.log(content)
}