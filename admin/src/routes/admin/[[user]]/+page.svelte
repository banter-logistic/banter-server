<script lang=ts>
  import { cross } from "$lib/form";
  import AdminList from "cp/Div.svelte";
  
  export let data
  
  $: rows = Object.keys(data.data[0] ?? {})
  
</script>

<AdminList cls="card">
  <h2 class="pl-2">List {data.route}</h2>
  <div class="my-6"></div>
  
  <!-- <svelte:component this={data.page} {data}></svelte:component> -->
  
  {#if data.data.length == 0}
    <div>List Kosong</div>
  {:else} 
  <table class="w-full">
    <thead class="border-b-2">
      <tr>
        {#each rows as row}
        {@const r = row.replace('user','').replaceAll('_',' ')}
        <th>{r}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each data.data as adm}
      <tr class="text-center border-t border-slate-100 h-10">
        {#each rows as row}
        <td>{adm[row]}</td>
        {/each}
        <!-- <td>{date(adm.user_dibuat).display}</td> -->
      </tr>
      {/each}
      
    </tbody>
  </table>
  {/if}
  
  <form class="flex justify-end mt-4 gap-4" action="/api?/logout" method="post" use:cross>
    <button class="btn primary transition">Logout</button>
    <a class="btn primary" href="./{data.route}/create">Tambah</a>
  </form>
  
</AdminList>
