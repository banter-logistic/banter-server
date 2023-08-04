<script lang=ts>
  export let manifest: view.ManifestDisplay
  import { Container } from "cp";
</script>

<Container>
  <div class="grid">
    <header class="mb-8">
      <h1 class="text-4xl font-bold my-5">BANTER</h1>
      <table class="border-collapse border border-slate-500 w-full">
        <thead>
          <tr>
            <th class="border border-slate-400">Manifest</th>
            <th class="border border-slate-400">Driver</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-slate-400 p-1 text-center">MAN00000{manifest.manifest.manifest_id}</td>
            <td class="border border-slate-400 p-1 text-center">{manifest.driver.nama}</td>
          </tr>
          <tr>
            <td class="border border-slate-400 p-1 text-center">{manifest.barang.reduce( (acc,e) => acc + e.total_koli, 0 )} koli</td>
            <td class="border border-slate-400 p-1 text-center">{manifest.driver.plat_nomor}</td>
          </tr>
        </tbody>
      </table>
    </header>
    
    <div class="overflow-x-auto my-4">
      <table class="table table-md">
        <thead>
          <tr>
            <th>No Resi</th>
            <th>Kota</th>
            <th>Total Koli</th>
          </tr>
        </thead>
        <tbody>
          {#each manifest.barang as brg (brg.no_resi)}
          <tr>
            <td>{brg.no_resi}</td>
            <td>{brg.kota}</td>
            <td>{brg.total_koli}</td>
          </tr>
          {/each}
        </tbody>
      </table>
    </div>

  </div>
</Container>