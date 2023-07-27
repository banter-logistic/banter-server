export const TracingList = {
  Input: z.object({ barang_id: z.number() }),
  Output: z.object({
    barang: db.BarangSchema,
    last_tracing: view.TracingDisplay,
    tracings: view.TracingDisplay.array()
  }),
  url: '/barang/trace'
}

handle.build(TracingList,async ({exec}, { barang_id }) => {
  
  // query all tracing by id
  
  const [barang] = await exec(
    table.barang.select({ berat: true }) + ' where no_resi = ? limit 1', [barang_id]
  )

  if (!barang) return None(`Barang dengan no resi ${barang_id} tidak ditemukan`)
  
  const tracings = await exec(`\
    SELECT t.tipe,t.subjek,t.aktif,
      COALESCE(c.nama_pos, d.nama) AS nama
    FROM tracing t
    LEFT JOIN pos c ON t.tipe = 'counter' AND t.subjek = c.pos_id
    LEFT JOIN driver d ON t.tipe = 'driver' AND t.subjek = d.driver_id
    WHERE t.barang_id = ?`,
    [barang_id]
  )

  // LEFT JOIN driver e ON t.tipe = 'sampai' AND t.subjek = e.id

  if (tracings.length == 0) 
    return None(`Kesalahan barang, tracing kosong`)
  
  const [last_tracing] = tracings.splice(tracings.findIndex(e=>e.aktif),1);

  if (!last_tracing)
    return None('Kesalahan tracing, tidak ada tracing aktif')
  
  const out = TracingList.Output.parse({
    barang,
    last_tracing,
    tracings
  })
  
  return Ok(out)
})


export const FinishBarang = {
  Input: z.object({
    no_resi: z.number().array(),
    subjek: z.number()
  }),
  Output: z.object({ success: z.boolean() }),
  url: '/barang/finish'
}

handle.build(FinishBarang, async ({exec}, { subjek, no_resi }) => {

  const ivals = Array(no_resi.length).fill(0).map((_,i)=>
    handle.toSqlParam(view.TracingInsert, {
      subjek, tipe: 'sampai', barang_id: no_resi[i], aktif: 1
    })
  ).flat()

  await exec(
    `update tracing set aktif = 0 
    where aktif = 1 and barang_id in (${handle.params(no_resi.length)})`,
    no_resi
  )

  await exec( table.tracing.insert(no_resi.length) ,ivals)
  return Ok({ success: true })
})
