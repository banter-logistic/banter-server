<script>
    let blog =[
        {id:1 , img:"../Banter-image/barang.jpg" , user:"Admin" , date:"24 Agustus 2023" , title:"Lomba 17 Agustus" , desc:"lomba yang diadakan oleh banter di dalam panti asuhan untuk menghibur adek-adek panti dengan berbagai lomba "},
        {id:2 , img:"../Banter-image/barang.jpg" , user:"Admin" , date:"24 Agustus 2023", title:"Lomba 17 Agustus" , desc:"lomba yang diadakan oleh banter di dalam panti asuhan untuk menghibur adek-adek panti dengan berbagai lomba "},
        {id:3 , img:"../Banter-image/barang.jpg" , user:"Admin" , date:"24 Agustus 2023",title:"Lomba 17 Agustus" , desc:"lomba yang diadakan oleh banter di dalam panti asuhan untuk menghibur adek-adek panti dengan berbagai lomba "},
    ]
</script>


{#each blog  as bg (bg.id) }
    <div class="w-[21rem] h-[26rem] shadow-2xl  rounded-2xl flex flex-col gap-4 justify-center items-center">
        <img src={bg.img} alt="" class="w-[17rem] h-[11rem] rounded-xl">
        <div class="flex gap-4">
        <img src="../Banter-image/profile-user.png" alt="" class="w-[1.5rem] h-[1.5rem]">
        <p>{bg.user}</p>
        <img src="../Banter-image/calendar.png" alt="" class="w-[1.5rem] h-[1.5rem]">
        <p>{bg.date}</p>
        </div>
        <h1 class="font-semibold text-[#2C3E50]  text-lg">{bg.title}</h1>
        <p class="text-center text-[#79797C] text-md ">{bg.desc}</p>
    </div>

{/each}