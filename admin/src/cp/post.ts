
import { writable } from "svelte/store";

export function getProm<In,Out>(link: string) {
  const s = writable<FetchEvent<Out>>({ type: 'idle' })
  
  return {
    store: s,
    fetch: (body: In, query?: object) => {
      s.set({ type: 'loading' })
      
      const ctr = new AbortController()
      let target = link
      
      if (query) {
        const ent = Object.entries(query)
        target += '?'
        ent.forEach(([k,v])=>{
          target += k + '=' + String(v)
        })
      }
      
      fetch(target, { 
        signal: ctr.signal ,
        method: "POST",
        body: JSON.stringify(body),
        headers: { "content-type": "application/json" }
      })
        .then(e=>e.json())
        .then(data=>{
          s.set({ type: 'resolved', data })
        })
        .catch(error=>s.set({ type: 'error', error }))
      
      return ctr
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

