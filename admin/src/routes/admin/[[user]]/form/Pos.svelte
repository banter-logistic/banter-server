
<script lang=ts>
  import { getContext, onMount } from "svelte";
  import { cache } from "lib/util/fetch";
  import Text from "./input/Text.svelte";
  import type { Writable } from "svelte/store";
  import Select from "./input/Select.svelte";
  import type { alamat } from "lib/database/schema";
  import { Number } from "cp/input";
  import { log } from "lib";
  
  const posValues = [
    'WHS',
    'DSC',
    'CTR',
  ]
  const posDisplay = [
    'warehouse | WHS',
    'distribution center | DSC',
    'counter | CTR',
  ]
  
  let data = { data: [] }
  let { form } = getContext<{ form: Writable<alamat> }>('form')
  
  onMount(() => {
    cache('/api/kodepos').then(e=>data=e)
  })
  
  const dash = (s: string) => s.replaceAll(' ','-')
  
  let selectedKodepos: string = 'null'
  $: form.update(e=>{
    e.alamat_kodepos = selectedKodepos;
    return e
  })
  
  // RESET, WHEN VALUE CHANGE, ANY DEPENDANT RESET
  $: prov = $form.alamat_provinsi
  $: {prov;reset()}
  
  function reset() {
    $form.alamat_kabupaten = ''
    $form.alamat_kecamatan = ''
    $form.alamat_kelurahan = ''
    $form.alamat_kodepos = ''
  }
  
  $: kabs = $form.alamat_kabupaten
  $: {kabs;reset2()}
  
  function reset2() {
    $form.alamat_kecamatan = ''
    $form.alamat_kelurahan = ''
    $form.alamat_kodepos = ''
  }
  // END RESET
  
  $: provinsiList = data.data
  let kabupatenList: any[] = []
  let kecamatanList: any[]
  let kelurahanList: any[]
  let kodeposList: any[]
  
  $: {
    if ($form.alamat_provinsi) {
      // if prov change, change kabupaten list
      cache(`/api/kodepos/${dash($form.alamat_provinsi)}`)
        .then( res => kabupatenList = res.data);
    } else {
      kabupatenList = []
      $form.alamat_kabupaten = ''
    }
    
    if ($form.alamat_kabupaten) {
      // if kab change, change kecamatan list
      cache(`/api/kodepos/${dash($form.alamat_provinsi)}/${dash($form.alamat_kabupaten)}`)
        .then( res => kecamatanList = res.data)
    } else {
      kecamatanList = []
      $form.alamat_kecamatan = ''
    }
    
    if ($form.alamat_kecamatan) {
      // if kec change, change kelurahan list
      cache(`/api/kodepos/${dash($form.alamat_provinsi)}/${dash($form.alamat_kabupaten)}/${dash($form.alamat_kecamatan)}`)
        .then( res => kelurahanList = res.data)
    } else {
      kelurahanList = []
      $form.alamat_kelurahan = ''
    }
    
    if ($form.alamat_kelurahan) {
      // if kec change, change kelurahan list
      cache(`/api/kodepos/${dash($form.alamat_provinsi)}/${dash($form.alamat_kabupaten)}/${dash($form.alamat_kecamatan)}/${dash($form.alamat_kelurahan)}`)
        .then( res => selectedKodepos = res.data)
    } else {
      kodeposList = []
      // $form.alamat_kodepos = ''
    }
  }
  
  
</script>

<Text name="pos_nama" label="nama pos" />

<Select name="pos_tipe" label="tipe" values={posValues} display={posDisplay} />
<Select name="alamat_provinsi" label="provinsi" values={provinsiList} />
<Select name="alamat_kabupaten" label="kabupaten" values={kabupatenList} />
<Select name="alamat_kecamatan" label="kecamatan" values={kecamatanList} />
<Select name="alamat_kelurahan" label="kelurahan" values={kelurahanList} />
<Text name="alamat_detail" label="alamat detail" />


{#if selectedKodepos}

<Number name="alamat_kodepos" label="kodepos" value={selectedKodepos} readonly={true} />

{:else}

<Number name="alamat_kodepos" label="kodepos" bind:value={selectedKodepos} />

{/if}
