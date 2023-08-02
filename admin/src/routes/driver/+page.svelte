<script lang=ts>
  import { date_compact } from "$lib";
  import { Container, Unwrap } from "cp";
    import { writable } from "svelte/store";
  
  async function get(id: number): Promise<Result<api.Manifest.GetManifest.Output>> {
    if ($manifests[''+id].data === false) {
      return fetch('?q=' + id).then( e => e.json() ).then( e => $manifests[''+id].data = e)
    }
    return $manifests[''+id].data as any
  }
  
  export let data
  
  const manifests = writable(
    Object.fromEntries( data.manifest.map( e => [e.manifest_id, { data: false, show: false}] ) )
  )

  const now = date_compact()
</script>

<section class="grid md:grid-cols-1 lg:grid-cols-2 gap-4 max-w-[90vw] m-auto">
  <Container>
    <div class="text-2xl font-bold">{data.auth.tipe} {data.driver.nama}</div>
    <div>id: {data.auth.user_id}</div>
    <form method="post" action="?/logout">
      <button class="btn btn-primary mt-4">Logout</button>
    </form>
  </Container>
  <Container>
    <div class="mb-3 text-right font-bold">{now.display}</div>
    <div class="grid gap-4">
      {#each data.manifest as manf}
        {@const d = date_compact(manf.dibuat)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="border border-primary p-4 rounded-md grid gap-2" on:click={()=>$manifests[''+manf.manifest_id].show = !$manifests[''+manf.manifest_id].show}>
          <div class="flex justify-between">
            <div>Manifest: {manf.manifest_id}</div>
            <div>{d.display}</div>
          </div>
          
          {#if $manifests[''+manf.manifest_id].show}
            {@const a = get(manf.manifest_id)}
            <div>
            {#await a}
              loading...
            {:then result}
              <Unwrap {result} let:data>
                KOTA {data.barang[0].kota}
              </Unwrap>
            {:catch er}
              {er}
            {/await}
            </div>
          {/if}
          
        </div>
      {:else}
      <div class="font-bold text-xl">Manifest Kosong</div>
      {/each}
    </div>
  </Container>
</section>
