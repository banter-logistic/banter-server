export const dateLog = () => {
  const t = new Date()
  t.setUTCHours( t.getUTCHours() + 7 )
  console.log(`[${t.toUTCString().split(' ').slice(0,5).join(' ')}]`)
}

export const Ok = <T>(data: T) => {
  return { success: true, data } satisfies Result<T>
}

export const None = <T = any>(msg: string) => {
  return { success: null, message: msg } satisfies Result<T>
}

export const Err = <T = any>(msg?: string, name?: string) => {
  return { success: false, error: { message: msg ?? 'Terjadi kesalahan, coba lagi', name: name ?? 'BAD_REQUEST' } } satisfies Result<T>
}

export const ServerErr = <T = any>(error: any) => {
  dateLog()
  console.log('[SERVER ERR]')
  console.error(error)
  console.log('[/SERVER ERR]')
  return { success: false, error: { message: 'Kesalahan Server, mohon coba beberapa saat lagi', name: 'SERVER_ERR' } } satisfies Result<T>
}

export function safeParseInt(val: any, fallback: number): number;
export function safeParseInt(val: any | undefined): Result<number>;
export function safeParseInt(val: any | undefined, fallback?: number): Result<number> | number {  
  if (val == null) return fallback ?? Err<number>()
  const i = parseInt(val)
  if (fallback)
    return isNaN(i) ? fallback : i
  return isNaN(i) ? Err<number>() : Ok(i)
}