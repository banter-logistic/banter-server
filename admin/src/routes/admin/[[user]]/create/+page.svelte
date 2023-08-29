

<script lang=ts>
  import AdminInput from "cp/Div.svelte";
  import type { PageData } from './$types.js';
  import { enhance } from "$app/forms";
  export let data: PageData
  
</script>

<AdminInput class="card">
  <div class="stack-2">
    <h2>Input {data.route}</h2>
    <div class="flex justify-end">
      <a class="btn primary" href="./">Kembali</a>
    </div>
  </div>
  
  <div class="my-6"></div>
  <form method="post" action="/admin?/{data.route}" use:enhance class="stack-1-4">
    <svelte:component this={data.page} {data}/>
    <div class="flex justify-end">
      <button class="btn primary">Tambah</button>
    </div>    
  </form>
</AdminInput>
