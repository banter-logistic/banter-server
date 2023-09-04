
<script lang=ts>
  export let sideContent: (string | string[][])[][]
  import SideNav from "lib/cp/static/Div.svelte";
  import Title from "lib/cp/static/Frag.svelte";
  import Account from "lib/cp/static/Div.svelte";
  
  export let username = 'Joe Don'
  export let role = 'counter'
  
</script>



<!-- full height, tight to left -->

<aside class="p-4 grid max-h-screen w-break-2 sike  bg-[rgb(68_71_85)] text-state-80" style="grid-template-rows: 80px 1fr 60px;">
  
  <Title>
    <h1 class="">BANTER</h1>
  </Title>
  
  <SideNav class="overflow-auto  [scrollbar-width:none] mb-4">
    <div class="max-h-full">
      
      {#each sideContent as [group, subcontent]}
      
      <div class="my-4">
        
        <div class="stack">
          <a class="font-bold text-2xl" href={subcontent[0][1]}>{group}</a>
        </div>
        
        
        {#each subcontent as [sub,href]}
        
        <div class="stack my-1">
          <a class="cursor-pointer ml-3" {href}>{sub}</a>
        </div>
        
        {/each}
        
      </div>
        
      {/each}
      
      
    </div>
    
  </SideNav>
  
  
  <Account class="stack-2 relative [grid-template-columns:60px_1fr]">
    
    <img class="rounded-full" src="/avatar.png" alt="avatar">
    
    <div class="ml-2">
      <span class="font-bold whitespace-nowrap overflow-ellipsis">{username}</span>
      <span class="">{role}</span>
    </div>
    
  </Account>
  
  
</aside>