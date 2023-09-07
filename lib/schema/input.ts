import { i, o, s } from "../const";
import { repetition, reserved } from "./passwd";


const username = s.max(100)
const passwd = s
  .min(8, { message: "minimal 8 huruf, angka dan simbol" })
  .refine(
    e => (/\w/.test(e)) && (/\d/.test(e)),
    { message: "harus mengandung huruf, angka dan simbol" }
  )
  .refine(repetition, { message: 'pasword mengandung repetisi' })
  .refine(reserved, { message: 'pasword mengandung karakter yang dilarang (<>\';)' })

export const UserInput = {
  username,
  nama: s.max(100),
  passwd,
  nohp: s.max(13),
}

export const AdminInput = o({
  ...UserInput,
  level: i
})

export const SalesInput = o({
  ...UserInput,
  pos_id: i,
})

export const OperatorInput = SalesInput

export const AlamatInput = {
  alamat_detail: s,
  alamat_kabupaten: s,
  alamat_kecamatan: s,
  alamat_kelurahan: s,
  alamat_kodepos: s,
  alamat_provinsi: s
}

export const PelangganInput = o({
  ...AlamatInput,
  ...UserInput,
})

export const PosInput = o({
  ...AlamatInput,
  pos_nama: s.max(100),
  pos_tipe: s,
})

export const DriverInput = o({
  ...UserInput,
  jenis_kendaraan: s,
  kubikase: i,
  plat_nomor: s,
})

export const KurirInput = DriverInput