<script lang=ts>
  let className = 'input'
  export let name = ''
  export let required = true
  export let label = name
  export let values: string[]
  export let display: string[] = []
  
  export { className as class }
</script>

<label class="stack">
  <span class="pl-2">{label}</span>
  <select
    class={className}
    {name}
    {required}
  >
    <option value="">--{label}--</option>
    {#each values as value, i}
    <option {value}>{display[i] ?? value}</option>
    {/each}
  </select>
  
</label>