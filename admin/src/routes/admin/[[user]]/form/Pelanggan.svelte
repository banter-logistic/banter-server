
<script lang=ts>
  import type { load } from "../create/+page.server";
  import { cache } from "lib/util/fetch";
  
  
  export let data: load['pos']
  
  const dash = (s: string) => s.replaceAll(' ','-')
  
  let beforeProv: string
  let beforeKab: string
  let beforeKec: string
  
  let selectedProv: string
  let selectedKab: string
  let selectedKec: string
  let selectedKel: string
  let selectedKodepos: string | null = null
  let kodepos: string | null = null
  
  let provinsiList = data.data.provinsi
  let kabupatenList: any[] = []
  let kecamatanList: any | null
  let kelurahanList: any | null
  
  $: {
    if (selectedProv != beforeProv){
      selectedKab = selectedKec = beforeKab = beforeKec = selectedKel = ''
      beforeProv = selectedProv
    }  else
    if (selectedKab != beforeKab){
      selectedKec = beforeKec = ''
      beforeKab = selectedKab
    }
    
    if (selectedProv) {
      // if prov change, change kabupaten list
      cache(`/api/kodepos/${dash(selectedProv)}`)
        .then( res => kabupatenList = res.data)
    } else {
      kabupatenList = []
      selectedKab = selectedKec = selectedKel = ''
    }
    
    if (selectedKab) {
      // if kab change, change kecamatan list
      cache(`/api/kodepos/${dash(selectedProv)}/${dash(selectedKab)}`)
        .then( res => kecamatanList = res.data)
    } else {
      kecamatanList = null
      selectedKec = selectedKel = ''
    }
    
    if (selectedKec) {
      // if kec change, change kelurahan list
      cache(`/api/kodepos/${dash(selectedProv)}/${dash(selectedKab)}/${dash(selectedKec)}`)
        .then( res => kelurahanList = res.data)
    } else {
      kelurahanList = null
      selectedKel = ''
    }
    
    if (selectedKel) {
      // if kec change, change kelurahan list
      cache(`/api/kodepos/${dash(selectedProv)}/${dash(selectedKab)}/${dash(selectedKec)}/${dash(selectedKel)}`)
        .then( res => selectedKodepos = res.data)
    } else {
      selectedKodepos = null
    }
  }
  
  
</script>

<input class="input primary" type="text" name="username" placeholder="username" required>
<input class="input primary" type="text" name="nama" placeholder="display nama" required>
<input class="input primary" type="password" name="passwd" placeholder="password" required>
<input class="input primary" type="text" name="nohp" placeholder="no hp" required>


<select class="input primary" name="alamat_provinsi" required bind:value={selectedProv}>
  <option value="">--Provinsi--</option>
  {#each provinsiList as prov}
  <option value={prov}>{prov}</option>
  {/each}
</select>

<select class="input primary" name="alamat_kabupaten" required bind:value={selectedKab}>
  <option value="">--Kabupaten--</option>
  {#each kabupatenList as kab}
  <option value={kab}>{kab}</option>
  {/each}
</select>

{#if kecamatanList}
<select class="input primary" name="alamat_kecamatan" required bind:value={selectedKec}>
  <option value="">--Kecamatan--</option>
  {#each kecamatanList as kec}
  <option value={kec}>{kec}</option>
  {/each}
</select>
{:else}  
<input class="input primary" type="text" name="alamat_kecamatan" placeholder="kecamatan" required>
{/if}

{#if kelurahanList}
<select class="input primary" name="alamat_kelurahan" required bind:value={selectedKel}>
  <option value="">--Kelurahan--</option>
  {#each kelurahanList as kel}
  <option value={kel}>{kel}</option>
  {/each}
</select>
{:else}  
<input class="input primary" type="text" name="alamat_kelurahan" placeholder="kelurahan" required>
{/if}


<input class="input primary" type="text" name="alamat_detail" placeholder="alamat detail" required>

{#if Boolean(selectedKodepos)}
<input class="input primary" type="text" name="alamat_kodepos" bind:value={selectedKodepos} placeholder="kodepos" required readonly={true}>
{:else}
<input class="input primary" type="text" name="alamat_kodepos" bind:value={kodepos} placeholder="kodepos" required>
{/if}
