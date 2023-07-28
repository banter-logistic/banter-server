

<script lang=ts>
  import { Post, Unwrap, Container } from "cp";
  import { store } from "./data";
  import { page } from "$app/stores";
  import { invalidateAll } from "$app/navigation";
  
  // const prom = getProm
  
  let inn: any//api.BarangInsert['Input']
  let res: any//Result<IApi.BarangInsert['Output']>
</script>

<div class="grid grid-cols-1 gap-4">
  <Post let:fetch schemaIn={inn} schemaRes={res}>
    
    <div slot="resolved"  let:result>
      {@const _ = invalidateAll()}
      <Container>
        <Unwrap {result} let:data>
          Barang id {data.no_resi}
        </Unwrap>
      </Container>
    </div>
    
    <Container>
      <div class="grid grid-cols-2 gap-4">
        
        <div class="form-control col-span-2">
          <label for="Total Koli" class="label">
            <h1 class="label-text font-bold text-2xl">Total Koli</h1>
          </label>
          <input type="number" bind:value={$store.alamat.total_koli} id="Total Koli" placeholder="Total Koli" class="input input-bordered input-lg" />
        </div>
        
        <input type="text" id="Pengirim" placeholder="Pengirim" class="input input-bordered" bind:value={$store.alamat.pengirim} />
        <input type="text" id="Penerima" placeholder="Penerima" class="input input-bordered" bind:value={$store.alamat.penerima} />
        <input type="number" id="No HP" placeholder="No HP" class="input input-bordered" bind:value={$store.alamat.nohp_penerima} />
        <input type="text" id="Alamat" placeholder="Alamat" class="input input-bordered" bind:value={$store.alamat.alamat} />
        <input type="text" id="Kelurahan" placeholder="Kelurahan" class="input input-bordered" bind:value={$store.alamat.kelurahan} />
        <input type="text" id="Kecamatan" placeholder="Kecamatan" class="input input-bordered" bind:value={$store.alamat.kecamatan} />
        <input type="text" id="Kota" placeholder="Kota" class="input input-bordered" bind:value={$store.alamat.kota} />
        <input type="text" id="Provinsi" placeholder="Provinsi" class="input input-bordered" bind:value={$store.alamat.provinsi} />
        <input type="number" id="Kode Pos" placeholder="Kode Pos" class="input input-bordered" bind:value={$store.alamat.kodepos} />
        <input type="number" id="Berat" placeholder="Berat" class="input input-bordered" bind:value={$store.alamat.berat} />
        <input type="number" id="Volume" placeholder="Volume" class="input input-bordered" bind:value={$store.alamat.volume} />
        
      </div>
    </Container>
    
    <div class="grid grid-cols-2 gap-4">
      {#each { length: $store.alamat.total_koli} as _,i }
      <Container>
        <div class="grid grid-cols-2 gap-4">
          
          <div class="form-control">
            <h2 class="font-bold">Koli Ke</h2>
            <input type="number" readonly id="Koli Ke" placeholder="Koli Ke" class="input input-bordered input-lg" bind:value={$store.barang_details[i].koli_ke} />
          </div>
          
          <div class="form-control">
            <h2 class="font-bold">Nama</h2>
            <input type="text" id="Nama" placeholder="Nama" class="input input-bordered input-lg" bind:value={$store.barang_details[i].nama} />
          </div>
            
        </div>
      </Container>
      {/each}
    </div>
    
    <button class="btn btn-primary" on:click={e=>{
      const data = $store
      data.barang_details = data.barang_details.slice(0,data.alamat.total_koli)
      data.counter_id = $page.data.session.pos_id
      console.log(data)
      fetch(data)
    }}>Submit</button>
    
  </Post>
</div>