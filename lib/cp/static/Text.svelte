<script lang=ts>
  let className = 'input'
  export let name = ''
  export let placeholder = ''
  export let required = true
  export let label = name
  export let value: string | number = ''
  
  export { className as class }
</script>

<label class="stack">
  <span>{label}</span>
  <input type="text" class={className} {name} {placeholder} {required} bind:value>
</label>