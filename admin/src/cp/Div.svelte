<script lang=ts>
  export let props: Record<string,any> = {}
  let cls = ''
  export let style = ''
  export { cls as class }
</script>

<div {...props} class={cls} {style}>
  <slot/>
</div>