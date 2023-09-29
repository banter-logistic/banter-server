<script>
  let product = [
    {
      id: 1,
      img: "../Banter-image/ser3.jpg",
      title: "Pengiriman Last Mile ",
      subtitle: "Memastikan Kedekatan dan Ketepatan",
      desc: 'Fokus pada tahap terakhir perjalanan pengiriman, layanan ini mengutamakan pengantaran yang akurat dan cepat ke tujuan akhir, menjembatani kesenjangan "last mile".',
    },
    {
      id: 2,
      img: "../Banter-image/ser4.jpg ",
      title: "Pengiriman Ekspres",
      subtitle: " Cepat, Handal, Tepat Waktu",
      desc: "Dapatkan pengiriman kilat dengan layanan ekspres kami, memastikan barang Anda tiba dalam waktu singkat, sesuai dengan kebutuhan ketepatan waktu Anda.",
    },
    {
      id: 3,
      img: "../Banter-image/ser5.jpg ",
      title: "Pengiriman regular",
      subtitle: "Efisien dan Terpercaya",
      desc: "Pengiriman reguler kami memberikan solusi efisien dan tepat waktu dalam memenuhi kebutuhan logistik harian Anda. ",
    },
    {
      id: 4,
      img: "../Banter-image/ser6.jpg ",
      title: "Pengiriman Berat dan Besar ",
      subtitle: "Solusi Logistik Skala Besar",
      desc: "Solusi logistik khusus untuk pengiriman barang dengan ukuran dan berat yang signifikan, membantu Anda mengatasi tantangan logistik skala besar dengan efisien.",
    },
    
  ];

</script>

{#each product as pd (pd.id)}
  <article class="card" >
    <div class="temporary_text">
      <img src={pd.img} alt=""  />
    </div>
    <img src="../Banter-image/logo.png" alt="" class="absolute w-12 right-2 mt-2 z-10   ">
    <div class="w-full h-10 -mt-5 -ml-2 mx-auto absolute bg-[#148CEB]  z-1 rounded-full -rotate-12"></div>
    <div class="w-20 h-20 mx-auto -right-3 -top-3 absolute bg-white  rounded-full"></div>
    <div class="card_content">
      
      <span class="card_title">{pd.title}</span>
      <span class="card_subtitle"
        >{pd.subtitle}</span
      >
      <p class="card_description">
        {pd.desc}
      </p>
    </div>
  </article>
{/each}

<style>
  .card {
    position: relative;
    width: 15rem;
    height: 19rem;
   
    overflow: hidden;
    border-radius: 20px;
     box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
   .temporary_text {
  position: relative;
  width: 100%;
  
}

.temporary_text img {
  aspect-ratio: 7/9;
  display: block;
  object-fit: cover; 
}

  .card_title {
    
    font-weight: bold;
  }

  .card_content {
    position: absolute;
    left: 0;
    bottom: 0;
    /* edit the width to fit card */
    width: 100%;
    height: 200px;
    padding: 20px;
     background: rgba(20, 140, 235, 0.9);
    backdrop-filter: blur(20px);
    border-top-left-radius: 20px;
    /* edit here to change the height of the content box */
    transform: translateY(90px);
    transition: transform 0.25s;
    color: white;
  }

  /* .card_content::before {
    content: "";
    position: absolute;
    top: -77px;
    left: 0;
    width: 100px;
    height: 100px;
    transform: rotate(-175deg);
    border-top-left-radius: 50%;
    border-bottom-right-radius: 50%;
    background: rgba(255, 255, 255,100);
    backdrop-filter: blur(20px);
 
  } */

  .card_title {
    
    font-size: 1.25rem;
  }

  .card_subtitle {
    display: block;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .card_description {
    font-size: 1rem;
    opacity: 0;
    transition: opacity 0.5s;
  }

  .card:hover .card_content {
    transform: translateY(0);
  }

  .card:hover .card_description {
    opacity: 1;
    transition-delay: 0.25s;
  }
</style>
