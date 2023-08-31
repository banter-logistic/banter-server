
export function capital(str: string) {
  return `${str[0]?.toUpperCase() ?? ''}${str.slice(1)}`
}

export const prop = new Proxy({},{get: (_,key) => key})

export const log = <T>(data:T) => {console.log(data);return data}

export type loader<T extends (...i:any[]) => Promise<any>> = Awaited<ReturnType<T>>
