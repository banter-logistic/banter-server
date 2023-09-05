
<script lang=ts>
  
  export let data: Record<string,string|number>
  
  $: rows = Object.entries(data)
  
</script>


<div class="stack-2">
{#each rows as [row,col]}
  <span class="font-bold">{row}</span>
  <span>: {col}</span>
{/each}
</div>
