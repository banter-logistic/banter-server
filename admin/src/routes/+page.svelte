

<script lang=ts>
  export let data
</script>

<section class="min-h-screen bg-base grid place-items-center text-slate-700">
  
  <div class="bg-white rounded-3xl p-8 max-w-[96vw] w-96 shadow-md grid grid-cols-1 gap-4">
    <h1 class="font-bold text-4xl my-6 text-slate-900">BANTER</h1>
    
    <label class="grid grid-cols-1">
      username
      <input type="text" class="input">
    </label>
    
    <label class="grid grid-cols-1">
      password
      <input type="password" class="input">
    </label>
    <button class="btn primary rounded-lg">Login</button>
    {#if data.msg}
      <span>{data.msg}</span>
    {/if}
  </div>
  
</section>
