export type alamat = {
  id: number,
  kelurahan: string,
  kecamatan: string,
  kabupaten: string,
  provinsi: string,
  kodepos: string,
}
export type barang = {
  no_resi: string,
  alamat_id: number,
  total_koli: number,
  pengirim: string,
  pengirim_id: number,
  penerima: string,
  penerima_id: number,
  nohp_penerima: string,
  berat: number,
  panjang: number,
  tinggi: number,
  lebar: number,
}
export type brdetail = {
  no_resi: string,
  nama: string,
  koli_ke: number,
}
export type brmanifest = {
  barang_id: string,
  manifest_id: string,
}
export type driver = {
  id: number,
  nama: string,
  nohp: string,
  plat_nomor: string,
  kubikase: number,
  dibuat: Date,
  jenis_kendaraan: string,
  tipe: string,
}
export type manifest = {
  id: string,
  subjek: string,
  aktif: number,
  dibuat: Date,
}
export type operator = {
  id: number,
  nama: string,
  dibuat: Date,
  pos_id: string,
}
export type pelanggan = {
  id: number,
  nama: string,
  nohp: string,
  alamat_id: number,
  dibuat: Date,
}
export type pos = {
  id: number,
  nama_pos: string,
  alamat_id: number,
  tipe: string,
  dibuat: Date,
}
export type sales = {
  id: number,
  nama: string,
  dibuat: Date,
  pos_id: string,
}
export type tracing = {
  id: number,
  tipe: string,
  subjek: string,
  dibuat: Date,
  aktif: number,
  barang_id: string,
}
export type user = {
  id: string,
  username: string,
  passwd: string,
}

