
/**
 * log but also return the data
 * @example
 * ```ts
 * return log(result)
 * ```
 */
export const log = <T>(data:T) => {console.log(data);return data}

/**
 * return empty string if the first param is falsy
 * other wise run callback, or just return the firs param
 */
export const safe = (s: string | number | null | undefined,cb?: string | ((s: string) => string)) => {
  if (!s) return ''
  
  if (cb && typeof cb == 'string') {
    return String(cb)
  } else if (cb && typeof cb == 'function') {
    return cb(String(s))
  }
  
  return String(s)
}