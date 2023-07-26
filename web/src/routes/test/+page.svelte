
<script>
  import { enhance } from '$app/forms';

  
  /** @type {import('./$types').ActionData} */
  export let form
</script>

<div class="bg-stone-200 min-h-screen grid justify-center pt-32" data-theme="light">
  <div>
    <form class="bg-white text-stone-600 grid grid-cols-1 rounded-md min-w-[24rem] shadow-lg p-4 gap-2" action="" method="post" use:enhance>
      <h1 class="text-4xl font-bold">Login</h1>
      
      <label class="text-lg font-bold" for="">username</label>
      <input type="text" class="input input-primary" required name="username">
      
      <label class="text-lg font-bold" for="">password</label>
      <input type="password" class="input input-primary" required name="password">
      
      {#if form}
        {#if form.success == true}
        
          {form.data}
          
        {:else if form.success == false}
        
          {form.pesan}
        
        {/if}
      {/if}
      
      <button class="btn btn-primary py-3">login</button>
      
    </form>
  </div>
  
</div>