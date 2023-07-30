import "api-server/internal/config.js";
import { createConnection } from "mysql2/promise";

const keys = Object.entries({
  varchar: 'z.string()',
  int: 'z.number()',
  timestamp: 'z.string()',
  enum: 'z.string()',
  tinyint: 'z.number()',
  text: 'z.string()',
  float: 'z.number()',
})

/**
 * @typedef {{ 
 *  Field: string,
 *  Type: string,
 *  Null: string,
 *  Key: string,
 *  Default: string | null,
 *  Extra: string
 * }} field
 */

/**
 * @typedef {{
 *  name: string,
 *  fields: field[]
 * }} Table
 */

const conn = await createConnection({
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  socketPath: process.env.DBSOCKET,
  database: process.env.DBNAME
})

/** @type {any} */
const [tables] = await conn.query('show tables from banter')

/** @type {Table[]} */
const tableData = []

for (let i = 0;i < tables.length;i++) {
  const table = tables[i].Tables_in_banter
  /** @type {any} */
  const [fields] = await conn.query('show columns from ' + table)
  tableData.push({ name: table, fields })
}

import { writeFile } from "fs/promises";




const content = tableData.map( table => `\
export const ${cpTable(table.name)}Schema = z.object({
${table.fields.map( field => 
  `\t${field.Field}: ${sqlToZod(field.Type)}`
  ).join(',\n')}
})
`).join('\n');

writeFile('lib/schema/database.js',`\
/* auto generated */\n
${content}`)
console.log('writing lib/schema/database.js')



const insertSchema = tableData.map( table => `\
export const ${cpTable(table.name)}Insert = z.object({
${table.fields.map( field =>
  typeToZod(field) ? `\t${field.Field}: ${sqlToZod(field.Type)},` : ''
  ).join('\n')}
})
`).join('\n');

writeFile('lib/schema/insert.js',`\
/* auto generated */\n
${insertSchema}`)
console.log('writing lib/schema/insert.js')

conn.end()




/** @type {(i: string) => string} */
function cpTable(name) {
  return name.split('_').map( e =>
    e[0].toUpperCase() +  e.slice(1)
  ).join('_')
}

/** @type {(i:string) => string} */
function sqlToZod(field) {
  const found = keys.find( ([k,v]) => {
    return field.includes(k)
  })
  
  if (!found) throw new Error('No match ' + field)
  
  return found[1]
}

/** @type {(i:field) => boolean} */
function typeToZod(f) {
  return f.Default == null && f.Extra == ''
}