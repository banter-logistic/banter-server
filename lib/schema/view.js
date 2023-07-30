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


const Driver = db.DriverSchema.pick({ nama: true, plat_nomor: true })

export const ManifestDisplay = z.object({
  manifest: db.ManifestSchema.pick({ manifest_id: true }),
  barang: BarangDisplay.array(),
  driver: Driver
})

export const ManifestDisplayExt = z.object({
  manifest: db.ManifestSchema.pick({ manifest_id: true }),
  // barang: Barang.extend(db.TracingSchema.pick({ tipe: true }).shape).array(),
  barang: z.object({
    
  }),
  driver: db.DriverSchema.pick({ nama: true, id: true })
})


