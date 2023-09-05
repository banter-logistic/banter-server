<script lang=ts>
  import Layout from "lib/cp/Layout.svelte";
  
  const routes = [
    [
      "Counter",[
        ["Home", "/mock/counter"],
        ["Insert", "/mock/counter/insert"],
        ["Trace", "/mock/counter/trace"],
        ["Gate out", "/mock/counter/gateout"],
        ["Gate in", "/mock/counter/gatein"],
      ]
    ],
    [
      "Accountan",[
        ["Discount", "/mock/counter"],
        ["Currency", "/mock/counter/insert"],
        ["Method", "/mock/counter/trace"],
      ]
    ],
  ]
  
</script>

<Layout {routes}>
  <slot/>
</Layout>