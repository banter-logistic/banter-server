<script>
  import Productser from "./productser.svelte";
  import Valued from "./valued.svelte";

  let bgtrack = "../Banter-image/bghero1.jpg";
  let bgabout = "../Banter-image/kirim.jpg";
</script>

<body class=" w-full min-h-screen mt-5">
  <section class=" relative w-[85%] mx-auto h-[60vh] shrink-0">
    <img
      src={bgtrack}
      alt=""
      class="absolute w-full h-full object-cover z-[-10] rounded-2xl"
    />
    <div class="relative flex flex-col pt-20 px-20 w-[40rem]">
      <h1 class=" text-4xl font-bold text-[#F0F4F4]">
        <span class="text-[#14EBDE]"> Pelacakan </span> Pengiriman yang mudah dan
        akurat!
      </h1>
      <p class="text-xl text-[#F0F4F4] my-[1.13rem]">
        Pantau status pengiriman Anda secara real-time dengan BanterLogistics
        menggunakan kode pelacakan unik untuk setiap pengiriman.
      </p>
    </div>
    <div class="pt-10">
      <div
        class="flex flex-row justify-center items-center gap-[1rem] w-[18.60638rem] h-[3.5rem] bg-white/30 backdrop-blur-md shadow-md ml-[8.05rem] rounded-t-xl"
      >
        <button class="btn btn-info text-white/80">Tracking</button>
        <button class="btn btn-info text-white/80">Check Ongkir</button>
      </div>
      <div
        class="w-[80%] h-[8.375rem] mx-auto bg-white/30 backdrop-blur-md shadow-md items-center px-28 rounded-tl-[0rem] rounded-tr-[0.625rem] rounded-br-[0.625rem] rounded-bl-[0.625rem]"
      >
        <label class="label pt-5">
          <span> Tracking</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered input-info w-full max-w-xs"
        />
        <button class="btn btn-info ml-5 text-white/80"> tracking </button>
      </div>
    </div>
  </section>

  <!-- section about us  -->
  <section class="flex flex-shrink-0 mt-[10%] w-[85%] gap-[3rem] mx-auto">
    <div>
      <div
        class="relative w-[32rem] h-[24rem] justify-center flex items-center mx-auto"
      >
        <!-- svelte-ignore a11y-img-redundant-alt -->

        <div
          class="absolute inset-0 bg-[#94FBF5] rotate-12 blur-[50px] object-cover -z-10"
        />
        <img src={bgabout} alt="" class=" w-[28rem] rounded-3xl" />
      </div>
    </div>

    <div class=" relative flex flex-col items-start gap-[1rem]">
      <p class="text-[#14EBDE] text-2xl">About Us</p>
      <h1 class="text-4xl font-bold text-[#2C3E50] mr-16">
        Pengiriman Lebih Lancar, Lebih Aman, dan Lebih Cepat Bersama BANTER !
      </h1>
      <div
        class="w-[19rem] h-[15rem] right-0 absolute bg-[#8CCCFE] rotate-12 blur-[37px] object-cover -z-10"
      />
      <p class="text-xl text-[#79797C]">
        Kami adalah BANTER penyedia layanan logistik yang berdedikasi untuk
        menghadirkan solusi logistics yang aman dan cepat.
      </p>
      <button class="btn btn-info">More Info </button>
    </div>
  </section>

  <section class="w-[85%] mx-auto mt-[10%] flex flex-col gap-[4rem]">
    <div class="flex flex-col gap-[1rem]">
      <div
        class="w-[11rem] h-[9rem] -left-10 absolute bg-[#F7EB83] blur-[40px] object-cover -z-10"
      />
      <p class="text-[#14EBDE] text-xl">Our Service</p>
      <h1 class="text-[#2C3E50] text-4xl font-bold">Product Service</h1>
    </div>
    <div class="grid grid-cols-4">
      <Productser />
      <div
        class="w-[11rem] h-[9rem] right-0 mt-[17rem] absolute bg-[#94FBF5] blur-[37px] object-cover -z-10"
    />
    </div>
  </section>

  <!-- valued Service  -->
  <section class="mt-[10%] flex ">
    <img src="../Banter-image/bgval.png" alt="valuedService" class=" absolute object-cover w-full blur-[21px] -z-10">
    <div>
      <p>Valued Service </p>
      <h1>Why Choose Us </h1>
      <p>Bergabunglah dengan BANTER sekarang untuk mendapatkan manfaat dari fitur-fitur unggulan kami .</p>
    </div>
    <div>
      <Valued/>
    </div>

  </section>
</body>
