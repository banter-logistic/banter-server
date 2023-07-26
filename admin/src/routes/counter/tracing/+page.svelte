
<script lang="ts">
    import { enhance } from "$app/forms";
  import type { ActionData } from "./$types"
  import { Form, Debug, Unwrap, Container } from "cp";

  let search: number
  export let form: ActionData
</script>

<div class="grid grid-cols-1 gap-4">
  <form class="join w-full" method="post" use:enhance>
    <input class="input input-bordered focus:outline-none input-lg join-item z-10 w-full" name="id" required
      type="number" placeholder="No Resi" bind:value={search}/>
    <button class="btn join-item btn-lg {search != null && "btn-primary"}">Cari</button>
  </form>
  
  <Form {form} let:form>
    <Unwrap result={form} let:data>
      {@const _ = console.log(data)}
      <Container>
        <div class="flex flex-col w-full lg:flex-row">
          
          <div class="flex-grow">
            <h1 class="font-bold text-2xl">Pengantaran Barang</h1>
            <ul class="steps steps-vertical">
              {#each data.tracings as tr}
              <li class="step step-primary">di {tr.tipe} oleh {tr.nama}</li>
              {/each}
              {#if data.last_tracing.tipe == 'sampai'}
              <li class="step step-primary text-primary-content font-bold">sudah sampai</li>
              {:else}
              <li class="step step-primary text-primary-content font-bold">di {data.last_tracing.tipe} oleh {data.last_tracing.nama}</li>
              {/if}
            </ul>
          </div> 
            
          <div class="divider lg:divider-horizontal"></div> 
          
          <div class="flex-grow">
            <h1 class="font-bold text-2xl mb-6">Detail Barang</h1>
            <Debug two_col={true} data={data.barang}/>
          </div>
            
        </div>
      </Container>
      
      
      <!-- <Container>
        <h1 class="font-bold text-2xl">Pengantaran Barang</h1>
        <ul class="steps steps-vertical">
          
          {#each data.tracings as tr}
          <li class="step step-primary">{tr.subjek} as {tr.tipe}</li>
          {/each}
          <li class="step step-primary text-primary-content font-bold">{data.last_tracing.subjek} as {data.last_tracing.tipe}</li>
          
        </ul>
      </Container>
      
      <Container>
        <h1 class="font-bold text-2xl mb-6">Detail Barang</h1>
        <Debug data={data.barang}/>
      </Container> -->
      
    </Unwrap>
  </Form>   
  
</div>
