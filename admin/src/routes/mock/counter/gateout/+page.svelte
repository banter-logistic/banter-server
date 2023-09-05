

<script lang=ts>
  import { Text } from "lib/cp/static";
  import Table from "lib/cp/Table.svelte";
  import Dump from "lib/cp/Dump.svelte";
  import { listBarang } from "lib/faker/dummy";
  import { getContext } from "svelte";
  
  const data = listBarang
  
  getContext<any>('title').set('Gateway Out')
  
</script>

<section class="bg-white shadow-md p-4 rounded-md my-4">
  
  <Table {data}>
    
    <svelte:fragment slot="th">
      Action
    </svelte:fragment>
    
    <input type="checkbox" class="form-checkbox" slot="td">
    
  </Table>
  
  
</section>

<section class="flex gap-8">
  
  
  <section class="w-break-4 overflow-auto">
    
    <Text label="Driver ID" />
    
    <button class="btn primary my-2">Pilih Kota</button>
    
  </section>
  
  
  
  <section class="w-break-4 overflow-auto">
    <h2 class="my-3">Driver</h2>
    <Dump data={{driver: 'John Doe',vehicle: 'Truck'}} />
    
  </section>
  
  
</section>