<script>
  import { cross } from "$lib/form";
  import { date } from "lib/util/date";
  import AdminList from "cp/Div.svelte";
  import AdminInput from "cp/Div.svelte";
  import { enhance } from "$app/forms";
  
  export let data
  
</script>


<div class="grid grid-cols-1 w-[1024px]">
  <div>
    
    <div class="grid grid-cols-1 gap-4">
      
      <AdminList cls="card">
        <h2 class="pl-2">List Admin</h2>
        <div class="my-6"></div>
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
        
        <form class="flex justify-end mt-4" action="/api?/logout" method="post" use:cross>
          <button class="btn primary transition">Logout</button>
        </form>
        
      </AdminList>
      
      <AdminInput cls="card">
        <h2 class="font-bold text-2xl">Input</h2>
        <div class="my-6"></div>
        <form method="post" use:enhance class="grid grid-cols-1 gap-4">
          <input class="input primary" type="text" name="username" placeholder="username">
          <input class="input primary" type="text" name="nama" placeholder="display nama">
          <input class="input primary" type="password" name="passwd" placeholder="password">
          <input class="input primary" type="number" value="1" name="level" placeholder="level">
          <button class="btn primary">Tambah</button>
        </form>
      </AdminInput>
      
    </div>
  </div>
</div>
  

