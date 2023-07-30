<script>

    import { invalidateAll } from "$app/navigation";

</script>
<div class="grid place-items-center">
  <div class="container">
    div
  </div>
  <button on:click={()=>fetch('/admin').then(e=>invalidateAll())}>Logout</button>
</div>