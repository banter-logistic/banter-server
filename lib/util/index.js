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

export const ServerErr = (error) => {
  dateLog()
  console.log('[SERVER ERR]')
  if (error instanceof ZodError)
    console.log('[ZOD ERR]')
  else if (error instanceof Error)
    console.log('[CUSTOM ERR]')
  console.error(error)
  console.log('[/SERVER ERR]')
  return { success: false, error: { message: 'Kesalahan Server, mohon coba beberapa saat lagi', name: SERVER_ERR } }
}

export const safeParseInt = (val, fallback) => {
  if (val == null) return fallback ?? Err()
  const i = parseInt(val)
  if (fallback)
    return isNaN(i) ? fallback : i
  return isNaN(i) ? Err() : Ok(i)
}