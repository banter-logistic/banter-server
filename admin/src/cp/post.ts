
import { writable } from "svelte/store";

export function getProm<In,Out>(link: string) {
  const s = writable<FetchEvent<Out>>({ type: 'idle' })
  const abort = { abort: () => {} }
  
  return {
    store: s,
    abort,
    fetch: (body: In, query?: object) => {
      s.update( e=> {
        e.type = 'loading'
        return e
      })
      
      const ctr = new AbortController()
      let target = link
      
      if (query) {
        const ent = Object.entries(query)
        target += '?'
        ent.forEach(([k,v])=>{
          target += k + '=' + String(v)
        })
      }
      
      const pr = fetch(target, { 
        signal: ctr.signal ,
        method: "POST",
        body: JSON.stringify(body),
        headers: { "content-type": "application/json" }
      })
        .then(e=>e.json())
        .then(data=>{
          s.update( e => {
            e.type = 'resolved'
            // @ts-ignore
            e.data = data
            return e
          })
        })
        .catch(error=>s.update( e => {
          e.type = 'error'
          // @ts-ignore
          e.error = error
          return e
        }))
        .finally(()=>{
          abort.abort = () => {}
        })
      
      abort.abort = ctr.abort
      return pr
    },
  }
}

export type FetchEvent<T,Er = Error> = {
  type: 'idle' | 'loading',
} | {
  type: 'resolved'
  data: T
} | {
  type: 'error',
  error: Er
}

