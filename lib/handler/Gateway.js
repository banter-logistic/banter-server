
export const GatewayOut = {
  Input: z.object({ 
    no_resi: z.number().array(),
    subjek: z.number(),
    tipe: z.enum(['driver'])
  }),

  Output: view.ManifestDisplay,
  url: '/gateway/out'
}


handle.build(GatewayOut, async ({exec,insert}, { subjek, no_resi, tipe }) => {
  const [driver_query] = await exec(table.driver.select() + ' where id = ?  limit 1',[subjek])
  const barang_query = await exec(table.barang.select() + ` where no_resi in (${handle.params(no_resi.length)})`, no_resi)
  const [driver, barangs] = await Promise.all([driver_query, barang_query])

  // error handler
  if (!driver || barangs.length == 0){
    return None('Driver tidak ditemukan')
  }

  const { insertId: manifest_id} = await insert(
    table.manifest.insert(), 
    [subjek, true]
  )
  const promises = []
  
  const tracingData = Array(no_resi.length).fill('').map((_,i)=>{
    return handle.toSqlParam(view.TracingInsert, {
      aktif: 1, barang_id: no_resi[i], subjek: subjek, tipe
    })
  }).flat()
  const manifestData = Array(no_resi.length).fill('').map((_,i)=>{
    return handle.toSqlParam(view.Barang_ManifestInsert,{
      barang_id: no_resi[i], keterangan: 'default from me', manifest_id,
    })
  }).flat()
  console.log(manifestData)
  await exec(
    `update tracing set aktif = 0 where aktif = 1 and barang_id in (${handle.params(no_resi.length)})`,
    no_resi
  )
  
  promises.push( insert(
    table.tracing.insert(no_resi.length),
    tracingData,
  ), insert(
    table.barang_manifest.insert(no_resi.length),
    manifestData,
  ))
  
  const result = view.ManifestDisplay.parseAsync({
    barang: barangs,
    driver,
    manifest: { id: manifest_id }
  })
  
  await Promise.all(promises)
  return Ok( await result )
})


export const GatewayIn = {
  Input: z.object({
    no_resi: z.number().array(), 
    counter_id: z.number(), 
    manifest_id: z.number(),
  }),
  Output: z.object({ success: z.boolean() }),
  url: '/gateway/in'
}

handle.build(GatewayIn, async ({exec,insert}, { manifest_id, no_resi, counter_id }) => {
  
  const [pos] = await exec(`select id from pos where id = ?`,[counter_id])
  
  if (!pos) return None('Pos id tidak ditemukan')
  
  // deactivate manifest
  await exec(`update manifest set aktif = 0 where id = ?`,[manifest_id])
  
  // deactivate tracing
  await exec(
    `update tracing set aktif = 0 where aktif = 1 and barang_id in (${handle.params(no_resi.length)})`,
    no_resi
  )
  // add tracing
  const tracingData = Array(no_resi.length).fill('').map((_,i)=>{
    return handle.toSqlParam(view.TracingInsert, {
      aktif: 1, barang_id: no_resi[i], subjek: pos.id, tipe: "counter"
    })
  }).flat()
  
  await insert(
    table.tracing.insert(no_resi.length),
    tracingData,
  )
  
  return Ok({success:true})
})