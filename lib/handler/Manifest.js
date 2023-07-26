
export const ManifestQuery = {
  Input: z.object({
    manifest_id: z.number()
  }),
  Output: view.ManifestDisplay,
  url: '/manifest'
}

export const ManifestById = {
  Input: z.object({ user_id: z.number() }),
  Output: view.ManifestDisplay,
  url: '/manifest/kurir'
}

// @ts-ignore
handle.build(ManifestQuery, async ({ exec }, { manifest_id }) => {
  const [manifest] = await exec(table.manifest.select({ id: true, driver_id: true }) + ' where id = ? limit 1',[manifest_id])
  
  if (!manifest) return None('Manifest tidak ditemukan')

  const [driver] = await exec(table.driver.select()+ ' where id = ? limit 1', [manifest.driver_id])
  
  if (!driver) return None(`Kesalahan manifest, driver dengan id ${manifest.driver_id} tidak ditemukan`)

  const barang = await exec(
    `SELECT t.*, b.* FROM barang_manifest t 
     LEFT JOIN barang b ON t.barang_id = b.no_resi
     WHERE t.manifest_id = ?`, [manifest_id]
  )

  if (barang.length == 0) 
    return None('Manifest tidak ada barang')

  return Ok(ManifestQuery.Output.parse({
    barang,
    driver,
    manifest,
  }))
})

handle.build(ManifestById, async ({ exec }, { user_id }) => {

  const [user] = await exec(table.user.select({ subjek: true }) + ' where id=? limit 1', [user_id])

  if (!user) return None('User tidak ditemukan')

  const [driver] = await exec(table.driver.select({ nama: true, id: true })+' where id = ? limit 1', [user.subjek])
  
  if (!driver) return None('driver tidak ditemukan')
 
  // get first active manifest by driver id
  const [manifest] = await exec('SELECT * from manifest m WHERE m.driver_id = ? ORDER BY dibuat DESC LIMIT 1',[driver.id])
  
  if (manifest.length == 0) return None('Manifest tidak ditemukan')
  
  const tracings = await exec(
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
  `,[manifest.id])

  const result = await view.ManifestDisplay.parseAsync({
    barang: tracings,
    driver,
    manifest: { id: manifest.id }
  })

  return Ok(result)
})
