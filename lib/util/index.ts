import { z, type SafeParseReturnType } from 'zod'

export namespace Query {
  export function to_query_string<T extends Zod.AnyZodObject = Zod.AnyZodObject>(obj: Zod.infer<T>, zod?: T) {
    let out: string[] = []
    for (const key in obj) {
      out.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    }
    return out.join('&')
  }
  
  export function from_query<T extends { [x:string]: any }>(schema: T, query: URL | string | FormData) {
    let param = typeof query == 'string' ? new URLSearchParams(query) : query instanceof URL ? query.searchParams : query
  
    const ob = {} as any
    const shape = schema._def.shape()
    const error: string[] = []
    
    for (const key in shape) {
      const elem = /** @type {{ _def: { typeName: z.ZodFirstPartyTypeKind } }} */ (shape[key]);
      const urlKey = param.get(key) as string | null
      
      if (!urlKey) {
        error.push(`Property ${key} is required`)
        continue
      }
      
      if (typeof elem == 'string') {
        ob[key] = urlKey
      } else if (typeof elem == 'number') {
        if (isNaN(parseInt(urlKey))){
          error.push(`Property ${key} must be number`)
          continue
        }
        
        ob[key] = parseInt(urlKey)
      } else {
        throw new Error('Unimplemented')
      }
    }
    
    if (error.length != 0) {
      throw new Error('\t'+error.join('\n\t'))
    }
  }
}


export function zodUrlSafeParse<T extends Zod.AnyZodObject>(zod: T, query: URL | string | FormData) {
  let param = typeof query == 'string' ? new URLSearchParams(query) : query instanceof URL ? query.searchParams : query
  
  const ob = {} as any
  const shape = zod._def.shape()
  // const error = []
  
  for (const key in shape) {
    const elem = shape[key];
    const urlKey = param.get(key) as string | null
    
    if (!urlKey) {
      // error.push(`Property ${key} is required`)
      continue
    }
    
    
    if (elem._def.typeName == z.ZodFirstPartyTypeKind.ZodString) {
      ob[key] = urlKey
    } else if (elem._def.typeName == z.ZodFirstPartyTypeKind.ZodNumber) {
      if (isNaN(parseInt(urlKey))){
        // error.push(`Property ${key} must be number`)
        ob[key] = urlKey
        continue
      }
      
      ob[key] = parseInt(urlKey)
    } else {
      throw new Error('Unimplemented')
    }
  }
  
  return zod.safeParse(ob as Zod.infer<T>) as SafeParseReturnType<Zod.infer<T>,Zod.infer<T>>
}

export function zodUrlParse<T extends Zod.AnyZodObject>(zod: T, query: URL | string | FormData) {
  let param = typeof query == 'string' ? new URLSearchParams(query) : query instanceof URL ? query.searchParams : query
  
  const ob = {} as any
  const shape = zod._def.shape()
  const error = []
  
  for (const key in shape) {
    const elem = shape[key];
    const urlKey = param.get(key) as string | null
    
    if (!urlKey) {
      error.push(`Property ${key} is required`)
      continue
    }
    
    
    if (elem._def.typeName == z.ZodFirstPartyTypeKind.ZodString) {
      ob[key] = urlKey
    } else if (elem._def.typeName == z.ZodFirstPartyTypeKind.ZodNumber) {
      if (isNaN(parseInt(urlKey))){
        error.push(`Property ${key} must be number`)
        continue
      }
      
      ob[key] = parseInt(urlKey)
    } else {
      throw new Error('Unimplemented')
    }
  }
  
  if (error.length != 0) {
    throw new Error('\t'+error.join('\n\t'))
  }
  
  const a = zod.safeParse(ob as Zod.infer<T>)
  return a as SafeParseReturnType<Zod.infer<T>,Zod.infer<T>>
}