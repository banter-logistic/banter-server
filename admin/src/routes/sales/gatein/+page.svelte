<script lang=ts>
  import { Fetch, Unwrap, Form, Container } from "cp"
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";
  
  let schema: Result<api.Manifest.GetManifest.Output>
  
  export let form: ActionData
  let manifest_id: string
  let search_btn
  let search
  
  export let data
</script>

<div class="grid grid-cols-1 gap-4">
  <Fetch {schema} let:fetch>
    <input type="number" bind:value={manifest_id} required placeholder="Manifest ID" bind:this={search} class="input input-lg">
    <button class="btn btn-primary" disabled={isNaN(parseInt(manifest_id))} bind:this={search_btn} on:click={()=>fetch('',{ q: manifest_id })}>Cari</button>
    
    <svelte:fragment slot="resolved" let:result>
      
      <Unwrap {result} let:data={manifestData}>
        <Container>
          Manifest id {manifestData.manifest.manifest_id}
        </Container>
        <Container>
          Driver {manifestData.driver.nama}, {manifestData.driver.plat_nomor}
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
                {#each manifestData.barang as d (d.no_resi)}
                <tr>
                  <td>{d.no_resi}</td>
                  <td>{d.kota}</td>
                  <td>{d.total_koli}</td>
                  <td><input type="checkbox" class="checkbox checkbox-primary" name="{String(d.no_resi)}"></td>
                </tr>
                {/each}
              </tbody>
            </table>
            <input type="hidden" name="pos_id" value={data.session.pos_id}>
            <input type="hidden" name="manifest_id" value={manifestData.manifest.manifest_id}>
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