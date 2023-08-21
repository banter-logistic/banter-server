import { type SafeParseReturnType, ZodFirstPartyTypeKind } from "zod"

/** parse object to query string */
export function toQuery<T extends Zod.AnyZodObject = Zod.AnyZodObject>(obj: Zod.infer<T>, zod?: T) {
  let out: string[] = []
  for (const key in obj) {
    out.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
  }
  return out.join('&')
}

/** 
 * safe parse query string to object
 */
export function fromQuerySafeParse<T extends Zod.AnyZodObject>(zod: T, query: URL | string | FormData) {
  let param = typeof query == 'string' ? new URLSearchParams(query) : query instanceof URL ? query.searchParams : query
  
  const ob = {} as any
  const shape = zod._def.shape()
  
  for (const key in shape) {
    const elem = shape[key];
    const urlKey = param.get(key) as string | null
    
    if (!urlKey) continue
    
    if (elem._def.typeName == ZodFirstPartyTypeKind.ZodString) {
      ob[key] = urlKey
      
    } else if (elem._def.typeName == ZodFirstPartyTypeKind.ZodNumber) {
      if (isNaN(parseInt(urlKey))){
        ob[key] = urlKey
        continue
      }
      
      ob[key] = parseInt(urlKey)
    } else {
      throw new Error('Unimplemented')
    }
  }
  
  return zod.safeParse(ob) as SafeParseReturnType<Zod.infer<T>,Zod.infer<T>>
}

/** 
 * parse query string to object, throw when parse fail
 */
export function fromQueryParse<T extends Zod.AnyZodObject>(zod: T, query: URL | string | FormData) {
  let param = typeof query == 'string' ? new URLSearchParams(query) : query instanceof URL ? query.searchParams : query
  
  const ob = {} as any
  const shape = zod._def.shape()
  
  for (const key in shape) {
    const elem = shape[key];
    const urlKey = param.get(key) as string | null
    
    if (!urlKey) continue
    
    if (elem._def.typeName == ZodFirstPartyTypeKind.ZodString) {
      ob[key] = urlKey
      
    } else if (elem._def.typeName == ZodFirstPartyTypeKind.ZodNumber) {
      if (isNaN(parseInt(urlKey))){
        ob[key] = urlKey
        continue
      }
      
      ob[key] = parseInt(urlKey)
    } else {
      throw new Error('Unimplemented')
    }
  }
  
  return zod.parse(ob) as Zod.infer<T>
}