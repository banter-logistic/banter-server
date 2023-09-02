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
        <form action="" class="flex px-20 gap-1">
          <label for="tracking" class="block">
            <span
              class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 pb-1"
              >No Resi
            </span>
            <input
              type="text"
              id="tracking"
              placeholder="Masukkan 13 Digit "
              class="input input-info w-[20rem]"
            />
            <button class="btn btn-info ml-8 text-white/80"> Track </button>
          </label>
        </form>
      </div>
    </div>
  {/if}

  {#if aktif === "checkOngkir"}
    <div class=" relative flex justify-center">
      <div
        class="bg-[#F0F4F4] w-[64rem] h-[18rem] items-center flex justify-center gap-4 rounded-2xl drop-shadow-md"
      >
        <form action="" class="flex flex-wrap px-20 gap-8">
          <label for="asal" class="block">
            <span class=" block text-sm font-medium text-slate-700 pb-1">
              Asal
            </span>
            <input
              type="text"
              id="asal"
              placeholder="Masukkan Asal Pengiriman"
              class="input input-info w-[20rem]"
            />
          </label>
          <label for="tujuan" class="block">
            <span class="block text-sm font-medium text-slate-700 pb-1"
              >Tujuan
            </span>
            <input
              type="text"
              id="tujuan"
              placeholder="Masukkan Tujuan Pengiriman "
              class="input input-info w-[20rem]"
            />
          </label>
          <label for="berat" class="block">
            <span class="block text-sm font-medium text-slate-700 pb-1"
              >Berat
            </span>
            <input
              type="number"
              id="berat"
              placeholder="Masukkan Berat barang "
              class="input input-info w-[8rem]"
            />
          </label>
          <label for="berat" class="block">
            <span
              class=" after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 pb-1"
            >
              Panjang
            </span>
            <input
              type="number"
              id="berat"
              placeholder="Masukkan Berat barang "
              class="input input-info w-[8rem]"
            />
          </label>

          <label for="lebar" class="block">
            <span
              class=" after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 pb-1"
            >
              lebar
            </span>
            <input
              type="number"
              id="lebar"
              placeholder="Masukkan Berat barang "
              class="input input-info w-[8rem]"
            />
          </label>
          <label for="tinggi" class="block">
            <span
              class=" after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 pb-1"
            >
              tinggi
            </span>
            <input
              type="number"
              id="tinggi"
              placeholder="Masukkan Berat barang "
              class="input input-info w-[8rem]"
            />
            <button class="btn btn-info ml-8 text-white/80"> Search </button>
          </label>
        </form>

        <div />
      </div>
    </div>
  {/if}
  <div class=" relative flex justify-center mt-16">
    <div
      class="bg-[#F0F4F4] w-[64rem] h-full pl-20 py-4 flex gap-4 rounded-2xl drop-shadow-md"
    >
      {#if aktif === "tracking"}
        <div>
          <h1 class="font-bold text-2xl">Hasil Pencarian :</h1>
          <div class="flex flex-col justify-start items-start" />
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
