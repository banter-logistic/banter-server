<script lang=ts>
  import { onMount } from "svelte";
  import type { out } from "../create/+server";
  import { json, log } from "lib";
  import User from "./cp/User.svelte";
  
  let data: Promise<out[]>
  
  onMount(() => {
    data = json('').then(e=>{log(e);return e})
  })
</script>

<User/>

<label class="stack">
  Pos
  <select class="input primary" name="pos_id" required>
    {#await data}
      <option value="">loading...</option>
    {:then data} 
    
    <option value="">--Pilih Pos--</option>
    {#each data ?? [] as pos}
      <option value={pos.pos_id}>{pos.pos_nama}</option>
    {/each}
    
    {/await}
  </select>
</label>
