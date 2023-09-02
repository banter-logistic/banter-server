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
    <div class="grid grid-cols-4">
      <Productser/>
      <div
        class="w-[11rem] h-[9rem] right-0 mt-[17rem] absolute bg-[#94FBF5] blur-[37px] object-cover -z-10"
      />
    </div>
  </section>

   <section class="mt-[10%] -mb-12">
    <img
      src="../Banter-image/bgval.png"
      alt="valuedService"
      class=" absolute object-cover w-full h-[35rem] blur-[21px] -z-10"
    />
    <div class="flex gap-[2rem] justify-center pt-[8%]">
      <div class="w-[23rem] flex flex-col gap-4">
        <p class="text-[#14EBDE] text-2xl">Valued Service</p>
        <h1 class="text-[#F0F4F4] text-4xl font-bold">Why Choose Us</h1>
        <p class="text-xl text-[#F0F4F4]">
          Bergabunglah dengan BANTER sekarang untuk mendapatkan manfaat dari
          fitur-fitur unggulan kami .
        </p>
      </div>
      <div class="grid grid-cols-2 gap-5">
        <Valued />
      </div>
    </div>
  </section>