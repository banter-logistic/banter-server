<script lang=ts>
  import { page } from "$app/stores";
  
</script>

<section class="grid place-items-center text-4xl min-h-screen">
  <div class="flex gap-3">
    <div>{$page.error?.message}</div>
    <div class="border"></div>
    <div>{$page.error?.code}</div>
  </div>
</section>
