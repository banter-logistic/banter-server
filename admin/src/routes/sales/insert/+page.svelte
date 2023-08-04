

<script lang=ts>
  import { enhance } from "$app/forms";
  import { Container, Unwrap } from "cp";
  import { onMount } from "svelte";
  import { writable, type Writable } from "svelte/store";
  
  export let form
  let total_koli: number
  let snap: Writable<any> = writable({})
  let form_elem: HTMLFormElement
  $: console.log(form)
  onMount(init)
  
  function init() {
    const data = localStorage.getItem('insert_snapshot')
    if (data) {
      $snap = JSON.parse( data )
      total_koli = parseInt($snap.total_koli)
    } else {
      total_koli = 2
    }
  }
  
  function snapshot() {
    const formEnt = (new FormData(form_elem)).entries()
    const input = Object.fromEntries(formEnt)
    const snaped = JSON.parse( localStorage.getItem('insert_snapshot') ?? '{}' )
    
    for (const key in input) {
      if (input[key] == '') {
        delete input[key]
      }
    }
    
    const latestData = {...snaped,...input}
    snap.set(latestData)
    
    localStorage.setItem('insert_snapshot', JSON.stringify(latestData) )
  }
</script>

{#if !form}
  <form class="grid grid-cols-1 gap-4" action="" method="post" on:change={snapshot} bind:this={form_elem} use:enhance={() => {
    
    return async ({ result, update }) => {
      await update()
      console.log('after form',form)
      if (result.type == 'success') {
        localStorage.removeItem("insert_snapshot")
        total_koli = 0
        init()
      }
      
    };
  }}>
    
    <Container>
      <div class="grid grid-cols-2 gap-4">
        
        <div class="form-control col-span-2">
          <label for="Total Koli" class="label">
            <h1 class="label-text font-bold text-2xl">Total Koli</h1>
          </label>
          <input class="input input-bordered input-lg" name="total_koli" bind:value={total_koli} required type="number" placeholder="Total Koli" />
        </div>
        
        <input class="input input-bordered" required type="text" name="pengirim"   value={$snap?.pengirim ?? ''} placeholder="Pengirim"/>
        <input class="input input-bordered" required type="text" name="penerima"   value={$snap?.penerima ?? ''} placeholder="Penerima"/>
        <input class="input input-bordered" required type="number" name="no_hp"    value={$snap?.no_hp ?? ''} placeholder="No HP"/>
        <input class="input input-bordered" required type="text" name="alamat"     value={$snap?.alamat ?? ''} placeholder="Alamat"/>
        <input class="input input-bordered" required type="text" name="kelurahan"  value={$snap?.kelurahan ?? ''} placeholder="Kelurahan"/>
        <input class="input input-bordered" required type="text" name="kecamatan"  value={$snap?.kecamatan?? ''} placeholder="Kecamatan"/>
        <input class="input input-bordered" required type="text" name="kota"       value={$snap?.kota ?? ''} placeholder="Kota"/>
        <input class="input input-bordered" required type="text" name="provinsi"   value={$snap?.provinsi ?? ''} placeholder="Provinsi"/>
        <input class="input input-bordered" required type="number" name="kodepos"  value={$snap?.kodepos ?? ''} placeholder="Kode Pos"/>
        <input class="input input-bordered" required type="number" name="berat"    value={$snap?.berat ?? ''} placeholder="Berat"/>
        <input class="input input-bordered" required type="number" name="volume"   value={$snap?.volume ?? ''} placeholder="Volume"/>
        
      </div>
    </Container>
    
    <div class="grid grid-cols-2 gap-4">
      {#each { length: total_koli} as _,i }
      <Container>
        <div class="grid grid-cols-2 gap-4">
          <div class="form-control">
            <h2 class="font-bold">Koli Ke</h2>
            <div class="text-4xl font-bold">{i + 1}</div>
          </div>
          
          <div class="form-control">
            <h2 class="font-bold">Nama</h2>
            <input class="input input-bordered input-lg" name="nama_{i + 1}" value={$snap?.[`nama_${i+1}`] ?? ''} type="text" placeholder="Nama"/>
          </div>
            
        </div>
      </Container>
      {/each}
    </div>
    
    <button class="btn btn-primary">Submit</button>
  </form>
{:else}
  <Unwrap result={form} let:data>
    <Container>
      Manifest ID {data.no_resi}
    </Container>
  </Unwrap>
{/if}