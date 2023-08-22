
<script lang=ts>
  import provinsi from "../../../../provinsi.json";
  import kabupaten from "../../../../kabupaten.json";
  
  let selectedProv: string
  
  // @ts-ignore
  $: kabList = kabupaten[selectedProv] ?? []
  
</script>

<input class="input primary" type="text" name="username" placeholder="username" required>
<input class="input primary" type="text" name="nama" placeholder="display nama" required>
<input class="input primary" type="password" name="passwd" placeholder="password" required>
<input class="input primary" type="text" name="nohp" placeholder="no hp" required>

<select class="input primary" name="alamat_provinsi" required bind:value={selectedProv}>
  {#each Object.values(provinsi) as prov}
  <option value={prov}>{prov}</option>
  {/each}
</select>

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

