
<!-- extra div for containing in center of layout -->
<div class="grid grid-cols-1 gap-4">
  
  <section class="card">
    <h2>Insert Barang</h2>
    
    <div class="my-6"></div>
    
    <div class="grid grid-cols-1 gap-4">
      <label class="grid grid-cols-1">
        Jumlah Barang
        <input class="input" type="number" name="jumlah_barang" value="2" placeholder="jumlah barang">
      </label>
      
      <div class="grid grid-cols-2 gap-4">
        <input class="input" required type="text" name="pengirim"   value="" placeholder="Pengirim"/>
        <input class="input" required type="text" name="penerima"   value="" placeholder="Penerima"/>
        <input class="input" required type="number" name="no_hp"    value="" placeholder="No HP"/>
        <input class="input" required type="text" name="alamat"     value="" placeholder="Alamat"/>
        <input class="input" required type="text" name="kelurahan"  value="" placeholder="Kelurahan"/>
        <input class="input" required type="text" name="kecamatan"  value="" placeholder="Kecamatan"/>
        <input class="input" required type="text" name="kota"       value="" placeholder="Kota"/>
        <input class="input" required type="text" name="provinsi"   value="" placeholder="Provinsi"/>
        <input class="input" required type="number" name="kodepos"  value="" placeholder="Kode Pos"/>
        <input class="input" required type="number" name="berat"    value="" placeholder="Berat"/>
        <input class="input" required type="number" name="volume"   value="" placeholder="Volume"/>
      </div>
    </div>
  </section>
  
  <div class="grid grid-cols-2 gap-4">
    {#each {length: 2} as _,i}
      
    <section class="card">
      <h2>Koli Ke {i}</h2>
      
      <div class="">
        <input class="input" type="text" name="nama_barang_{i}" placeholder="nama barang">
      </div>
    </section>
    
    {/each}
  </div>
    
  <div class="mt-2 grid shadow-md">
    <button class="btn primary">Submit</button>
  </div>
  
</div>
