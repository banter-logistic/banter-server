<script lang=ts>
  import type { load } from "../create/+page.server";
  
  export let data: load['sales']
</script>

<input class="input primary" type="text" name="username" placeholder="username" required>
<input class="input primary" type="text" name="nama" placeholder="display nama" required>
<input class="input primary" type="password" name="passwd" placeholder="password" required>

<select class="input primary" name="pos_id" required>
  {#each data.data as pos}
  <option value={pos.id}>{pos.nama}</option>
  {/each}
</select>
  
<button class="btn primary">Tambah</button>