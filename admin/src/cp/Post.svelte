
<script lang=ts>
  import { getProm } from "./post";
  import { onDestroy } from "svelte";
  
  export let link = ''
  export let prom = getProm<In,T>(link)
  export let schemaIn: In = '' as any
  export let schemaRes: T = '' as any
  schemaRes
  schemaIn
  
  const _fetch: fetchType = (l) => abort = prom.fetch(l)
  const state = prom.store

  let abort: AbortController | undefined
    
  type T = $$Generic
  type In = $$Generic
  type fetchType = typeof prom.fetch

  interface $$Slots {
    default: { fetch: fetchType, abort: typeof abort }
    error: { error: Error }
    loading: { }
    top: { }
    bottom: { }
    resolved: { result: T, reset: () => void }
  }
  
  onDestroy(()=>{
    abort?.abort()
  })
</script>

<slot name="top"/>

{#if $state.type == 'idle'}

<slot fetch={_fetch} {abort}/>
  
{:else if $state.type == 'loading'}

<slot name="loading"/>

{:else if $state.type == 'resolved'}

<slot name="resolved" result={$state.data} reset={()=>{ state.set({ type: 'idle' }) }}/>
  
{:else if $state.type == 'error'}

<slot name="error" error={$state.error}>
  Error "{$state.error.name}", {$state.error.message}<br>
  Cause, {$state.error.cause}
</slot>
  
{/if}

<slot name="bottom"/>
