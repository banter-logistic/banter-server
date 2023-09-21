<script>
  import { onMount } from "svelte";

  let currentIndex = 0;
  let isAutoplay = true;
  /**
   * @type {number | undefined}
   */
  let autoplayInterval;
  /**
   * @type {number | undefined}
   */
  let manualSlideInterval;
  let manualSlideDelay = 0; // Interval 5 detik untuk gambar yang diklik

  const images = [
    "../Banter-image/bgnewhome.jpg",
    "../Banter-image/barang.jpg",
    "../Banter-image/bghero1.jpg",
  ];

  function toggleAutoplay() {
    isAutoplay = !isAutoplay;
    if (isAutoplay) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextImage, 5000); 
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    if (currentIndex === 0 && isAutoplay) {
      stopAutoplay();
      startAutoplay();
    }
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    if (currentIndex === images.length - 1 && isAutoplay) {
      stopAutoplay();
      startAutoplay();
    }
  }

  function resetSlider() {
    currentIndex = 0;
  }

  // Autoplay saat komponen dimuat
  onMount(() => {
    if (isAutoplay) {
      startAutoplay();
    }
  })

  /**
   * @param {number} index
   */
  function manualSlide(index) {
    clearInterval(autoplayInterval); // Menyela otomatis sementara
    currentIndex = index;
    manualSlideInterval = setInterval(() => {
      
      if (currentIndex === index) {
        clearInterval(manualSlideInterval); // Kembali ke otomatis setelah selesai
        startAutoplay(); // Mulai otomatis lagi
      }
    }, manualSlideDelay);
  }
</script>

<div class="relative">
  <!-- Tombol manual -->
  <!-- <button class="absolute inset-y-0 left-0 z-10 p-4 text-white bg-gray-800 bg-opacity-50" on:click={prevImage}>
    &#8592;
  </button>
  <button class="absolute inset-y-0 right-0 z-10 p-4 text-white bg-gray-800 bg-opacity-50" on:click={nextImage}>
    &#8594;
  </button> -->

  <!-- Tombol navigasi -->
  <div class="absolute grid bottom-1/2 right-4 transform -translate-x-1/2 z-1 gap-4">
    {#each images as image, i (image)}
      <button
        class="{i === currentIndex ? 'bg-blue-500' : 'bg-gray-500/40'} rounded-full w-4 h-4  "
        on:click={() => manualSlide(i)}
      ></button>
    {/each}
  </div>

  <!-- Tombol autoplay -->
  <!-- <button
    class="absolute bottom-0 left-0 z-10 p-2 m-2 text-white bg-gray-800 bg-opacity-50 rounded-full"
    on:click={toggleAutoplay}
  >
    {#if isAutoplay}
      Stop Autoplay
    {:else}
      Start Autoplay
    {/if}
  </button> -->

  {#each images as image, i (image)}
    <img
      src={image}
      alt={`Image ${i + 1}`}
      class=" w-full h-[27rem] max-md:h-[22rem] object-cover rounded-2xl { i === currentIndex ? '' : 'hidden'}"
    />
  {/each}
</div>
