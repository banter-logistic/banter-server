<script lang=ts>
  import { cross } from "$lib/form";
  import { date } from "lib/util/date";
  import SalesList from "cp/Div.svelte";
  import SalesInput from "cp/Div.svelte";
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types"
  
  export let data: PageData
  
</script>
  
<SalesList cls="card">
  <h2 class="pl-2">List Sales</h2>
  <div class="my-6"></div>
  <table class="w-full">
    <thead class="border-b-2">
      <tr>
        <th>Id</th>
        <th>username</th>
        <th>Nama</th>
        <th>Counter</th>
        <th>Dibuat</th>
      </tr>
    </thead>
    <tbody>
      {#each data.data as sls}
      {@const { user_id, user_username, user_nama, pos_nama, user_dibuat,  } = sls}
      <tr class="text-center border-t border-slate-100 h-10">
        <td>{user_id}</td>
        <td>{user_username}</td>
        <td>{user_nama}</td>
        <td>{pos_nama}</td>
        <td>{date(user_dibuat).display}</td>
      </tr>
      
      {/each}
      
    </tbody>
  </table>
  
  <form class="flex justify-end mt-4" action="/api?/logout" method="post" use:cross>
    <button class="btn primary transition">Logout</button>
  </form>
  
</SalesList>
  
<SalesInput cls="card">
  <h2 class="font-bold text-2xl">Input Sales</h2>
  <div class="my-6"></div>
  <form method="post" use:enhance class="grid grid-cols-1 gap-4">
    <input class="input primary" type="text" name="username" placeholder="username">
    <input class="input primary" type="text" name="nama" placeholder="display nama">
    <input class="input primary" type="password" name="passwd" placeholder="password">
    
    <select class="input primary" name="" id="">
      {#each data.posList as pos}
      <option value={pos}>{pos}</option>
      {/each}
    </select>
      
    <button class="btn primary">Tambah</button>
  </form>
</SalesInput>
  
