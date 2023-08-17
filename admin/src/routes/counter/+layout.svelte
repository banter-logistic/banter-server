

<script lang=ts>
  import { page } from "$app/stores";
  const routes = {
    "Home": "/counter",
    "Insert": "/counter/insert",
    "Gate out": "/counter/gateout",
    "Gate in": "/counter/gatein"
  }
  
  $: selected = $page.url.pathname
  
  import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
</script>

<section class="min-h-screen bg-base" id="counter-base-layout">
  <nav class="grid grid-cols-3 p-4 w-full sticky
              bg-white shadow-md">
    <div class="font-bold text-2xl">BANTER</div>
    <div></div>
    <div class="text-right mr-4">Mason Ct.</div>
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
    
    
    
    
    <slot/>
    
  </section>
  
  <!-- <section class="flex justify-center my-8 transition" id="navigator">
    
    {#each Object.entries(routes) as [name,r]}
    <a class="border-b-2 border-blue-500 px-10 py-3 hover:bg-blue-100 hover:bg-opacity-75 font-bold {r == selected ? 'bg-opacity-30 bg-blue-300' : ''}"
      href="{r}" title="{selected} : {r}"
    >{name}</a>
    
    {/each}
    
  </section>
  
  
  <section class="grid justify-center">
    <slot/>
  </section> -->
  
</section>


