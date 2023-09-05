import { arr, rand, randAr, randCs, randCsu } from ".";

const provinsi = {
  "ACH": "Aceh",
  "SUT": "Sumatera Utara",
  "SBR": "Sumatera Barat",
  "RIU": "Riau",
  "JBI": "Jambi",
  "SML": "Sumatera Selatan",
  "BNL": "Bengkulu",
  "LMP": "Lampung",
  "KPR": "Kepulauan Riau",
  "KBB": "Kepulauan Bangka Belitung",
  "JKT": "DKI Jakarta",
  "JBR": "Jawa Barat",
  "JTN": "Jawa Tengah",
  "YGY": "Daerah Istimewa Yogyakarta",
  "JTM": "Jawa Timur",
  "BTN": "Banten",
  "BLI": "Bali",
  "NTB": "Nusa Tenggara Barat",
  "NTT": "Nusa Tenggara Timur",
  "KBR": "Kalimantan Barat",
  "KTN": "Kalimantan Tengah",
  "KSL": "Kalimantan Selatan",
  "KTM": "Kalimantan Timur",
  "KUT": "Kalimantan Utara",
  "SLU": "Sulawesi Utara",
  "SLT": "Sulawesi Tengah",
  "SLS": "Sulawesi Selatan",
  "STG": "Sulawesi Tenggara",
  "GTL": "Gorontalo",
  "SLB": "Sulawesi Barat",
  "MLK": "Maluku",
  "MLU": "Maluku Utara",
  "PUA": "Papua",
  "PBR": "Papua Barat",
}

const kabupatenJateng = [
  "Kabupaten Banjarnegara",
  "Kabupaten Banyumas",
  "Kabupaten Batang",
  "Kabupaten Blora",
  "Kabupaten Boyolali",
  "Kabupaten Brebes",
  "Kabupaten Cilacap",
  "Kabupaten Demak",
  "Kabupaten Grobogan",
  "Kabupaten Jepara",
  "Kabupaten Karanganyar",
  "Kabupaten Kebumen",
  "Kabupaten Kendal",
  "Kabupaten Klaten",
  "Kabupaten Kudus",
  "Kabupaten Magelang",
  "Kabupaten Pati",
  "Kabupaten Pekalongan",
  "Kabupaten Pemalang",
  "Kabupaten Purbalingga",
  "Kabupaten Purworejo",
  "Kabupaten Rembang",
  "Kabupaten Semarang",
  "Kabupaten Sragen",
  "Kabupaten Sukoharjo",
  "Kabupaten Tegal",
  "Kabupaten Temanggung",
  "Kabupaten Wonogiri",
  "Kabupaten Wonosobo",
  "Kota Magelang",
  "Kota Pekalongan",
  "Kota Salatiga",
  "Kota Semarang",
  "Kota Surakarta",
  "Kota Tegal"
]

export const provinsiList = Object.values(provinsi)

const kode = arr(6,()=>randCsu(3))

export const listBarang = arr(40, i => ({
  id: randAr(kode) + '-' + rand(1,9) + '-' + rand(1,9) + '-' + arr(4,()=>rand(0,9)).join(''),
  provinsi: randAr(provinsiList),
  kabupaten: randAr(kabupatenJateng)
})).sort((e,f)=>{
  let res = e.id.charCodeAt(0) - f.id.charCodeAt(0)
  if (res == 0) {
    res = e.id.charCodeAt(1) - f.id.charCodeAt(1)
  }
  return res
})

