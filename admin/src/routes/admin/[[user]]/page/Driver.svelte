
<script lang=ts>
  import { date } from "lib/util/date";
  import type { pageData } from "../+page.server";
  
  export let data: pageData['driver']
  
</script>

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