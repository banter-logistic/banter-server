<script lang=ts>
  import { Footer } from "cp";
  import { navMenu, p } from "./navbar";
  import { page } from "$app/stores";
  
  const Menu = Object.entries(navMenu)
  const path = $page.url.pathname.split('/')[2]
  let select = path ? "/" + path : '/'
  export let data
</script>

<nav class="relative navbar bg-base-100 z-10">
  <div class="navbar-start">
    <div class="btn btn-ghost text-xl">Banter</div>
  </div>
  
  <div class="navbar-center">
    <ul class="hidden md:menu md:menu-horizontal">
      
      {#each Menu as [menu,link]}
      {@const path = p + link}
      <li>
        <a on:click={()=>select=link}
          class="{select == link && "text-primary"} font-bold" href={path}>
          {menu}
        </a>
      </li>
      {/each}
      
    </ul>
  </div>
  
  <div class="navbar-end">
    <div class="px-8 font-bold text-lg">
      {data.session.nama}
    </div>
  </div>
</nav>

<div class="min-h-screen bg-base-200 pt-16 pb-12">
  <div class="hidden absolute top-0 min-h-screen md:grid place-items-center min-w-full text-9xl text-base-100 select-none">
    BANTER
  </div>
  <div class="relative grid place-items-center grid-cols-1 z-10">
    <div class="w-full max-w-5xl">
      <slot/>
    </div>
  </div>
</div>

<Footer/>
