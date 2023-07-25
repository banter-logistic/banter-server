import { z } from "zod";
import { BarangSchema, Barang_DetailSchema, Barang_ManifestSchema, DriverSchema, ManifestSchema, TracingSchema } from "./database.js";


export const BarangInsert = BarangSchema.omit({ no_resi: true })
export const Barang_DetailInsert = Barang_DetailSchema
export const TracingInsert = TracingSchema.omit({ 
  dibuat: true, 
  id: true,
})

export const ManifestInsert = ManifestSchema.pick({ aktif: true, driver_id: true })
export const Barang_ManifestInsert = Barang_ManifestSchema

export const BarangDisplay = BarangSchema.pick({ 
  no_resi: true, 
  kota: true, 
  total_koli: true, 
})

export const TracingDisplay = TracingSchema.pick({ 
  tipe: true, 
  subjek: true 
}).extend(z.object({
  nama: z.string(),
}).shape)


const Barang = BarangSchema.pick({ no_resi: true, kota: true, total_koli: true })
const Driver = DriverSchema.pick({ nama: true, plat_nomor: true })

export const ManifestDisplay = z.object({
  manifest: ManifestSchema.pick({ id: true }),
  barang: Barang.array(),
  driver: Driver
})

export const ManifestDisplayExt = z.object({
  manifest: ManifestSchema.pick({ id: true }),
  barang: Barang.extend(TracingSchema.pick({ tipe: true }).shape).array(),
  driver: DriverSchema.pick({ nama: true, id: true })
})
