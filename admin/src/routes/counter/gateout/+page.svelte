

<script lang=ts>
  import { enhance } from "$app/forms";
  import { getProm } from "cp/fetch";
  import { Unarray, Fetch, Unwrap, Form, Container } from "cp";
  import type { DriverSchema } from "lib/schema/database.js";
    import type { ActionData } from "./$types.js";
  
  const prom = getProm<Result<Zod.infer<typeof DriverSchema>>>('')
  let driver_id = ''
  
  let search: any
  let tipe: any
  let search_btn: any
  let reset_btn: any
  
  // $: disabled = prom.store
  
  export let form: ActionData
  export let data
</script>

<!-- FETCH: DRIVER -->
<!-- FETCH: QUERIES -->
<!-- FETCH: GATEOUT -->

<svelte:window 
  on:keydown={e=>e.key == "Enter" && search_btn?.click()} 
  on:keydown={e=>e.key == "Escape" && reset_btn?.click()}
  on:keydown={e=>e.key == "/" && search.focus()}
/>

<div class="grid grid-cols-1 gap-4">
  
  <Fetch {prom}>
    <div class="w-full join">
      <input class="input input-bordered input-lg flex-1 join-item" type="number" bind:value={driver_id} required placeholder="driver id" bind:this={search}>
      <select name="tipe" class="input input-base input-bordered input-lg join-item" bind:value={tipe} required>
        <option>driver</option>
        <option>kurir</option>
      </select>
      <button class="btn btn-primary btn-lg join-item no-animation" disabled={isNaN(parseInt(driver_id))} bind:this={search_btn} on:click={()=>prom.fetch('',{ q: driver_id, tipe })}>Cari</button>
    </div>
    
    <svelte:fragment slot="resolved" let:result let:reset>
      <div class="join w-full">
        <Unwrap {result} let:data>
          <div class="bg-base-100 p-4 flex-1 join-item">Driver {data.nama}, {data.plat_nomor}</div>
        </Unwrap>
        <button class="btn btn-primary btn-lg join-item no-animation" bind:this={reset_btn} on:click={reset}>Reset</button>
      </div>
    </svelte:fragment>
  </Fetch>
  <!-- <div class="w-full join">
    <input class="input input-bordered input-lg flex-1 join-item" type="number" bind:value={driver_id} required placeholder="driver id" bind:this={search}>
    <button class="btn btn-primary btn-lg join-item no-animation" disabled={isNaN(parseInt(driver_id))} bind:this={search_btn} on:click={()=>prom.fetch('',{ q: driver_id })}>Cari</button>
  </div> -->
  
  <Form {form} let:form>
    <Container>
      <Unwrap result={form} let:data>
        Manifest id: {data.manifest.id}
      </Unwrap>
    </Container>
  </Form>
  
  <Container>
    <Unarray result={data.queries} let:data>
      <form method="post" class="overflow-x-auto" use:enhance>
        <table class="table table-sm">
          <thead>
            <tr>
              <th>No Resi</th>
              <th>Kota</th>
              <th>Total Koli</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {#each data as d (d.no_resi)}
            <tr>
              <td>{d.no_resi}</td>
              <td>{d.kota}</td>
              <td>{d.total_koli}</td>
              <td><input type="checkbox" class="checkbox checkbox-primary" name="{String(d.no_resi)}"></td>
            </tr>
            {/each}
          </tbody>
        </table>
        
        <Fetch {prom}>
          <button class="btn btn-primary" disabled>Submit</button>
          <svelte:fragment slot="resolved" let:result>
            <Unwrap {result} let:data>
              <input type="hidden" name="driver" value={data.id}>
              <input type="hidden" name="tipe" bind:value={tipe}>
              <button class="btn btn-primary">Submit</button>
            </Unwrap>
          </svelte:fragment>
        </Fetch>
      </form>
    </Unarray>
  </Container>
  
</div>