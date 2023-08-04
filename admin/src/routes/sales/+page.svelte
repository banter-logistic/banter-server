

<script lang=ts>
  import { Unwrap, Container } from "cp";
  import type { LayoutData } from "./$types";
  import { BarangList } from "cp/share";
  export let data: LayoutData
</script>

<section class="grid grid-cols-1 gap-4 max-w-[1024px] px-4">
  
  <Container classes='max-w-screen'>
    <h1 class="text-2xl font-bold">Sales {data.session.nama}</h1>

    <Unwrap result={data.queries} let:data>
      <div class="overflow-x-auto my-4">
        <BarangList {data}/>
      </div>
    </Unwrap>

    <form action="?/logout" method="post">
      <button class="btn btn-primary" name="logout">Logout</button>
    </form>
    
  </Container>
  
</section>
