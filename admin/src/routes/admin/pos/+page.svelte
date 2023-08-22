<script>
  import { cross } from "$lib/form";
  import { date } from "lib/util/date";
  import PosList from "cp/Div.svelte";
  import PosInput from "cp/Div.svelte";
  import { enhance } from "$app/forms";
  import { displayAlamat } from "lib/database/util";
  
  export let data
  
</script>


<PosList cls="card">
  <h2 class="pl-2">List Sales</h2>
  <div class="my-6"></div>
  <table class="w-full">
    <thead class="border-b-2">
      <tr>
        <th>id</th>
        <th>nama</th>
        <th>tipe</th>
        <th>alamat</th>
        <th>dibuat</th>
      </tr>
    </thead>
    <tbody>
      {#each data.data as pos}
      <tr class="text-center border-t border-slate-100 h-10">
        <td>{pos.pos_id}</td>
        <td>{pos.pos_nama}</td>
        <td>{pos.pos_tipe}</td>
        <td>{displayAlamat(pos)}</td>
        <td>{date(pos.pos_dibuat).display}</td>
      </tr>
      {/each}
      
    </tbody>
  </table>
  
  <form class="flex justify-end mt-4" action="/api?/logout" method="post" use:cross>
    <button class="btn primary transition">Logout</button>
  </form>
  
</PosList>
  
<PosInput cls="card">
  <h2 class="font-bold text-2xl">Input Sales</h2>
  <div class="my-6"></div>
  <form method="post" use:enhance class="grid grid-cols-1 gap-4">
    <input class="input primary" type="text" name="username" placeholder="username">
    <input class="input primary" type="text" name="nama" placeholder="display nama">
    <input class="input primary" type="password" name="passwd" placeholder="password">
      
    <button class="btn primary">Tambah</button>
  </form>
</PosInput>
