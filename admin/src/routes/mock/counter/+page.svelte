<script lang=ts>
  import { arr, randLi, randWo } from "lib/faker";
  import Table from "lib/cp/Table.svelte";
  import { getContext } from "svelte";
  
  getContext<any>('title').set('List Barang')
  
  const data = arr(40, i => {
    return { id: i+1, name: randWo(), desc: randLi(20) }
  })
  
  
</script>

<section class="bg-white p-4 rounded-md shadow-md">
  
  <Table {data} />
  
</section>


