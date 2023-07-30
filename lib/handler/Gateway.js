
export const GatewayOut = {
  Input: z.object({ 
    no_resi: z.number().array(),
    driver_id: z.number()
  }),

  Output: view.ManifestDisplay,
  url: '/gateway/out'
}


handle.build(GatewayOut, async ({exec,insert}, { no_resi, driver_id }) => {

  // get driver
  const [driver_query] = await exec(
    table.driver.select() + 
    ' where driver_id = ? limit 1',[driver_id], db.DriverSchema)
  // get barangs
  const barang_query = await exec(
    table.barang.select() + 
    ` where no_resi in (${handle.params(no_resi.length)})`
    , no_resi, db.BarangSchema)
  const [driver, barangs] = await Promise.all([driver_query, barang_query])

  // error handler
  if (!driver){
    return None('Driver tidak ditemukan')
  }
  if (barangs.length == 0) {
    return None('List barang kosong')
  }

  // insert manifest, and get the id
  const { insertId: manifest_id } = await table.manifest.insert(insert, { driver_id, aktif: 1 })

  const promises = []

  // prepare tracings data
  const tracingData = Array(no_resi.length).fill('').map((_,i)=>{
    return handle.toSqlParam(db.TracingInsert, {
      aktif: 1, barang_id: no_resi[i], tipe: 'driver', subjek: driver_id,
    })
  }).flat()

  // prepare barang_manifest data
  const manifestData = Array(no_resi.length).fill('').map((_,i)=>{
    return handle.toSqlParam(db.Barang_ManifestInsert,{
      barang_id: no_resi[i], keterangan: 'default from me', manifest_id,
    })
  }).flat()

  await exec(
    `update tracing set aktif = 0 
    where aktif = 1 and barang_id in (${handle.params(no_resi.length)})`,
    no_resi
  )
  
  // promises.push( insert(
  //   table.tracing.insert(no_resi.length),
  //   tracingData,
  // ), ,
  // insert(
  //   table.barang_manifest.insert(no_resi.length),
  //   manifestData,
  // ))
  
  promises.push(
    ...Array(no_resi.length).fill(0).map( (_,i) => {
      return table.tracing.insert(insert, {
        aktif: 1, barang_id: no_resi[i], tipe: 'driver', subjek: driver_id,
      })
    }),
    ...Array(no_resi.length).fill(0).map( (_,i) => {
      return table.barang_manifest.insert(insert, {
        barang_id: no_resi[i], keterangan: 'default from me', manifest_id
      })
    })
  )
  
  const result = await view.ManifestDisplay.parseAsync({
    barang: barangs,
    driver,
    manifest: { manifest_id }
  })
  
  await Promise.all(promises)
  return Ok( result )
})


export const GatewayIn = {
  Input: z.object({
    no_resi: z.number().array(), 
    pos_id: z.number(), 
    manifest_id: z.number(),
  }),
  Output: z.object({ success: z.boolean() }),
  url: '/gateway/in'
}

handle.build(GatewayIn, async ({exec,insert}, { manifest_id, no_resi, pos_id }) => {
  
  const [pos] = await exec(`select pos_id from pos where pos_id = ?`,[pos_id],db.PosSchema)
  
  if (!pos) return None('Pos tidak ditemukan')
  
  // deactivate manifest
  await exec(`update manifest set aktif = 0 where manifest_id = ?`,[manifest_id])
  
  // deactivate tracing
  await exec(
    `update tracing set aktif = 0 
    where aktif = 1 and barang_id in (${handle.params(no_resi.length)})`,
    no_resi
  )
  // add tracing
  await Promise.all(Array(no_resi.length).fill('').map((_,i)=>{
    return table.tracing.insert(insert, {
      aktif: 1, barang_id: no_resi[i], subjek: pos.pos_id, tipe: "counter"
    })
  }))
  
  return Ok({success:true})
})
