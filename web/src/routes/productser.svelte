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
    width: 17.05406rem;
    height: 24.08606rem;
    background: #131313;
    overflow: hidden;
    border-radius: 20px;
     box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
   .temporary_text {
  position: relative;
  width: 100%;
}

.temporary_text img {
  width: 100%;
  height: 100%;
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
    height: 280px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.30);
    backdrop-filter: blur(20px);
    border-top-left-radius: 20px;
    /* edit here to change the height of the content box */
    transform: translateY(150px);
    transition: transform 0.25s;
  }

  .card_content::before {
    content: "";
    position: absolute;
    top: -47px;
    right: -45px;
    width: 100px;
    height: 100px;
    transform: rotate(-175deg);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.30);
  backdrop-filter: blur(20px);
 
  }

  .card_title {
    color: #131313;
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
