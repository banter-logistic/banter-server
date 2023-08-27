const _cache: Record<string,any> = {}

export const cache = (async <T = any>(url: string, option?: RequestInit) => {
  
  if (url in _cache) {
    return _cache[url] as T
  }
  
  return await fetch(url,option).then(e=>e.json()).then(e=>{_cache[url] = e;return e as T})
})