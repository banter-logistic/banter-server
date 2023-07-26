
<script lang=ts>
  import { Debug } from "cp";
  type T = $$Generic

  export let result: Result<T> | null

  interface $$Slots {
    default: { data: T }
    null: { }
    none: { message: string }
    err: { err: Error }
  }
</script>


{#if result && result.success}

  <slot data={result.data}>
    <Debug data={result.data} />
  </slot>
  
{:else if result && result.success === null}

  <slot name="none" message={result.message}>{result.message}</slot>

{:else if result}
  <slot name="err" err={result.error}>
    Error "{result.error.name}", {result.error.message}<br>
    Cause, {result.error.cause}
  </slot>
{:else}
<slot name=null/>
{/if}
