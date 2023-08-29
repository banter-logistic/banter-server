<script lang=ts>
  let className = 'input'
  export let name = ''
  export let placeholder = ''
  export let required = true
  export let label = 'password'
  
  export { className as class }
</script>

<label class="stack">
  {label}
  <input type="password" class={className} {name} {placeholder} {required} data-cross-reset>
</label>