<script lang=ts>
  import { Footer } from "cp";
  import { navMenu, p } from "./navbar";
  import { page } from "$app/stores";
  
  const Menu = Object.entries(navMenu)
  const path = $page.url.pathname.split('/')[2]
  let select = path ? "/" + path : '/'
  
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
    <div class="dropdown dropdown-end">
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label tabindex="0" class="btn btn-ghost rounded-btn">
        <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512">
          <style>svg{fill:#a6adba}</style>
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
        </svg>
      </label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <div tabindex="0" class="dropdown-content z-[1] card w-64 shadow bg-base-100 text-primary-content">
        
          <ul class="menu menu-vertical">
            
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