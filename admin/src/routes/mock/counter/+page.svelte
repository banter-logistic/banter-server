<script lang=ts>
  
  import { Text, Number, Select } from "lib/cp/static";
  import Product from "lib/cp/static/Div.svelte";
  import Table from "lib/cp/Table.svelte";
  import { getContext } from "svelte";
  
  getContext<any>('title').set('List Barang')
  
  const data = [
    { id: '1', name: 'John', desc: 'lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom ', title: "lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom " },
    { id: '3', name: 'John', desc: 'lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom ', title: "lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom " },
    { id: '2', name: 'John', desc: 'lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom ', title: "lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom " },
    { id: '4', name: 'John', desc: 'lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom ', title: "lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom lorem ipsum dom " },
  ]
  
  
</script>

<section class="bg-white p-4 rounded-md shadow-md">
  
  <Table {data} />
  
</section>


