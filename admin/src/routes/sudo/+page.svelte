

<script lang=ts>
  import { r } from "$lib";
  import { onMount } from "svelte";
  
  let promise: ReturnType<typeof r['sudo']['describe']['query']> | null
    
  onMount(() => {
    promise = r.sudo.describe.query({ table: 'alamat' })
  })
</script>

<section class="bg-base min-h-screen">
  
  {#if promise}
  {#await promise}
  loading...
  {:then res}
  
  <div class="w-full p-8">
    <table class="w-full bg-white">
      <thead>
        <tr>
          <td class="py-3 text-center border-b-2">No</td>
          {#each res as row}
            <td class="py-3 text-center border-b-2">{row.Field}</td>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each { length: 5 } as _}
        <tr>
          {#each { length: Object.keys(res[0]).length + 1 } as _}
          <td class="text-center border-b py-3">lwofwa</td>
          {/each}
        </tr>
        {/each}
      </tbody>
    </table>
  </div>
  
  <form action=""></form>
  
  {:catch er}
  {JSON.stringify(er)}
  {/await}
  {/if}
  
  
  
  
  
</section>