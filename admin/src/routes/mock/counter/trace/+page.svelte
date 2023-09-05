

<script lang=ts>
  import Dump from "lib/cp/Dump.svelte";
  import { Text } from "lib/cp/static";
    import { getContext } from "svelte";
  
  const data = {
    no_resi: 'JTG-2-2-0386',
    provinsi: 'Jawa Tengah',
    nama: 'John Doe',
    kota: 'Semarang',
    harga: 40000,
  }
  
  getContext<any>('title').set('Tracing')
  
</script>

<section class="w-break-4">
  
  
  <Text label="No Resi" />
  
  
</section>

<section class="w-break-6 bg-white p-8 rounded-md shadow-md my-4">
  
  <h2>{data.no_resi}</h2>
  
  <Dump {data} />
  
</section>
