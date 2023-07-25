import { z } from "zod"

//#region Barang

export const BarangSchema = z.object({
  no_resi: z.number(),
  alamat: z.string(),
  kelurahan: z.string(),
  kecamatan: z.string(),
  kota: z.string(),
  provinsi: z.string(),
  kodepos: z.number(),
  pengirim: z.string(),
  penerima: z.string(),
  nohp_penerima: z.string(),
  berat: z.number(),
  volume: z.number(),
  total_koli: z.number(),
})

export const Barang_DetailSchema = z.object({
  barang_id: z.number(),
  koli_ke: z.number(),
  nama: z.string(),
})

export const TracingSchema = z.object({
  id: z.number(),
  barang_id: z.number(),
  tipe: z.enum(["counter","kurir","driver", "sampai"]),
  subjek: z.number(),
  dibuat: z.date(),
  aktif: z.number(),
})

export const Barang_ManifestSchema = z.object({
  barang_id: z.number(),
  manifest_id: z.number(),
  keterangan: z.string(),
})

//#endregion

//#region Manifest

export const ManifestSchema = z.object({
  id: z.number(),
  dibuat: z.date(),
  driver_id: z.number(),
  aktif: z.boolean(),
})

//#endregion

//#region User

export const KurirSchema = z.object({
  id: z.number(),
  nama: z.string(),
  dibuat: z.date(),
})

export const PosSchema = z.object({
  id: z.number(),
  nama: z.string(),
  alamat: z.string(),
  type: z.string(),
  dibuat: z.date(),
})

export const CounterSchema = z.object({
  id: z.number(),
  nama: z.string(),
  dibuat: z.date(),
  pos_id: z.number()
})

export const DriverSchema = z.object({
  id: z.number(),
  nama: z.string(),
  no_hp: z.string(),
  plat_nomor: z.string(),
  kubikase: z.number(),
  dibuat: z.date(),
})

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  passwd: z.string(),
  type: z.enum(["counter","kurir","driver"]),
  subjek: z.number()
})

export const SessionSchema = z.object({
  sessionId: z.string(),
  value: z.string(),
  exp: z.date(),
  user_id: z.number()
})

//#endregion