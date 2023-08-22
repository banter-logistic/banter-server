<script>
  import { cross } from "$lib/form";
  import { date } from "lib/util/date";
  import DriverList from "cp/Div.svelte";
  import DriverInput from "cp/Div.svelte";
  import { enhance } from "$app/forms";
  
  export let data
  
</script>

<DriverList cls="card">
  <h2 class="pl-2">List Operator</h2>
  <div class="my-6"></div>
  <table class="w-full">
    <thead class="border-b-2">
      <tr>
        <th>id</th>
        <th>username</th>
        <th>nama</th>
        <th>pos</th>
        <th>pos tipe</th>
        <th>dibuat</th>
      </tr>
    </thead>
    <tbody>
      {#each data.data as sls}
      {@const {
        user_id, user_username, user_nama, user_dibuat,
        pos_nama, pos_tipe
      } = sls}
      <tr class="text-center border-t border-slate-100 h-10">
        <td>{user_id}</td>
        <td>{user_username}</td>
        <td>{user_nama}</td>
        <td>{pos_nama}</td>
        <td>{pos_tipe}</td>
        <td>{date(user_dibuat).display}</td>
      </tr>
      {:else}
        kosong
      {/each}
      
    </tbody>
  </table>
  
  <form class="flex justify-end mt-4" action="/api?/logout" method="post" use:cross>
    <button class="btn primary transition">Logout</button>
  </form>
  
</DriverList>
  
<DriverInput cls="card">
  <h2 class="font-bold text-2xl">Input Operator</h2>
  <div class="my-6"></div>
  <form method="post" use:enhance class="grid grid-cols-1 gap-4">
    <input class="input primary" type="text" name="username" placeholder="username">
    <input class="input primary" type="text" name="nama" placeholder="display nama">
    <input class="input primary" type="password" name="passwd" placeholder="password">
    <input class="input primary" type="number" value="1" name="level" placeholder="level">
    <button class="btn primary">Tambah</button>
  </form>
</DriverInput>
