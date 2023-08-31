
<script lang=ts>
  import type { out } from "../create/+server";
  import { onMount } from "svelte";
  import { json } from "lib";
  import User from "./cp/User.svelte";
  import Select from "./input/Select.svelte";
  
  let display: any[] = ['loading...']
  let values: any[] = ['']
  
  // fetch list pos
  onMount(async () => {
    const res = await json('')
    values = res.map((e:any)=>e.pos_id)
    display = res.map((e:any)=>e.pos_nama)
  })
</script>

<User/>

<Select name="pos_id" label="pilih pos" {values} {display} />

<!-- <select class="input primary" name="pos_id" required>
  {#await promise}
    <option value="">loading...</option>
  {:then data} 
  
  {#each data ?? [] as pos}
    <option value={pos.pos_id}>{pos.pos_nama}</option>
  {/each}
  
  {/await}
</select> -->
