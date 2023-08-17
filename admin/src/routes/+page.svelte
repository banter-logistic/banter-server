

<script lang=ts>
  import { cross } from '$lib/form';
  import type { ActionData } from './api/$types';

  export let data
  export let form: ActionData
</script>

<section class="min-h-screen bg-base grid place-items-center text-slate-700">
  
  <form class="bg-white rounded-3xl p-8 max-w-[96vw] w-96 shadow-md grid grid-cols-1 gap-4" action="/api?/login" method="post" use:cross>
    <h1 class="font-bold text-4xl my-6 text-slate-900">BANTER</h1>
    
    <label class="grid grid-cols-1">
      username
      <input type="text" name="username" class="input" required>
    </label>
    
    <label class="grid grid-cols-1">
      password
      <input type="password" name="passwd" class="input" data-cross-reset required>
    </label>
    <button class="btn primary rounded-lg">Login</button>
    {#if form}
      {form.msg}
    {/if}
    {#if data.msg}
      <span>{data.msg}</span>
    {/if}
  </form>
  
</section>
