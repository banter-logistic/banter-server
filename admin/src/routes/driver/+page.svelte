


<section class="min-h-screen bg-base">
  <nav class="bg-white shadow-md grid grid-cols-2 p-3">
    <div class="font-bold text-xl">BANTER</div>
    <div class="text-right">Driver Mock</div>
    
  </nav>
  
  <div class="my-3"></div>
  
  <div class="card m-2">
    <div class="overflow-auto md:overflow-hidden">
      <h2>Maniefst</h2>
      <div class="grid grid-cols-2">
        <strong class="border-b-2">No</strong>
        <strong class="border-b-2">Kota</strong>
      {#each {length: 3} as _}
          <div class="border-b border-base p-1">SRG-1-1-0005</div>
          <div class="border-b border-base p-1">Jakarta</div>
      {/each}
      </div>
    </div>
  </div>

  <div class="card mx-2">
    <div class="overflow-auto md:overflow-hidden">

      <table class="w-full">
        <thead class="border-b-2">
          <tr>
            <th>No Resi</th>
            <th>Nama Barang</th>
            <th>Kota</th>
          </tr>
        </thead>
        <tbody>
          {#each {length: 5} as _}
          <tr class="text-center border-t border-slate-100 h-10">
            <td>123131</td>
            <td>Kursi</td>
            <td>Jakarta</td>
          </tr>
          {/each}
        </tbody>
      </table>

    </div>
  </div>
  
  <div class="flex justify-end m-4">
    <button class="btn primary">Logout</button>
  </div>
  
</section>