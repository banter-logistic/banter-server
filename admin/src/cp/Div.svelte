<script lang=ts>
  export let props: Record<string,any> = {}
  export let cls = ''
  export let style = ''
</script>

<div {...props} class={cls} {style}>
  <slot/>
</div>