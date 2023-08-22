<script>
  import { cross } from "$lib/form";
  import { date } from "lib/util/date";
  import KurirList from "cp/Div.svelte";
  import KurirInput from "cp/Div.svelte";
  import { enhance } from "$app/forms";
  
  export let data
  
</script>

<KurirList cls="card">
  <h2 class="pl-2">List Kurir</h2>
  <div class="my-6"></div>
  <table class="w-full">
    <thead class="border-b-2">
      <tr>
        <th>id</th>
        <th>username</th>
        <th>nama</th>
        <th>nohp</th>
        <th>kendaraan</th>
        <th>kubikase</th>
        <th>plat nomor</th>
        <th>dibuat</th>
      </tr>
    </thead>
    <tbody>
      {#each data.data as sls}
      {@const {
        user_id, user_username, user_nama, user_dibuat,
        driver_nohp, driver_jenis_kendaraan, driver_kubikase, driver_plat_nomor
      } = sls}
      <tr class="text-center border-t border-slate-100 h-10">
        <td>{user_id}</td>
        <td>{user_username}</td>
        <td>{user_nama}</td>
        <td>{driver_nohp}</td>
        <td>{driver_jenis_kendaraan}</td>
        <td>{driver_kubikase}</td>
        <td>{driver_plat_nomor}</td>
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
  
</KurirList>
  
<KurirInput cls="card">
  <h2 class="font-bold text-2xl">Input Kurir</h2>
  <div class="my-6"></div>
  <form method="post" use:enhance class="grid grid-cols-1 gap-4">
    <input class="input primary" type="text" name="username" placeholder="username">
    <input class="input primary" type="text" name="nama" placeholder="display nama">
    <input class="input primary" type="password" name="passwd" placeholder="password">
    <input class="input primary" type="number" value="1" name="level" placeholder="level">
    <button class="btn primary">Tambah</button>
  </form>
</KurirInput>
