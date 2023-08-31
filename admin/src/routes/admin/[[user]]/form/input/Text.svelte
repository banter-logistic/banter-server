<script lang=ts>
  let className = 'input'
  export let name = ''
  export let placeholder = ''
  export let required = true
  export let label = name
  import { getContext } from "svelte";
  import type { SuperForm } from "sveltekit-superforms/client";
  
  let { form, errors, constraints } = getContext<SuperForm<Zod.AnyZodObject>>('form')
  
  export { className as class }
</script>

<label class="stack">
  <span class="pl-2">{label}</span>
  <input type="text" class={className} {name} {placeholder} {required} bind:value={$form[name]} {...$constraints} aria-invalid={$errors[name] ? 'true' : undefined}>
  {#if $errors[name]} <span class="text-error">{$errors[name]}</span> {/if}
</label>