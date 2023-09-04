<script lang=ts>
  export let action = ''
  export let enctype: 'text/plain' | 'multipart/form-data' | 'application/x-www-form-urlencoded' | null = null
  
  let className = ''
  
  export { className as class }
</script>

<form class={className} {action} {enctype}>
  <slot/>
</form>