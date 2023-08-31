

<script lang=ts>
  import AdminInput from "cp/Div.svelte";
  import type { load } from "./+page";
  import type { loader } from "lib";
  import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";
  import { superForm } from "sveltekit-superforms/client";
  import type { UserInput } from "lib/zod/input";
  import { setContext } from "svelte";
  import { page } from "$app/stores";
  
  export let data: loader<typeof load>
    
  let form = superForm<Zod.ZodObject<typeof UserInput>>(data.form)
  const enhance = form.enhance
  const message = form.message
  
  setContext('form',form)
  
</script>

<SuperDebug data={form.form} />

<AdminInput class="card">
  <div class="stack-2">
    <h2>Input {data.route}</h2>
    <div class="flex justify-end">
      <a class="btn primary" href="./">Kembali</a>
    </div>
  </div>
  
  <div class="my-6"></div>
  <form method="post" action="?/{data.route}" use:enhance class="stack-1-4">
    {#if $message}
      <div class="p-4 font-bold rounded-md 
        {$page.status >= 400 ? 'text-error bg-error/20 border border-error' : 'text-success bg-success/20 border border-success'}">{$message}</div>
    {/if}
    <svelte:component this={data.page} {data}/>
    <div class="flex justify-end">
      <button class="btn primary">Tambah</button>
    </div>    
  </form>
</AdminInput>
