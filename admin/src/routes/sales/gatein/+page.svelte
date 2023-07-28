


<script lang=ts>
  import { Fetch, Unwrap, Form, Container } from "cp"
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";
  import type { ManifestQuery } from "lib/handler/schema";
  
  let schema: Result<Zod.infer<typeof ManifestQuery['Output']>>
  
  export let form: ActionData
  let manifest_id: string
  let search_btn
  let search
</script>

<div class="grid grid-cols-1 gap-4">
  <Fetch {schema} let:fetch>
    <input type="number" bind:value={manifest_id} required placeholder="Manifest ID" bind:this={search} class="input input-lg">
    <button class="btn btn-primary" disabled={isNaN(parseInt(manifest_id))} bind:this={search_btn} on:click={()=>fetch('',{ q: manifest_id })}>Cari</button>
    
    <svelte:fragment slot="resolved" let:result>
      
      <Unwrap {result} let:data>
        <Container>
          Manifest id {data.manifest.id}
        </Container>
        <Container>
          Driver {data.driver.nama}, {data.driver.plat_nomor}
        </Container>
        <Container>
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
                {#each data.barang as d (d.no_resi)}
                <tr>
                  <td>{d.no_resi}</td>
                  <td>{d.kota}</td>
                  <td>{d.total_koli}</td>
                  <td><input type="checkbox" class="checkbox checkbox-primary" name="{String(d.no_resi)}"></td>
                </tr>
                {/each}
              </tbody>
            </table>
            <input type="hidden" name="pos_id" value={1}>
            <input type="hidden" name="manifest_id" value={data.manifest.id}>
            <button class="btn btn-primary">Submit</button>
          </form>
        </Container>
      </Unwrap>
      
    </svelte:fragment>
  </Fetch>
  
  <Form {form} let:form>
    {JSON.stringify(form)}
  </Form>
</div>