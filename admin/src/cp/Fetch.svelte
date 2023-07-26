
<script lang=ts>
  import { getProm } from "./fetch";
  import { onDestroy } from "svelte";
  
  export let link = ''
  export let prom = getProm<T>(link)
  export let schema: T = '' as any
  schema
  
  const _fetch: fetchType = (altLink,query) => abort = prom.fetch(altLink,query)
  const state = prom.store

  let abort: AbortController | undefined
    
  type T = $$Generic
  type Er = $$Generic
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
