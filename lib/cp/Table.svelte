

<script lang=ts>
  
  export let data: Record<string,any>[]
  
  const heads = Object.keys(data[0])
  
</script>

<section class="w-full sike overflow-auto">
  
  
  <table class="w-full">
    
    <thead>
      <tr>
        {#each heads as head}
          <th class="p-2 border-b border-black text-left">{head}</th>
        {/each}
        
        <th class="p-2 border-b border-black text-left"><slot name="th"/></th>
        
      </tr>
    </thead>
    
    
    <tbody>
      
      {#each data as row}
      
      <tr class="hover:bg-black/[.03]">
        
        {#each Object.values(row) as value}
          <td class="border-t border-t-neutral-300 py-2 whitespace-nowrap">{value}</td>
        {/each}
        
        <td class="border-t border-t-neutral-300 py-2 whitespace-nowrap">
          <slot name="td" {row}/>
        </td>
        
      </tr>
      {/each}
    </tbody>
    
  </table>
  
  
</section>

