
<script lang=ts>
  import * as provinsi from "../../../provinsi.json";
    import { enhance } from "$app/forms";
  
  export let data: any
  const provList = Object.keys(provinsi).map( e => e.replaceAll('_', ' '))
  let kablist: string[] =  ['--kabupaten/kota--']
  
  let prov: string = '--provinsi--'
  
  $: {
    console.log('PROV',prov)
    // if (prov) {
      // kablist = (provinsi as Record<string,string>)[prov.replaceAll(' ','_')] ?? ['--kabupaten/kota--']
    // }
  }
  $: console.log('KAB',kablist)
  
  // const { form, enhance } = superForm(data.form);

</script>

<!-- extra div for containing in center of layout -->
<form class="grid grid-cols-1 gap-4" method="post" use:enhance>
  
  <section class="card">
    <h2>Insert Barang</h2>
    
    <div class="my-6"></div>
    
    <div class="grid grid-cols-1 gap-4">
      <label class="grid grid-cols-1">
        Jumlah Barang
        <input class="input" type="number" name="jumlah_barang" value="2" placeholder="jumlah barang">
      </label>
      
      <div class="grid grid-cols-2 gap-4">
        <input class="input" required type="text"   name="pengirim"   value="" placeholder="Pengirim"/>
        <input class="input" required type="text"   name="penerima"   value="" placeholder="Penerima"/>
        <input class="input" required type="number" name="nohp_penerima" value="" placeholder="No HP Penerima"/>
        
        <select class="input bg-transparent" name="provinsi" bind:value={prov} required placeholder="Provinsi">
          {#each provList as prov}
          <option value={prov}>{prov}</option>
          {/each}
        </select>
        
        <select class="input bg-transparent disabled:bg-slate-600" name="kabupaten" required>
          <!-- {#each kablist as k}
            <option value={k}>{k}</option>
          {/each} -->
        </select>
        
        <!-- <input class="input" required type="text"   name="provinsi"   value="" placeholder="Provinsi"/> -->
        <!-- <input class="input" required type="text"   name="kabupaten"  value="" placeholder="Kabupaten/Kota"/> -->
        <input class="input" required type="text"   name="kecamatan"  value="" placeholder="Kecamatan"/>
        <input class="input" required type="text"   name="kelurahan"  value="" placeholder="Kelurahan"/>
        <input class="input" required type="text"   name="jalan"      value="" placeholder="Jalan"/>
        
        <input class="input" required type="text"   name="kodepos"  value="" placeholder="Kode Pos"/>
        <input class="input" required type="number" name="berat"    value="" placeholder="Berat"/>
        <input class="input" required type="number" name="panjang"   value="" placeholder="Panjang"/>
        <input class="input" required type="number" name="lebar"   value="" placeholder="Lebar"/>
        <input class="input" required type="number" name="tinggi"   value="" placeholder="Tinggi"/>
      </div>
    </div>
  </section>
  
  <div class="grid grid-cols-2 gap-4">
    {#each {length: 2} as _,i}
      
    <section class="card">
      <h2>Koli Ke {i}</h2>
      
      <div class="">
        <input class="input" type="text" name="nama" placeholder="nama barang">
      </div>
    </section>
    
    {/each}
  </div>
    
  <div class="mt-2 grid shadow-md">
    <button class="btn primary">Submit</button>
  </div>
  
</form>
