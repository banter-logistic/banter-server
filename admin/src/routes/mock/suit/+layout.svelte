<script lang=ts>
  import Layout from "lib/cp/Layout.svelte";
  
  const route = (routes: string[]) => routes.map((e,i)=>[e,i==0?'/mock/suit':`/mock/suit/${e.toLowerCase().replaceAll(' ','-')}`])
  
  
  const routes = [
    [
      "Data",route([
        "Airline",
        "Airline Schedule",
        "Chart Of Account",
        "Container",
        "Currency",
        "Invoice",
        "KPBC",
        "PIB PEB",
        "Port",
        // "Response",
        // "Service",
        // "Service Sort",
        // "Service Mapping",
        // "Service Contract",
        // "Term Condition",
        // "Third Party"
      ])
    ],
    [
      "Utility", route([
        "News", "Reminder"
      ])
    ],
  ]
  
</script>

<Layout {routes}>
  <slot/>
</Layout>