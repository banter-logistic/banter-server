import { build } from "../lib.js";

const views = (vars)=>`\
/* auto generated */
import * as _view from "../schema/view.js"

declare global {
  namespace view {
    ${vars.map(v=> `export const ${v}: typeof _view.${v}` ).join('\n\t\t')}
    
    ${vars.map(v=> `export type ${v} = typeof ${v}` ).join('\n\t\t')}
  }
}`;

const db = (vars)=>`\
/* auto generated */
import * as _db from "../schema/database.js"

declare global {
  namespace db {
    ${vars.map(v=> `export const ${v}: typeof _db.${v}` ).join('\n\t\t')}
    
    ${vars.map(v=> `export type ${v} = Zod.infer<typeof ${v}>` ).join('\n\t\t')}
  }
}`

const insert = (vars)=>`\
/* auto generated */
import * as _db from "../schema/insert.js"

declare global {
  namespace db {
    ${vars.map(v=> `export const ${v}: typeof _db.${v}` ).join('\n\t\t')}
    
    ${vars.map(v=> `export type ${v} = Zod.infer<typeof ${v}>` ).join('\n\t\t')}
  }
}`

build('lib/schema/view.js','lib/types/view.d.ts',views);
build('lib/schema/database.js','lib/types/db.d.ts',db);
build('lib/schema/insert.js','lib/types/insert.d.ts',insert);
