<script lang=ts>
  import { date_compact } from "$lib";
  import { Container, Unwrap } from "cp";
  import { Manifest } from "cp/share";
  
  export let data
  
  const now = date_compact()
</script>

<section class="grid grid-cols-1 gap-4 max-w-[90vw] m-auto">
  
  <Manifest manifest={data.manifest}/>
  
  <Container>
    <table class="table">
      <thead>
        <tr>
          <th>No Resi</th>
          <th>Kota</th>
          <th>total koli</th>
          <th>aksi</th>
        </tr>
      </thead>
      <tbody>
        
        {#each data.manifest.barang as b(b.no_resi)}
        <tr>
          <td>{b.no_resi}</td>
          <td>{b.kota}</td>
          <td>{b.total_koli}</td>
          <td><button class="btn btn-primary btn-sm">Selesai</button></td>
        </tr>
        {/each}
          
      </tbody>
    </table>
  </Container>
  
</section>