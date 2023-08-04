<script lang=ts>
  export let data: api.Barang.BarangCounterList.Output
</script>

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
      {#each data as d (d.no_resi)}
      <tr>
        <td>{d.no_resi}</td>
        <td>{d.kota}</td>
        <td>{d.total_koli}</td>
      </tr>
      {/each}
    </tbody>
  </table>
</div>