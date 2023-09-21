<script>

  import Productser from "../productser.svelte";
  import Valued from "../valued.svelte";

</script>


<section class="w-[85%] mx-auto mt-[10%] flex flex-col gap-[4rem]">
    <div class="flex flex-col gap-[1rem]">
      <div
        class="w-[11rem] h-[9rem] -left-10 absolute bg-[#F7EB83] blur-[40px] object-cover -z-10"
      />
      <p class="text-[#14EBDE] text-xl">Our Service</p>
      <h1 class="text-[#2C3E50] text-4xl font-bold" >Product Service</h1>
    </div>
    <div class="flex flex-wrap gap-8">
      <Productser/>
      <div
        class="w-[11rem] h-[9rem] right-0 mt-[17rem] absolute bg-[#94FBF5] blur-[37px] object-cover -z-10"
      />
    </div>
  </section>

   <!-- valued Service  -->
  <section class="mt-[10%] md:h-[42rem] h-[30rem]">
    <div class="h-full w-full bg-cover bg-left " style="background-image: url('../Banter-image/bg-valued.jpg');">
    <!-- <img
      src="../Banter-image/bg-valued.jpg"
      alt="valuedService"
      class=" absolute object-cover  w-full h-full -z-10"
    /> -->
     <div class=" flex  flex-col  gap-[4rem]  pt-[8%]">

      <div class=" w-[85%] mx-auto flex  flex-col gap-4  ">
        <p class="text-[#14EBDE] text-xl">Valued Service</p>
        <h1 class="text-[#F0F4F4] text-4xl font-bold">Why Choose Us</h1>
        <p class="text-lg text-[#F0F4F4]">
          Bergabunglah dengan BANTER sekarang untuk mendapatkan manfaat dari
          fitur-fitur unggulan kami .
        </p>
      </div>

      <div class=" ">
        
        <Valued/>
      </div>

    </div>
    
  </section>