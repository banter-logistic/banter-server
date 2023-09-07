console.warn = (msg: string, code: string) => {
  dateLog()
  console.log(`\x1b[91m[${code ?? 'SERVER ERR'}]\x1b[0m`)
  console.error(msg)
  console.log(`\x1b[91m[/${code ?? 'SERVER ERR'}]\x1b[0m`)
}
// export class Err {
//   constructor(
//     public message: string,
//     public code?: string
//   ) {
//     dateLog()
//     console.log(`\x1b[91m[${code ?? 'SERVER ERR'}]\x1b[0m`)
//     console.trace(message)
//     console.log(`\x1b[91m[/${code ?? 'SERVER ERR'}]\x1b[0m`)
//   }
  
//   static log (error: any, type?: string) {
//     dateLog()
//     console.log(`\x1b[91m[${type ?? 'SERVER ERR'}]\x1b[0m`)
//     console.error(error)
//     console.log(`\x1b[91m[/${type ?? 'SERVER ERR'}]\x1b[0m`)
//   }
// }


export const dateLog = () => {
  const t = new Date()
  t.setUTCHours( t.getUTCHours() + 7 )
  console.log(`[${t.toUTCString().split(' ').slice(0,5).join(' ')}]`)
}
