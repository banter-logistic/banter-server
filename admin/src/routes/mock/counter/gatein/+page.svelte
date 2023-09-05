

<script lang=ts>
  import { Text } from "lib/cp/static";
  import Table from "lib/cp/Table.svelte";
  import Dump from "lib/cp/Dump.svelte";
  import { listBarang } from "lib/faker/dummy";
  import { getContext } from "svelte";
  
  const data = listBarang
  
  getContext<any>('title').set('Gateway In')
  
</script>

<section class="flex gap-8">
  
  
  <section class="w-break-4 overflow-auto">
    
    <Text label="Manifest ID"/>
    
    <button class="btn primary my-2">Pilih Semua</button>
    <button class="btn primary my-2">Submit</button>
    
  </section>
  
  
  
  <section class="w-break-4 overflow-auto bg-white shadow-md p-4 rounded-md">
    <h2 class="mb-3">Manifest</h2>
    <Dump data={{id: 'JKT-4-6-0389', provinsi: 'Jakarta', kabupaten: 'Jakarta Tengah'  }} />
    
  </section>
  
  
</section>

<section class="bg-white shadow-md p-4 rounded-md my-4">
  
  <Table {data}>
    
    <svelte:fragment slot="th">
      Action
    </svelte:fragment>
    
    <input type="checkbox" class="form-checkbox" slot="td">
    
  </Table>
  
  
</section>