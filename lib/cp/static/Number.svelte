<script lang=ts>
  let className = 'input'
  export let name = ''
  export let placeholder = ''
  export let required = true
  export let label = name
  export let value: string | number = ''
  export let readonly = false
  export let postfix = ''
  export let prefix = ''
  
  export { className as class }
</script>

<label class="stack">
  <span>{label}</span>
  <div class="stack" style="grid-template-columns: min-content 1fr min-content;">
    
    <span class={prefix==''?'':"bg-state-70 border-y border-l border-slate-400 px-5 stack place-items-center"}>
      {prefix}
    </span>
    
    <input type="number" class={className} {name} {placeholder} {required} bind:value {readonly}>
    
    <span class={postfix==''?'':"bg-state-70 border-y border-r border-slate-400 px-3 stack place-items-center"}>{postfix}</span>
  </div>
</label>