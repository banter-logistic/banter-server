

<script lang=ts>
  import { Number, Text,  } from "lib/cp/static";
  import Table from "lib/cp/Table.svelte";
  import { getContext } from "svelte";
  
  export let data
  
  $: getContext<any>('title').set(data.title)
  
</script>

<section class="w-max bg-white p-6 rounded-md border-t-2 border-primary shadow-md">
  {#key data}
  <Table data={data.data} />
  {/key}
</section>