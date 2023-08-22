<script lang=ts>
  import { page } from "$app/stores";
  
  const username = 'admin username'
  
  const routes = {
    "Admin": "/admin",
    "Sales": "/admin/sales",
    "Driver": "/admin/driver",
    "Kurir": "/admin/kurir",
    "Operator": "/admin/operator",
    "Pos": "/admin/pos",
  }
  
  $: selected = $page.url.pathname
  $: pageTitle = selected.replace(/(admin|\/)/g,'') || 'admin'
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<section class="min-h-screen bg-base" id="counter-base-layout">
  <nav class="grid grid-cols-3 p-4 w-full sticky
              bg-white shadow-md">
    <div class="font-bold text-2xl">BANTER</div>
    <div></div>
    <div class="text-right mr-4">{username}</div>
  </nav>
  
  <div class="my-6"></div>
  
  <section class="px-6 grid gap-6" style="grid-template-columns: 240px 1fr;">
    
    <div>
      <aside class="p-4 rounded-xl bg-white shadow-md flex flex-col">
        {#each Object.entries(routes) as [name,r]}
          <a class="p-input {r == selected ? 'btn primary' : ''}"
            href="{r}" title="{selected} : {r}"
          >{name}</a>
        {/each}
        
      </aside>
    </div>
    
    <div class="grid grid-cols-1 gap-4">
      <slot/>
      <div class="block my-96">&ThickSpace;</div>
    </div>
    
  </section>
  
</section>
