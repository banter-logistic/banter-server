// place files you want to import through the `$lib` alias in this folder.

/** @type {(request: Request) => Promise<any>} */
export async function formData(request) {
  const bf = await request.formData()
  
  /** @type {any} */
  const data = {}// entries.map( entry => entry.includes('=') ? entry.split('=') : null).filter(Boolean)
  
  for (const [k,v] of bf.entries()) {
    data[k] = v
  }
  
  return data
}