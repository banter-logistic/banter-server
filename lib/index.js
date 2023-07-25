// @ts-nocheck

import * as help from "./util/index.js";
import * as db from "./schema/database.js";
import * as view from "./schema/view.js";
import * as _z from "zod";

Object.entries(help).forEach( ([k,v]) => global[k] = v )
global.z = _z
global.db = db
global.view = view

global.table = (await import("./util/table.js")).table
global.handle = await import("./util/helper.js")

import { readdir } from "fs/promises";

const dirs = await readdir('lib/handler')

for (let i = 0;i < dirs.length;i++) {
  await import("./handler/" + dirs[i])
}