<script lang=ts>
  type T = $$Generic
  
  export let form: T | null
  
  interface $$Slots {
    default: { form: T }
  }
</script>

{#if form}
<slot {form} />
{/if}
