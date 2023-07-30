import { writable } from "svelte/store"
import { kota } from "$lib/dummy.json";
import names from "$lib/names.json";

export const randKota = () => {
  return kota[Math.floor(Math.random() * kota.length)]
}

export const rand = (len=5) => {
  let num = 0
  for (let i = 0;i < len;i++) {
    num += Math.floor(Math.random() * 10) * Math.pow(10,i)
  }
  return num
}

export const randName = () => {
  return names[Math.floor(Math.random() * names.length)]
}

const MAX_TOTAL_KOLI = 100

const start_koli = 2

export const store = writable<api.Barang.BarangInsert.Input>({
  alamat: {
    alamat: randKota(),
    kelurahan: randKota(),
    kecamatan: randKota(),
    kota: randKota(),
    provinsi: randKota(),
    kodepos: rand(5),
    pengirim: randName(),
    penerima: randName(),
    nohp_penerima: String(rand()),
    berat: rand(3),
    volume: rand(2),
    total_koli: start_koli,
  },
  barang_details: [
    {
      koli_ke: 1,
      nama_barang: randName()
    },
    {
      koli_ke: 2,
      nama_barang: randName()
    },
  ],
  counter_id: 0
})



store.subscribe(e=>{
  const total = e.alamat.total_koli
  
  if (total > MAX_TOTAL_KOLI) {
    store.update(e=>{
      e.alamat.total_koli = MAX_TOTAL_KOLI
      return e
    })
  } else if ( total <= 0 ) {
    store.update(e=>{
      e.alamat.total_koli = 1
      return e
    })
  }
  
  
  if (e.barang_details.length < total) {
    store.update(e=>{
      const len = total - e.barang_details.length
      let i = 1
      let arr = Array(len).fill( { koli_ke: total - (len - i), nama: randName(), i: ++i } )
      e.barang_details.push(...arr)
      console.log(arr)
      return e
    })
  }
})
