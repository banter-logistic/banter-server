<script lang=ts>
  import type { load } from "../create/+page.server";
  import { Text, Passwd, Number } from "cp/input";
  
  export let data: load['sales']
</script>

<Text name="username" />
<Text name="nama" label="display nama" />
<Passwd name="passwd"/>

<!-- <input class="input primary" type="text" name="username" placeholder="username" required>
<input class="input primary" type="text" name="nama" placeholder="display nama" required>
<input class="input primary" type="password" name="passwd" placeholder="password" required> -->

<select class="input primary" name="pos_id" required>
  {#each data.data as pos}
  <option value={pos.id}>{pos.nama}</option>
  {/each}
</select>
