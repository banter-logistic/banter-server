import { watch } from "chokidar";
import { readFile, writeFile, statSync } from "fs";

const wt = Boolean(process.argv.find(e=>e=='--watch'))

export async function build(target,output,content) {
  generate(target,output,content);
  wt ? watchFile(target,(path)=>generate(path,output,content)) : undefined;
}

/**
 * @param {string} target 
 * @param {string} output 
 * @param {(vars: string[])=>string} content 
 */
export function generate(target,output,content) {
  // if (writing) return console.log('busy, no file changed')
  
  // writing = true
  readFile(target, (err, data) => {
    if (err) {
      // writing = false
      return console.error(`[ERROR]`,err)
    }
    
    /** @type {string[]} */
    const iter = data.toString('utf-8').match(/export const \w+/g) ?? []
    const varnames = iter.map(e=>e.replace('export const ',''))    
    const result = content(varnames)
    console.log('writing to',output)
    writeFile(output,result,(err)=>{
      if (err) console.error('[ERROR]',err)
    })
  })
}

/**
 * 
 * @param {string} target 
 * @param {(path: string)=>void} cb 
 */
export function watchFile(target,cb) {
  watch(target).on('change',cb)
}
