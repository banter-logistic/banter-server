<script lang="ts">
  let aktif: string = "tracking";

  function toogleform(formName: string): void {
    aktif = formName;
  }
</script>

<section class=" relative -mb-4 mt-12 flex flex-col">
  <div
    class="h-full object-cover absolute inset-0 -z-10 bg-gradient-to-r from-[#AAEEF4] from-10% via-[#DBF2DC] via-30% to-[#A2C7FA] to-90% ... blur-[100px]"
  />
  <div class="flex justify-center w-full">
    <div
      class="bg-[#F0F4F4] w-[20rem] h-20 items-center flex justify-center gap-4 rounded-t-2xl drop-shadow-md"
    >
      <button on:click={() => toogleform("tracking")} class="btn btn-info">
        Tracking
      </button>
      <button on:click={() => toogleform("checkOngkir")} class="btn btn-info">
        CheckOngkir
      </button>
    </div>
  </div>

  {#if aktif === "tracking"}
    <div class=" relative flex justify-center">
      <div
        class="bg-[#F0F4F4] w-[64rem] h-[10rem] items-center flex justify-start gap-4 rounded-2xl drop-shadow-md"
      >
        <form action="" class="flex flex-col px-20 gap-1">
          <label for="tracking" class="font-bold">No Resi : </label>
          <div class="flex gap-8">
            <input
              type="text"
              id="tracking"
              placeholder="Masukkan 13 Digit "
              class="input input-info w-[20rem]"
            />

            <button class="btn btn-info"> Search </button>
          </div>
        </form>

        <div />
      </div>
    </div>
  {/if}

  {#if aktif === "checkOngkir"}
    <div class=" relative flex justify-center">
      <div
        class="bg-[#F0F4F4] w-[64rem] h-[18rem] items-center flex justify-center gap-4 rounded-2xl drop-shadow-md"
      >
        <form action="" class="flex flex-wrap px-20 gap-8">
          <div class="flex flex-col">
            <label for="asal" class="font-bold">Asal : </label>
            <input
              type="text"
              id="asal"
              placeholder="Masukkan Asal Pengiriman"
              class="input input-info w-[20rem]"
            />
          </div>
          <div class="flex flex-col">
            <label for="tujuan" class="font-bold">Tujuan : </label>
            <input
              type="text"
              id="tujuan"
              placeholder="Masukkan Tujuan Pengiriman "
              class="input input-info w-[20rem]"
            />
          </div>
          <div class="flex flex-col">
            <label for="berat" class="font-bold">Berat : </label>
            <input
              type="number"
              id="berat"
              placeholder="Masukkan Berat barang "
              class="input input-info w-[8rem]"
            />
          </div>
          <div class="flex flex-col">
            <label for="panjang" class="font-bold"> Panjang :</label>

            <input
              type="number"
              id="berat"
              placeholder="Masukkan Berat barang "
              class="input input-info w-[8rem]"
            />
          </div>
          <div class="flex flex-col">
            <label for="lebar" class="font-bold"> lebar :</label>

            <input
              type="number"
              id="berat"
              placeholder="Masukkan Berat barang "
              class="input input-info w-[8rem]"
            />
          </div>
          <div class="flex flex-col">
            <label for="tinggi" class="font-bold">Tinggi :</label>

            <input
              type="number"
              id="berat"
              placeholder="Masukkan Berat barang "
              class="input input-info w-[8rem]"
            />
          </div>

          <button class="btn btn-info mt-6"> Search </button>
        </form>

        <div />
      </div>
    </div>
  {/if}
  <div class=" relative flex justify-center mt-16">
    <div class="bg-[#F0F4F4] w-[64rem] h-full pl-20 py-4 flex  gap-4 rounded-2xl drop-shadow-md">
      {#if aktif === "tracking"}
        <div>
          <h1 class="font-bold text-2xl">Hasil Pencarian :</h1>
          <div class="flex flex-col  justify-start items-start">
           

          </div>
        </div>
      {/if}
      {#if aktif === "checkOngkir"}
        <div>
          <h1 class="font-bold text-2xl">Hasil Perhitungan :</h1>
        </div>
      {/if}
      <div />
    </div>
  </div>
</section>
