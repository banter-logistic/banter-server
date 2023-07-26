<script lang=ts>
  import { Container } from "cp";
  export let data
</script>

<Container>
  {JSON.stringify(data)}
  <form action="/auth?/logout">
    <button class="btn btn-danger">Logout</button>
  </form>
</Container>