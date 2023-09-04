<script lang=ts>
  
  import { Text, Number, Select } from "lib/cp/static";
  import Product from "lib/cp/static/Div.svelte";
  import Price from "lib/cp/static/Div.svelte";
  import Address from "lib/cp/static/Div.svelte";
  import Shipping from "lib/cp/static/Div.svelte";
  import { getContext } from "svelte";
  
  
  const metodePembayaran = [
    'Cash', 'Kredit', 'Debit'
  ]
  
  const metodePengiriman = [
    'Standar', 'Express',
  ]
  
  getContext<any>('title').set('Tambah Barang')
  
</script>



<form class="w-break-4">
  
  <Product class="my-8 stack-1-2">
    
    <h2>Produk</h2>
    <Number label="Total Koli" postfix="kg" />
    <Number label="Berat" postfix="kg" />
    <Number label="Panjang" postfix="kg" />
    <Number label="Lebar" postfix="kg" />
    <Number label="Tinggi" postfix="kg" />
    
  </Product>
  
  
  <Address class="my-8 stack-1-2">
    
    <h2>Pengirim</h2>
    <Number label="Nomor HP Pengirim" />
    
  </Address>
  
  
  <Address class="my-8 stack-1-2">
    
    <h2>Penerima</h2>
    <Number label="Nomor HP Penerima" />
    
  </Address>
  
  
  <Shipping class="my-8 stack-1-2">
    
    <h2>Pengiriman</h2>
    <Select class="input bg-white cursor-pointer" values={metodePengiriman} label="Metode Pengiriman" />
    <Text label="Catatan" />
    
  </Shipping>
  
  
  <Price class="my-8 stack-1-2">
    
    <h2>Pembayaran</h2>
    <Select class="input bg-white cursor-pointer" values={metodePembayaran} label="Metode Pembayaran" />
    <Number label="Dibayar" prefix="Rp." />
    <Number label="Diskon" postfix="%" />
    
    <h3>Total: Rp. 40000</h3>
    
  </Price>
  
  <div class="flex justify-end">
    <button class="btn primary">Submit</button>
  </div>
  
</form>