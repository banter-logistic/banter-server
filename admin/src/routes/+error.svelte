
<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.error?.code ?? "Internal Error"}</title>
</svelte:head>

<div class="min-h-screen grid place-items-center bg-neutral-800 overflow-hidden">
  <div class="text-white grid place-items-center grid-cols-1">
    <div class="md:text-7xl text-4xl">
      <span class="font-bold">{$page.status}</span>
      <span class="">|</span>
      <span>{$page.error?.code ?? "UNKNOWN_ERROR"}</span>
    </div>
    <div class="py-4 sm:px-0 px-4 h-8 md:max-w-lg max-w-screen-sm text-lg">
      {$page.error?.message}
    </div>
  </div>
</div>
