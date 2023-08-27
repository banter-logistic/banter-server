

<script lang=ts>
  import AdminInput from "cp/Div.svelte";
  import type { PageData } from './$types.js';
  import { enhance } from "$app/forms";
  export let data: PageData
  
</script>

<AdminInput cls="card">
  <div class="grid grid-cols-2">
    <h2 class="font-bold text-2xl">Input {data.route}</h2>
    <div class="flex justify-end">
      <a class="btn primary" href="./">Kembali</a>
    </div>
  </div>
  
  <div class="my-6"></div>
  <form method="post" action="/admin?/{data.route}" use:enhance class="grid grid-cols-1 gap-4">
    <svelte:component this={data.page} {data}/>
  </form>
</AdminInput>
