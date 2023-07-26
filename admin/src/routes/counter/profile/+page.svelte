<script lang=ts>
  import { Container } from "cp";
  export let data
  
</script>

<Container>
  <h1 class="text-2xl">{data.auth.username}</h1>
  <div>{data.auth.type}</div>
</Container>