<script>
  import {blog as data } from "$lib/data/dataBlog.js"
// export let data
</script>

{#each data  as d }
  


<div class="">
      <div class="">
        <div class="">
          <h1 class="">{d.title}</h1>
          <p class="">
            {d.desc}
            
          </p>
          <div class="">
            <img
              src={d.img}
              alt=""

              class=""
            />
            <span class="">{d.user}</span>
          </div>
        </div>
        <div class="">
          <img
            src={d.img}
            alt=""
            class=""
          />
        </div>
      </div>
      <div class="">
        <p class="">
          {d.content}
           
        </p>
      </div>
    </div>

    {/each}