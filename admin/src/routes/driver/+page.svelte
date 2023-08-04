<script lang=ts>
  import { date_compact } from "$lib";
  import { Container, Unwrap } from "cp";
  import { Manifest } from "cp/share";
  import { writable } from "svelte/store";
  
  async function get(id: number): Promise<void> {
    if ($manifests[id].data === false) {
      selected = true
      fetch('?q=' + id).then( e => e.json() ).then( e => {
        $manifests[id].data = e
        selected = $manifests[id].data as any
      });
      return
    }
    selected = $manifests[id].data as any
  }
  
  export let data
  
  const manifests = writable( Object.fromEntries(
    data.manifest.map( e => [e.manifest_id, { data: false, show: false}] ) 
  ))
  
  let selected: Result<api.Manifest.GetManifest.Output> | true | false | null = null
  // $: console.log(selected)
  const now = date_compact()
</script>

<section class="grid grid-cols-1 gap-4 max-w-[90vw] m-auto">
  
  <!-- <Container>
    <div class="text-2xl font-bold">{data.auth.tipe} {data.driver.nama}</div>
    <div>id: {data.auth.user_id}</div>
    <form method="post" action="?/logout">
      <button class="btn btn-primary mt-4">Logout</button>
    </form>
  </Container> -->
  
  <Container>
    <div class="mb-3 text-right font-bold">{now.display}</div>
    <div class="grid gap-4">
      {#each data.manifest as manf}
        {@const d = date_compact(manf.dibuat)}
        
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <button class="border border-neutral-800 focus:border-primary p-4 rounded-md grid gap-2" on:click={()=>get(manf.manifest_id)}>
          <div class="flex justify-between">
            <div>Manifest: {manf.manifest_id}</div>
            <div>{d.display}</div>
          </div>          
        </button>
        
      {:else}
      <div class="font-bold text-xl">Manifest Kosong</div>
      {/each}
    </div>
    <form method="post" action="?/logout">
      <button class="btn btn-primary mt-4">Logout</button>
    </form>
  </Container>
  
  {#if selected == null}
  <div></div>
  {:else if selected == true}
    loading...
  {:else if selected == false}
  <div></div>
  {:else}
  <Unwrap result={selected} let:data={manifest}>
    <Manifest {manifest}/>
  </Unwrap>
  {/if}
  
</section>
