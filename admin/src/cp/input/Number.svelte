<script lang=ts>
  let className = 'input'
  export let name = ''
  export let placeholder = ''
  export let required = true
  export let label = name
  export let value = 0
  
  export { className as class }
</script>

<label class="stack">
  {label}
  <input type="number" class={className} {name} {placeholder} {required} {value}>
</label>