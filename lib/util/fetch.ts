import { browser } from "$app/environment";
const _cache: Record<string,any> = {}

/**
 * fetch and cache a request, in memory request
 * can provide default value if fetched on the server
 */
export const cache = (async <T = any>(url: string, option?: RequestInit & { default?: T }) => {
  if (!browser) {
    return option!.default!
  }
  
  if (url in _cache) {
    return _cache[url] as T
  }
  
  return await fetch(url,option).then(e=>e.json()).then(e=>{_cache[url] = e;return e as T})
})

export const json: <T=any>(url: RequestInfo | URL, opt?: RequestInit) => Promise<T> = (url,opt) => fetch(url,opt).then(e=>e.json())
export const jsc = (url: RequestInfo | URL, opt?: RequestInit | undefined) => () => json(url,opt)