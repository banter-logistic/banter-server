<script lang=ts>
  import { page } from "$app/stores";
  
</script>

<section class="grid place-items-center text-4xl min-h-screen">
  <div class="md:flex gap-3 grid grid-cols-1 text-center p-3">
    <div>{$page.error?.message}</div>
    <div class="border"></div>
    <div>{$page.error?.code}</div>
  </div>
</section>
