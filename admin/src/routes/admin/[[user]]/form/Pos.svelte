
<script lang=ts>
  import provinsi from "../../../../provinsi.json";
  import kabupaten from "../../../../kabupaten.json";
  const posTipe = [
    { tipe: 'WHS', display: 'warehouse | WHS' },
    { tipe: 'DSC', display: 'distribution center | DSC' },
    { tipe: 'CTR', display: 'counter | CTR' },
  ]
  
  let selectedProv: string
  
  // @ts-ignore
  $: kabList = kabupaten[selectedProv] ?? []
  
</script>

<input class="input primary" type="text" name="pos_nama" placeholder="nama pos" required>

<!-- <input class="input primary" type="text" name="pos_tipe" placeholder="tipe" required> -->
<select class="input primary" name="pos_tipe" required>
  {#each posTipe as { tipe, display }}
  <option value={tipe}>{display}</option>
  {/each}
</select>

<!-- <input class="input primary" type="text" name="alamat_provinsi" placeholder="provinsi" required> -->
<select class="input primary" name="alamat_provinsi" required bind:value={selectedProv}>
  {#each Object.values(provinsi) as prov}
  <option value={prov}>{prov}</option>
  {/each}
</select>

<!-- <input class="input primary" type="text" name="alamat_kabupaten" placeholder="kabupaten" required> -->
<select class="input primary" name="alamat_kabupaten" required>
  {#each kabList as kab}
  <option value={kab}>{kab}</option>
  {/each}
</select>

<input class="input primary" type="text" name="alamat_kecamatan" placeholder="kecamatan" required>
<input class="input primary" type="text" name="alamat_kelurahan" placeholder="kelurahan" required>
<input class="input primary" type="text" name="alamat_detail" placeholder="alamat detail" required>

<input class="input primary" type="text" name="alamat_kodepos" placeholder="kodepos" required>

<button class="btn primary">Tambah</button>

