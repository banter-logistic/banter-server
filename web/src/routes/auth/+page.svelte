


<script lang=ts>
    import { enhance } from '$app/forms';

  export let data
</script>


{#if data.auth.isLoggedin}
  
User telah login dengan email: {data.auth.email}

<!-- Untuk Logout -->
<form action="/auth?/logout" method="post" use:enhance data-sveltekit-preload-data="off">
  <button class="btn btn-primary">Logout</button>
</form>

{:else}

User Tidak Login

{/if}