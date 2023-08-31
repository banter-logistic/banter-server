<script lang=ts>
  let className = 'input'
  export let name: string
  export let placeholder = ''
  export let required = true
  export let label = name
  import { getContext } from "svelte";
  import type { SuperForm } from "sveltekit-superforms/client";
  export let readonly = false
  
  let { form, constraints, errors } = getContext<SuperForm<Zod.AnyZodObject>>('form')
  
  export { className as class }
</script>

<label class="stack">
  <span class="pl-2">{label}</span>
  <input
    type="number"
    class={className}
    {name}
    {placeholder}
    {required}
    bind:value={$form[name]}
    {readonly}
    {...$constraints}
    aria-invalid={$errors[name] ? 'true' : undefined}
  />
  {#if $errors[name]} <span class="text-error">{$errors[name]}</span> {/if}
</label>