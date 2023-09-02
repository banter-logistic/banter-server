<script lang=ts>
  let className = 'input'
  export let name = ''
  export let placeholder = ''
  export let required = true
  export let label = 'password'
  export let value: string | number = '' 
  
  export { className as class }
</script>

<label class="stack">
  <span class="pl-2">{label}</span>
  <input type="password" class={className} {name} {placeholder} {required} data-cross-reset bind:value>
</label>