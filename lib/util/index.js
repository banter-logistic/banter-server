import { ZodError } from "zod";

export const mysqlErrCodes = [
  'ERR_DUP_ENTRY'
]

export const BAD_REQUEST = "BAD_REQUEST"
export const SERVER_ERR = "SERVER_ERR"

export const dateLog = () => {
  const t = new Date()
  t.setUTCHours( t.getUTCHours() + 7 )
  console.log(`[${t.toUTCString().split(' ').slice(0,5).join(' ')}]`)
}

export const Ok = (data) => ({ success: true, data })
export const None = (msg) => ({ success: null, message: msg ?? '' })
export const Err = (msg, name) => ({ success: false, error: { message: msg ?? 'Terjadi kesalahan, coba lagi', name: name ?? BAD_REQUEST } })

const red = '\x1b[91m'
const reset = '\x1b[0m'
const blue = '\x1b[94m'
const cyan = '\x1b[96m'
const green = '\x1b[92m'
const yellow = '\x1b[93m'
const HEADER = '\x1b[95m'

console.red = (c) => `${red}${c}${reset}`
console.green = (c) => `${green}${c}${reset}`
console.blue = (c) => `${blue}${c}${reset}`
console.yellow = (c) => `${yellow}${c}${reset}`

export const ServerErr = (error) => {
  dateLog()
  console.red('[SERVER ERR]')
  if (error instanceof ZodError)
    console.log('[ZOD ERR]')
  else if (error instanceof Error)
    console.log('[MYSQL ERR]')
  else
    console.log('[CUSTOM ERR]')
  console.error(error)
  console.red('[/SERVER ERR]')
  return { success: false, error: { message: 'Kesalahan Server, mohon coba beberapa saat lagi', name: SERVER_ERR } }
}

export const safeParseInt = (val, fallback) => {
  if (val == null) return fallback ?? Err()
  const i = parseInt(val)
  if (fallback)
    return isNaN(i) ? fallback : i
  return isNaN(i) ? Err() : Ok(i)
}