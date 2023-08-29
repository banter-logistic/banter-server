<script lang=ts>
  import { cross } from "$lib/form";
  import List from "cp/Div.svelte";
  
  export let data
  
  $: rows = Object.keys(data.data[0] ?? {})
  
</script>

<List class="card">
  <h2 class="pl-2 mb-12">List {data.route}</h2>
  
  {#if data.data.length == 0}
    <div>List Kosong</div>
  {:else} 
  <div class="overflow-auto pb-8">
    <table class="min-w-[1000px]">
      <thead class="border-b-2">
        <tr>
          {#each rows as row}
          {@const r = row.replace('user','').replaceAll('_',' ')}
          <th class="px-6 text-left whitespace-nowrap">{r}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each data.data as adm}
        <tr class="border-t border-slate-100 h-10">
          {#each rows as row}
          <td class="px-6 whitespace-nowrap">{adm[row]}</td>
          {/each}
        </tr>
        {/each}
      </tbody>
    </table>
  </div>
  {/if}
  
  <form class="flex justify-end mt-4 gap-4" action="/api?/logout" method="post" use:cross>
    <button class="btn primary transition">Logout</button>
    <a class="btn primary" href="./{data.route}/create">Tambah</a>
  </form>
  
</List>
