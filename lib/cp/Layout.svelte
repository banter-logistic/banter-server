<script lang=ts>
  import { page } from "$app/stores";
  import Sidebar from "lib/cp/Sidebar.svelte";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  
  export let routes: (string | string[][])[][]
  
  // $: selected = $page.url.pathname
  
  export let username = 'Aria Putra Andika'
  const title = writable('Title')
  setContext('title',title)
</script>

<section class="h-screen relative grid [grid-template-columns:240px_1fr]">
  
  <!-- SIDEBAR -->
  <Sidebar sideContent={routes} {username} />
  
  <!-- CONTENT -->
  <div class="sike overflow-auto max-h-screen">
      
    <h1 class="ml-3 p-4 text-6xl text-primary-10-10">{$title}</h1>
    
    <div class="ml-4 p-4">
      <slot/>
    </div>
    <div class="block my-[30rem]">&ThickSpace;</div>
      
  </div>
  
</section>

