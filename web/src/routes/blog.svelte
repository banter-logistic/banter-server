<script>
  import { onMount } from "svelte";
  import { blog } from "$lib/data/dataBlog";
    
    let colom = 3 
    let index = 0 ;


    function nextImg(){
        if(index < blog.length-1 ){
            index+=1
        }
         console.log(index)
    }
    function prevImg(){
        if(index > 0){
            index-=1
        }
         console.log(index)
    }

    /**
   * @param {number} idx
   */
    function manualSlide(idx){
        index=idx
        
    }

    function updateColom(){
        if(window.innerWidth < 768 ){
            colom = 1 
        } else if (window.innerWidth >= 756 && window.innerWidth <= 1024){
            colom = 2 
        } else {
            colom = 3 
        }
    }
    

    onMount(()=> {
      updateColom()
      window.addEventListener( "resize" , updateColom)
    });
    
    
 
</script>

<ul class=" flex  justify-center items-center gap-8 mt-16 snap-x snap-mandatory before:shrink-0 before:w-4 md:before:w-36  after:shrink-0 after:w-4">
    <button class=" {index <= 0  ? 'hidden' :'' } absolute z-10 lg:left-24 left-0  p-4 text-white bg-blue-500 text-2xl  rounded-full " on:click={prevImg}>
    &#8592;
  </button>
{#each blog.slice(index,index + colom )  as bg (bg.id) }
    <li>
    <a href="/" class=" {bg.id === blog[index].id ? ' blog-item text-white transition ease-in-out  -translate-y-1 scale-110 bg-[#148CEB] duration-300' : 'blog-item'}  md:w-[19rem] w-[17rem]  p-4 hover:text-white shadow-2xl rounded-2xl flex flex-col gap-4 justify-center items-center transition ease-in-out   hover:-translate-y-1 hover:scale-110 hover:bg-[#148CEB] duration-300  
    " >
        <img src={bg.img} alt="" class="w-[17rem] h-[10rem]  rounded-xl shadow-xl ">
        <div class="flex gap-4">
        <img src="../Banter-image/profile-user.png" alt="" class="w-[1.5rem] h-[1.5rem]">
        <p>{bg.user}</p>
        <img src="../Banter-image/calendar.png" alt="" class="w-[1.5rem] h-[1.5rem]">
        <p>{bg.date}</p>
        </div>
        <h1 class="font-semibold sm:text-lg  text-md ">{bg.title} {bg.id}</h1>
        <p class="text-justify sm:text-md text-sm px-4 ">{bg.desc}</p>
    </a>
    </li>
{/each}

<!-- Tombol manual -->
  
  <button class=" {index >= blog.length-1 ? 'hidden' : ''} absolute lg:right-24 right-0 z-10 p-4 text-white bg-blue-500 text-2xl  rounded-full  " on:click={nextImg}>
    &#8594;
  </button>

  </ul>
<div class="flex gap-4 items-center justify-center pt-16 ">
    {#each Array.from({ length: Math.ceil(blog.length / colom) }, (_, i) => i) as idx}
      <button
        class="{idx === index   ? 'bg-blue-500' : 'bg-gray-500/40'} rounded-full w-4 h-4  "
        on:click={() => manualSlide(idx * colom)}
      ></button>
    {/each}
  </div>
  
  <style>
  /* CSS untuk transisi */
  .blog-item {
    transition: background-color 0.3s ease; /* Waktu dan jenis transisi yang Anda inginkan */
  }
</style>