<script lang=ts>
  import { page } from "$app/stores";
  import Sidebar from "lib/cp/Sidebar.svelte";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  const routes = [
    [
      "Counter",[
        ["Home", "/mock/counter"],
        ["Insert", "/mock/counter/insert"],
        ["Trace", "/mock/counter/trace"],
        ["Gate out", "/mock/counter/gateout"],
        ["Gate in", "/mock/counter/gatein"],
      ]
    ],
    [
      "Accountan",[
        ["Discount", "/mock/counter"],
        ["Currency", "/mock/counter/insert"],
        ["Method", "/mock/counter/trace"],
      ]
    ],
  ]
  
  $: selected = $page.url.pathname
  
  const username = 'Aria Putra Andika'
  const title = writable('Title')
  setContext('title',title)
</script>

<section class="h-screen relative grid [grid-template-columns:240px_1fr]">
  
  <!-- SIDEBAR -->
  <Sidebar sideContent={routes} {username} />
  
  <!-- CONTENT -->
  <div class="overflow-auto max-h-screen">
      
      <h1 class="ml-3 p-4 text-6xl">{$title}</h1>
      
      <div class="ml-4 p-4">
        <slot/>
      </div>
      <div class="block my-96">&ThickSpace;</div>
      
      
  </div>
  
</section>

