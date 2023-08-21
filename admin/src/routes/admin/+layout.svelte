

<script lang=ts>
  import { page } from "$app/stores";
  
  const routes = {
    "Admin": "/admin",
    "Sales": "/admin/sales",
    "Driver": "/admin/driver",
    "Kurir": "/admin/kurir",
    "Operator": "/admin/operator"
  }
  
  $: selected = $page.url.pathname
  
  
</script>

<section class="min-h-screen bg-base" id="counter-base-layout">
  <nav class="grid grid-cols-3 p-4 w-full sticky
              bg-white shadow-md">
    <div class="font-bold text-2xl">BANTER</div>
    <div></div>
    <div class="text-right mr-4">Admin Username</div>
  </nav>
  
  <div class="my-6"></div>
  
  <section class="px-6 grid gap-6" style="grid-template-columns: 1fr 1024px 1fr;">
    
    <div class="flex justify-end">
      <div>
        <aside class="p-4 w-60 rounded-xl bg-white shadow-md flex flex-col">
          {#each Object.entries(routes) as [name,r]}
            <a class="p-input {r == selected ? 'btn primary' : ''}"
              href="{r}" title="{selected} : {r}"
            >{name}</a>
          {/each}
          
        </aside>
      </div>
    </div>
    
    <div>
      <slot/>
      <div class="block my-96">&ThickSpace;</div>
    </div>
    
  </section>
  
</section>


