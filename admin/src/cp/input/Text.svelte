<script lang=ts>
  let className = 'input'
  export let name = ''
  export let placeholder = ''
  export let required = true
  export let label = name
  
  export { className as class }
</script>

<label class="stack">
  {label}
  <input type="text" class={className} {name} {placeholder} {required}>
</label>