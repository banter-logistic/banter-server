<script lang=ts>

  export let data: any[] | any
  export let two_col = false

</script>

{#if Array.isArray(data)}

  {#each data as d}
  {@const e = Object.entries(d)} 

  <div class="bg-white p-4 rounded-md shadow-lg grid my-2" style="grid-template-columns: {two_col ? "1fr 1fr" : "1fr 5fr"};">
    {#each e as [k,v]}
      <div class="font-bold">{k}</div>
      <div>: {v}</div>
    {/each}
  </div>

  {:else}
  <div class="bg-white p-4 rounded-md shadow-lg grid my-2" style="grid-template-columns: {two_col ? "1fr 1fr" : "1fr 5fr"};">
    <slot>Kosong</slot>
  </div>
  {/each}

{:else}

  {@const e = Object.entries(data)} 
  <div class="grid" style="grid-template-columns: {two_col ? "1fr 1fr" : "1fr 3fr"};">
    {#each e as [k,v]}
    <div class="font-bold">{k}</div>
    <div>: {v}</div>
    {/each}
  </div>

{/if}
