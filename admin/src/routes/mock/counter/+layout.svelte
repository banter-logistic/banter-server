<script lang=ts>
  import { page } from "$app/stores";
  import Navbar from "lib/cp/Navbar.svelte";
  import Sidebar from "lib/cp/Sidebar.svelte";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  const routes = [
    ["Home", "/mock/counter"],
    ["Insert", "/mock/counter/insert"],
    ["Trace", "/mock/counter/trace"],
    ["Gate out", "/mock/counter/gateout"],
    ["Gate in", "/mock/counter/gatein"],
  ]
  
  $: selected = $page.url.pathname
  
  const username = '"username"'
  const title = writable('Title')
  setContext('title',title)
</script>

<section class="h-screen relative grid [grid-template-columns:240px_1fr]">
  
  <!-- SIDEBAR -->
  <Sidebar  />
  
  <!-- CONTENT -->
  <div class="overflow-auto max-h-screen">
      
      <h1 class="ml-3 p-4 text-6xl">{$title}</h1>
      
      <div class="ml-4 p-4">
        <slot/>
      </div>
      <div class="block my-96">&ThickSpace;</div>
      
      
  </div>
  
</section>

