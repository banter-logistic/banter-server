
export const BarangCounterList = {
  Input: z.object({
    limit: z.number().optional(),
    pos_id: z.number()
  }),
  Output: view.BarangDisplay.array(),
  url: '/barang/list'
}

handle.build(BarangCounterList, async ({exec}, { limit, pos_id }) => {
  // get barang tracing 
  
  const result = await exec(`\
  SELECT 
    b.no_resi, b.kota, b.total_koli 
  FROM tracing t
  LEFT JOIN barang b ON b.no_resi = t.barang_id
  WHERE t.aktif = true AND t.tipe = 'counter' AND t.subjek = ?
  LIMIT ?
  `, [pos_id,limit ?? 50])

  return Ok(result)
})


export const BarangInsert = {
  Input: z.object({
    alamat: db.BarangSchema.omit({ no_resi: true }),
    barang_details: db.Barang_DetailSchema.omit({ barang_id: true }).array(),
    counter_id: z.number()
  }),
  Output: z.object({
    no_resi: z.number()
  }),
  url: '/barang/insert'
}

handle.build(BarangInsert, async ({exec,insert}, { alamat, barang_details, counter_id }) => {
  const [pos] = await exec(`select pos_id from pos where pos_id = ? and tipe = 'counter'`,[counter_id],db.PosSchema)

  if (!pos)
    return None(`Counter dengan id ${counter_id}, tidak ditemukan`)

  const { insertId } = await table.barang.insert(insert, alamat)
  const promises = []
  
  barang_details
    .forEach( detail => 
      promises.push( table.barang_detail.insert(insert, { ...detail, barang_id: insertId }))
    )
  
  // promises.push(exec( 
  //   `insert into tracing (barang_id, subjek, tipe, aktif)
  //   values (${insertId}, ${pos.id}, 'counter', 1)
  // `))
  
  promises.push( table.tracing.insert(insert, { aktif: 1,barang_id: insertId, subjek: pos.pos_id, tipe: 'counter' }) )
  
  await Promise.all(promises)
  return Ok({ no_resi: insertId })
})
