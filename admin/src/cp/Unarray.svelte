
<script lang=ts>
  type T = $$Generic

  export let result: Result<T>

  interface $$Slots {
    default: { data: T }
    none: { message: string }
    err: { err: Error }
    empty: {}
  }

</script>


{#if result.success}

  <!-- DONT UNWRAP ARRAY -->
  <slot data={result.data}/>
  
{:else if result && result.success === null}
  
    <slot name="none" message={result.message}>
      {result.message}
    </slot>
  
{:else}
  <slot name="err" err={result.error}>
    Error "{result.error.name}", {result.error.message}<br>
    Cause, {result.error.cause}
  </slot>
{/if}

