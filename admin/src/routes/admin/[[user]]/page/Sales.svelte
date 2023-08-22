
<script lang=ts>
  import { date } from "lib/util/date";
  import type { pageData } from "../+page.server";
  
  export let data: pageData['sales']
</script>

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