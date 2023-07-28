// import { z } from "zod";


export const BarangInsert = db.BarangSchema.omit({ no_resi: true })
export const Barang_DetailInsert = db.Barang_DetailSchema
export const TracingInsert = db.TracingSchema.omit({ 
  dibuat: true, 
  tracing_id: true,
})

export const UserInsert = db.UserSchema.omit({
  user_id: true, 
})

export const CustomerInsert = db.CustomerSchema.omit({
  customer_id: true, dibuat: true
})

export const ManifestInsert = db.ManifestSchema.pick({ aktif: true, driver_id: true })
export const Barang_ManifestInsert = db.Barang_ManifestSchema

export const BarangDisplay = db.BarangSchema.pick({ 
  no_resi: true, 
  kota: true, 
  total_koli: true, 
})

export const TracingDisplay = db.TracingSchema.pick({ 
  tipe: true, 
  subjek: true 
}).extend(z.object({
  nama: z.string().nullable().default('-'),
}).shape)


const Barang = db.BarangSchema.pick({ no_resi: true, kota: true, total_koli: true })
const Driver = db.DriverSchema.pick({ nama: true, plat_nomor: true })

export const ManifestDisplay = z.object({
  manifest: db.ManifestSchema.pick({ manifest_id: true }),
  barang: Barang.array(),
  driver: Driver
})

export const ManifestDisplayExt = z.object({
  manifest: db.ManifestSchema.pick({ manifest_id: true }),
  barang: Barang.extend(db.TracingSchema.pick({ tipe: true }).shape).array(),
  driver: db.DriverSchema.pick({ nama: true, id: true })
})


