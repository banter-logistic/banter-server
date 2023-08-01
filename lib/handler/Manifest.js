
export const GetManifest = {
  Input: z.object({
    manifest_id: z.number()
  }),
  Output: view.ManifestDisplay,
  url: '/manifest'
}

// @ts-ignore
handle.build(GetManifest, async ({ exec }, { manifest_id }) => {
  const [manifest] = await exec(
    table.manifest.select({ manifest_id: true, driver_id: true }) + 
    ' where manifest_id = ? and aktif = 1 limit 1',[manifest_id], db.ManifestSchema)
  
  if (!manifest) return None('Manifest tidak ditemukan')

  const [driver] = await exec(
    table.driver.select() + 
    ' where driver_id = ? limit 1', [manifest.driver_id])
  
  if (!driver) return None(
    `Kesalahan manifest, driver dengan id ${manifest.driver_id} tidak ditemukan`)

  // select all barang in manifest
  const barang = await exec(
    `SELECT t.*, b.* FROM barang_manifest t 
     LEFT JOIN barang b ON t.barang_id = b.no_resi
     WHERE t.manifest_id = ?`, [manifest_id]
  )

  if (barang.length == 0) 
    return None('Manifest tidak ada barang')

  return Ok(GetManifest.Output.parse({
    barang,
    driver,
    manifest,
  }))
})

// untuk kurir
export const ManifestById = {
  Input: z.object({ kurir_id: z.number() }),
  Output: view.ManifestDisplay,
  url: '/manifest/kurir'
}

handle.build(ManifestById, async ({ exec }, { kurir_id }) => {

  const [kurir] = await exec(table.driver.select({ nama: true, driver_id: true })+
    ' where driver_id = ? and tipe = \'kurir\' limit 1', [kurir_id], db.DriverSchema)
  
  if (!kurir) return None('kurir tidak ditemukan')
 
  // get first active manifest by driver id
  const [manifest] = await exec(`
    SELECT * from manifest m 
    WHERE m.driver_id = ? and m.aktif = 1
    ORDER BY dibuat DESC LIMIT 1`,[kurir.driver_id], db.ManifestSchema)
  
  if (!manifest) 
    return None('Kurir tidak membawa manifest aktif')
  
  // get all latest barang from current manifest
  const barang = await exec(
    `SELECT t.*, b.* FROM barang_manifest bm
     LEFT JOIN barang b ON bm.barang_id = b.no_resi
     LEFT JOIN tracing t ON t.barang_id = b.no_resi
     WHERE bm.manifest_id = ? AND t.dibuat = (
      SELECT dibuat
      FROM tracing
      WHERE barang_id = b.no_resi
      ORDER BY dibuat DESC
      LIMIT 1
    );
  `,[manifest.manifest_id])

  const result = await view.ManifestDisplay.parseAsync({
    barang,
    driver: kurir,
    manifest
  })

  return Ok(result)
})



export const ListManifest = {
  Input: z.object({ driver_id: z.number() }),
  Output: db.ManifestSchema.array(),
  url: '/manifest/list'
}

handle.build(ListManifest, async ({exec}, { driver_id }) => {

  const result = await exec(`
    select m.* from manifest m
    where m.driver_id = ? and aktif = 1
  `, [driver_id])


  return Ok(result)
})










