
<script lang=ts>
  import { cross } from '$lib/form';
  import type { ActionData } from './api/$types';
  import { Text, Passwd } from "cp/input";
  import { page } from "$app/stores";

  export let data
  export let form: ActionData
</script>
<!-- svelte-ignore a11y-label-has-associated-control -->

<section class="min-h-screen bg-base grid place-items-center text-slate-700">
  
  <form class="card max-w-[96vw] w-96 grid grid-cols-1 gap-4" action="/api?/login" method="post" use:cross>
    <h1 class="font-bold text-4xl my-6 text-slate-900">BANTER</h1>
    
    <Text name="username"/>
    
    <Passwd name="passwd"/>
    
    <button class="btn primary rounded-lg">Login</button>
    {#if form} {form.message} {/if}
    
    {#if data.message} <span class="text-error">{data.message}</span> {/if}
    
    {#if data.session}
    <span class="text-center text-primary">
      session tersedia,
      <a href={data.session} class="underline font-bold">klik disini</a>
    </span>
    {/if}
  </form>
  
</section>
