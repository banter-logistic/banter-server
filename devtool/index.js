import { readdir } from "fs/promises";
const [,,vs] = process.argv
const args = vs?.split(',') ?? ['all']


for (const arg of args) {
  if (arg == 'all') {
    const dirs = await readdir('devtool/handler','utf-8')
    for (const dir of dirs) {
      await import('devtool/handler/' + dir)
    }
    break
  }
  
  import('./handler/' + arg + '.js')
}
