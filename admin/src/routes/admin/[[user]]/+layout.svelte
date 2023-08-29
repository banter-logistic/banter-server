<script lang=ts>
  import { page } from "$app/stores";
  import { Navbar } from "cp/common";
  import { capital } from "lib/util";
  
  const username = 'admin username'
  
  const routes = {
    "Admin": "/admin",
    "Sales": "/admin/sales",
    "Driver": "/admin/driver",
    "Kurir": "/admin/kurir",
    "Operator": "/admin/operator",
    "Pelanggan": "/admin/pelanggan",
    "Pos": "/admin/pos",
  }
  
  $: selected = $page.url.pathname
  $: title = capital(selected.replace(/(admin|\/)/g,'') || 'admin')
  
  $: isSelect = (r: string) => r == selected.replace('/create','') ? 'btn primary' : ''
  
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Navbar {username}/>

<section class="mt-12 px-6 stack-1-6 [grid-template-columns:240px_1fr]">
  
  <div>
    <aside class="card p-4 stack">
      {#each Object.entries(routes) as [name,r] (name)}
        <a class="p-input {isSelect(r)}" href="{r}" >{name}</a>
      {/each}
    </aside>
  </div>
  
  <div class="stack-1-4">
    <slot/>
    <div class="block my-96">&ThickSpace;</div>
  </div>
  
</section>
