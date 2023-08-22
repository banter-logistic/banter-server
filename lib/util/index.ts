
export function capital(str: string) {
  return `${str[0]?.toUpperCase() ?? ''}${str.slice(1)}`
}

export const prop = new Proxy({},{get: (_,key) => key})