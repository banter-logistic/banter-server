<script lang=ts>
  let className = 'input'
  export let name = ''
  export let placeholder = ''
  export let required = true
  export let label = name
  export let value: string | number = ''
  export let readonly = false
  
  export { className as class }
</script>

<label class="stack">
  <span class="pl-2">{label}</span>
  <input type="number" class={className} {name} {placeholder} {required} bind:value {readonly}>
</label>