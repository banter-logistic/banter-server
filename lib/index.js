// @ts-nocheck

global.z = await import("zod")
const insert = await import('./schema/insert.js')
global.db = {...await import("./schema/database.js"),...insert}
global.view = await import("./schema/view.js")
global.handle = await import("./util/handle.js")
global.table = (await import("./util/table.js")).table

const help = await import('./util/index.js')
Object.entries(help).forEach( ([k,v]) => global[k] = v )


// handles
import { readdir } from "fs/promises";
const dirs = await readdir('lib/handler')
for (let i = 0;i < dirs.length;i++) {
  await import("./handler/" + dirs[i])
}


