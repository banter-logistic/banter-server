<script>
  let value = [
    {
      id: 1,
      title: "Pengiriman Tepat Waktu ",
      img: "/1.svg",
      desc: "komitmen kami adalah pengiriman  tepat Waktu ",
    },
    {
      id: 2,
      title: "Pantauan Real-time ",
      img: "/2.svg",
      desc: "Mengawasi Langsung Perjalanan Barang Anda dengan Akurat dan Tepat. ",
    },
    {
      id: 3,
      title: "Pengemasan dan Labeling",
      img: "/3.svg",
      desc: " Menjamin Keamanan dan Keteraturan Pengiriman. ",
    },
    {
      id: 4,
      title: "Layanan Pelanggan 24/7 ",
      img: "/3.svg",
      desc: " Kami Tersedia Setiap Saat untuk Menjawab Pertanyaan dan Menangani Kebutuhan Anda. ",
    },
  ];
</script>

{#each value as vl (vl.id)}
  <div class="flex gap-8  bg-white/30 shadow-md backdrop-blur-xl rounded-xl w-[23rem] h-[10rem] px-4">
    <div class="flex items-center justify-center  ">
      <img src={vl.img} alt="" class="w-[] h-[]" />
    </div>
    <div class="flex flex-col gap-4  justify-center ">
      <h1 class="text-[#2C3E50]  text-xl font-bold">{vl.title}</h1>
      <p class="text-md text-[#79797C]">{vl.desc}</p>
    </div>
  </div>
{/each}
