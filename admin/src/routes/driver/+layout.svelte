
<script lang=ts>


  export let data

</script>

<nav class="relative navbar bg-base-100 z-10">
  <div class="navbar-start">
    <div class="btn btn-ghost text-xl">Banter</div>
  </div>
  
  <div class="hidden md:block navbar-center">
      BANTER
  </div>
  
  <div class="navbar-end">
    <div class="px-8 font-bold text-lg">
      {data.driver.nama}
    </div>
  </div>
</nav>

<div class="min-h-screen bg-base-300 md:pt-16 pt-6 pb-12">
  <div class="hidden absolute top-0 min-h-screen md:grid place-items-center min-w-full text-9xl text-base-100 select-none">
    BANTER
  </div>
  <div class="relative grid place-items-center grid-cols-1 z-10">
    <div class="w-full max-w-5xl">
      <slot/>
    </div>
  </div>
</div>

