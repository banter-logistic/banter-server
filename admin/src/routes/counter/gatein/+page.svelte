
<div class="i2xl:row-start-1">
  <section class="grid grid-cols-1 gap-4">
    
    <div class="card grid grid-cols-1 gap-4">
      <div class="grid grid-cols-2">
        <h1>SRG-1-1-00054</h1>
        
        <div class="text-right">
          <div>Kota Semarang</div>
          <div>5 Koli</div>
        </div>
      </div>
      <div class="my-3"></div>
      
      <h2>List Barang dalam Manifest</h2>
      <table class="w-full">
        <thead class="border-b-2">
          <tr>
            <th>No Resi</th>
            <th>Nama Barang</th>
            <th>Kota</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {#each {length: 5} as _}
          <tr class="text-center border-t border-slate-100 h-10">
            <td>123131</td>
            <td>Kursi</td>
            <td>Jakarta</td>
            <td>
              <label class="relative w-full">
                <input class="accent-primary w-full scale-150 cursor-pointer focus:outline-none border-none" type="checkbox">
              </label>
            </td>
          </tr>
          {/each}
          
        </tbody>
      </table>
      
      <div class="flex justify-end gap-4">
        <button class="btn primary">Semua</button>
        <button class="btn primary">Auto</button>
      </div>
      
    </div>
    
    <button class="btn primary shadow-lg">Submit</button>
    
  </section>
</div>

<!-- <div class="2xl:hidden block"></div> -->


<div class="max-w-60 i2xl:col-start-3">
  <aside class="card">
    <h2>John</h2>
    <div>X 1234 PW</div>
    <div>info</div>
  </aside>
</div>
