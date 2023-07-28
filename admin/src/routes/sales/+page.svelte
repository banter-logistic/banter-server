

<script lang=ts>
  import { Unwrap, Container } from "cp";
  import type { LayoutData } from "./$types";
  
  export let data: LayoutData
</script>

<section class="grid md:grid-cols-1 lg:grid-cols-2 gap-4 max-w-[90vw] m-auto">
  <div>
    <Container>
      <h1 class="font-bold text-2xl">{data.session.nama_pos}</h1>
      <div>{data.session.alamat}</div>
    </Container>
  </div>
  
  <Container>  
    <h1 class="text-2xl font-bold">Sales {data.session.nama}</h1>

    <Unwrap result={data.queries} let:data>
      <div class="overflow-x-auto my-4">
        <table class="table table-md">
          <thead>
            <tr>
              <th>No Resi</th>
              <th>Kota</th>
              <th>Total Koli</th>
            </tr>
          </thead>
          <tbody>
            {#each data as d (d.no_resi)}
            <tr>
              <td>{d.no_resi}</td>
              <td>{d.kota}</td>
              <td>{d.total_koli}</td>
            </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </Unwrap>

    <form action="?/logout" method="post">
      <button class="btn btn-primary" name="logout">Logout</button>
    </form>
    
  </Container>
  
</section>
