<script>
  import { fly } from "svelte/transition";
    import "../app.css"
  import Hambuger from "./hambuger.svelte";
  export let open = false
  export let onClick = () => {
    open =!open
  }
 
  

    
</script>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,200&display=swap" rel="stylesheet">
<header class=" sticky top-0 bg-white font-[Poppins] z-10">
<nav class="flex justify-between items-center w-[85%] mx-auto py-3 ">
    <div>
        logo 
    </div>

    <div class=" static  bg-white min-h-fit left-0  w-auto  md:flex hidden items-center px-5  ">
        <ul class="flex flex-row  items-center gap-[3.5vw]   ">
            <li>
                <a class="hover:text-blue-300" href="/">Home</a>
            </li>
   
            <li >
                <a class="hover:text-blue-300" href="/tracking">Tracking</a>
            </li>

            <li>
                <a class="hover:text-blue-300" href="/tracking">Check Ongkir</a>
            </li>

            <li>
                <a class="hover:text-blue-300" href="/layanan"> Layanan </a>
            </li>

            <li>
                <a class="hover:text-blue-300" href="/about">Tentang Kami</a>
            </li>
        
        </ul>
    </div>
    <div>
        <button class="bg-[#a6c1ee] rounded-full text-white px-5 py-2 hover:bg-[#87acec]"> Sign in </button>
        
    </div >
    <div class="md:hidden sticky ">
        <Hambuger {open} {onClick} >
        </Hambuger>
    </div>
         {#if open}
        <div transition:fly={{ y: -200, duration: 400 }} class=" absolute  bg-red-500  min-h-[50vh] left-0 top-[100%]  w-full flex items-center px-5   uppercase ">
           <ul class="flex  flex-col  gap-10 text-center mx-auto">
            <li>
                <a class="hover:text-blue-300 " href="/">Home</a>
            </li>
   
            <li >
                <a class="hover:text-blue-300" href="/tracking">Tracking</a>
            </li>

            <li>
                <a class="hover:text-blue-300" href="/tracking">Check Ongkir</a>
            </li>

            <li>
                <a class="hover:text-blue-300" href="/layanan">Layanan  </a>
            </li>

            <li>
                <a class="hover:text-blue-300" href="/about">Tentang Kami</a>
            </li>
        
        </ul>
    </div>
           
        {/if}
</nav>
</header>
<slot/>