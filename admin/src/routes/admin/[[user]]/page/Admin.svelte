
<script lang=ts>
  import { date } from "lib/util/date";
  import type { pageData } from "../+page.server";
  
  export let data: pageData['admin']
</script>

<table class="w-full">
  <thead class="border-b-2">
    <tr>
      <th>id</th>
      <th>username</th>
      <th>nama</th>
      <th>level</th>
      <th>dibuat</th>
    </tr>
  </thead>
  <tbody>
    {#each data.data as adm}
    <tr class="text-center border-t border-slate-100 h-10">
      <td>{adm.user_id}</td>
      <td>{adm.user_username}</td>
      <td>{adm.user_nama}</td>
      <td>{adm.admin_level}</td>
      <td>{date(adm.user_dibuat).display}</td>
    </tr>
    {/each}
    
  </tbody>
</table>