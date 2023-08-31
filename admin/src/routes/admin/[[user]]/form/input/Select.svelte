<script lang=ts>
  let className = 'input'
  export let name = ''
  export let required = true
  export let label = name
  export let values: string[]
  export let display: string[] = []
  import { getContext } from "svelte";
  import type { SuperForm } from "sveltekit-superforms/client";
  
  let { form, constraints, errors } = getContext<SuperForm<Zod.AnyZodObject>>('form')
  
  export { className as class }
</script>

<label class="stack">
  <span class="pl-2">{label}</span>
  <select
    class={className}
    {name}
    {required}
    bind:value={$form[name]}
    {...$constraints}
    aria-invalid={$errors[name] ? 'true' : undefined}
  >
    <option value="">--{label}--</option>
    {#each values as value, i}
    <option {value}>{display[i] ?? value}</option>
    {/each}
  </select>
  {#if $errors[name]} <span class="text-error">{$errors[name]}</span> {/if}
</label>