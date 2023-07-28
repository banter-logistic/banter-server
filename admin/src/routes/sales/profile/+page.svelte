<script lang=ts>
  import { Container } from "cp";
  export let data
  
</script>

<Container>
  <h1 class="text-2xl">{data.session.nama}</h1>
  <div>{data.session.nama_pos}</div>
  <div>{data.session.alamat}</div>
</Container>