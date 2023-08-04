<script lang=ts>
  import { enhance } from "$app/forms";
  import type { ActionData, PageServerData } from "./$types";
  import { Form, Unwrap } from "cp"

  export let form: ActionData
  export let data: PageServerData
</script>

<div class="min-h-screen grid place-items-center bg-base-300">
  <div class="card w-96 bg-base-100 max-w-[90vw] shadow-xl">
    
    <form method="post" class="card-body" action="?/login" use:enhance>
      <h2 class="card-title text-4xl mb-4">Banter</h2>
      <div class="form-control">
        <label for="username" class="label">
          <span class="label-text">Username</span>
        </label>
        <input class="input input-bordered placeholder:text-gray-600" type="text" placeholder="username" id="username" name=username value="{form?.username ?? ''}" required />
      </div>
      <div class="form-control">
        <label for="password" class="label">
          <span class="label-text">Password</span>
        </label>
        <input class="input input-bordered placeholder:text-gray-600" type="password" placeholder="password" id="password" name=passwd required />
      </div>
      
      <div class="card-actions my-4">
        <button class="btn btn-primary no-animation flex-grow">Login</button>
      </div>
      
      {#if data.session}
        <div>
          <span>terdapat sesi: {data.session?.username}, </span>
          <a class="link" href={data.session.target}>Masuk</a>
        </div>
      {:else if data.msg}
        <div>
          {data.msg}
        </div>
      {/if}
      <Form {form} let:form>
        <div class="font-bold px-4 pb-4">
          <Unwrap result={form.result} let:data>
            <slot name=none>
              <span>{JSON.stringify(data)}</span>
            </slot>
          </Unwrap>
        </div>
      </Form>
    </form>
    
  </div>
</div>