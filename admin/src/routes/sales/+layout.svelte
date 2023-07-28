<script lang=ts>
  import { Footer } from "cp";
  import { navMenu, p } from "./navbar";
  import { page } from "$app/stores";
  
  const Menu = Object.entries(navMenu)
  const path = $page.url.pathname.split('/')[2]
  let select = path ? "/" + path : '/'
  export let data
</script>

<nav class="navbar bg-base-100">
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

<div class="min-h-screen bg-base-300 pt-16 pb-12">
  <div class="grid place-items-center grid-cols-1">
    <div class="w-full max-w-5xl">
      <slot/>
    </div>
  </div>
</div>

<Footer/>