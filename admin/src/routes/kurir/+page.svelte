

<script lang=ts>
  import { enhance } from "$app/forms";
  /**
   untuk tampilan kurir
  
  - fetch kurir
  
  - tampilkan semua barang
  
  - 1 kurir hanya bisa satu manifest ?
  
  - kurir bisa klik selesai untuk selesai kirim barang
  
  Technical:
  
  - form action untuk "selesai"
  
  - get untuk fetch kurir
  */
  import { Form, Unwrap, Container } from "cp";
  import type { PageServerData } from "./$types";
  
  export let form
  export let data: PageServerData
</script>

<div class="grid grid-cols-1 gap-4">
  <Container>
    <Unwrap result={data.queries} let:data>
      <div>Manifest Id {data.manifest.id}</div>
      <form action="?/kurir" method="post" use:enhance>
        <table class="table table-sm">
          <thead>
            <tr>
              <th>No Resi</th>
              <th>Kota</th>
              <th>Total Koli</th>
              <th>Action</th>
              <th>Tipe</th>
            </tr>
          </thead>
          <tbody>
            {#each data.barang as d, i (i)}
            <tr>
              <td>{d.no_resi}</td>
              <td>{d.kota}</td>
              <td>{d.total_koli}</td>
              <td>{d.tipe}</td>
              <td>
                {#if d.tipe == 'sampai'}
                <div>Selesai</div>
                {:else}
                <input type="checkbox" class="checkbox checkbox-primary" name="{String(d.no_resi)}">
                {/if}
              </td>
            </tr>
            {/each}
          </tbody>
        </table>
        
        <input type="hidden" name="driver" value={JSON.stringify(data.driver.id)}>
        <button class="btn btn-primary">Submit</button>
      </form>
      
    </Unwrap>
  </Container>
  <Form {form} let:form>
    <Unwrap result={form} let:data>
      {JSON.stringify(data)}
    </Unwrap>
  </Form>

  <form action="?/logout" method="post">
    <button class="btn btn-error">Logout</button>
  </form>
</div>
