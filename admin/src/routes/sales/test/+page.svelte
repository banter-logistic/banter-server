<script lang=ts>
  
  export let data
  
  import { Manifest } from "cp/share";
  import { Unwrap } from "cp";
  
</script>

<Unwrap result={data} let:data={manifest}>
  <Manifest {manifest} />
</Unwrap>