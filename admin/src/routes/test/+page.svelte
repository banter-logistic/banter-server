<script>
  import { Form } from "cp";
  import { enhance } from "$app/forms";

  export let form
</script>

<div class="min-h-screen">
  
  <form action="" method="post" use:enhance class="h-full grid place-items-center gap-4">
    <input type="text" name="username" class="input input-primary">
    <input type="password" name="password" class="input input-primary">
    <button>Go</button>
  </form>
  
  <Form {form} let:form>
    {JSON.stringify(form)}
  </Form>
  
</div>

