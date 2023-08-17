<script>
  import { cross } from "$lib/form";
</script>


<div class="grid grid-cols-1 w-[1024px]">
  
  <div>
    
    <div class="grid grid-cols-1 gap-4">
      
      <div class="card">
        <h2 class="pl-2">List Barang</h2>
        <div class="my-6"></div>
        <table class="w-full">
          <thead class="border-b-2">
            <tr>
              <th>No Resi</th>
              <th>Nama Barang</th>
              <th>Kota</th>
            </tr>
          </thead>
          <tbody>
            {#each {length: 5} as _}
            <tr class="text-center border-t border-slate-100 h-10">
              <td>123131</td>
              <td>Kursi</td>
              <td>Jakarta</td>
            </tr>
            {/each}
            
          </tbody>
        </table>
        
        <form class="flex justify-end mt-4" action="/api?/logout" method="post" use:cross>
          <button class="btn primary transition">Logout</button>
        </form>
        
      </div>
      
    </div>
    
  </div>
  
</div>
  

