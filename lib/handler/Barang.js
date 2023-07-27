
export const BarangCounterList = {
  Input: z.object({
    limit: z.number().optional(),
    subjek: z.number()
  }),
  Output: view.BarangDisplay.array(),
  url: '/barang/list'
}

handle.build(BarangCounterList, async ({exec}, { limit, subjek }) => {
  // get barang tracing 
  
  const result = await exec(`\
  SELECT 
    b.no_resi, b.kota, b.total_koli 
  FROM tracing t
  LEFT JOIN barang b ON b.no_resi = t.barang_id
  WHERE t.aktif = true AND t.tipe = 'counter' AND t.subjek = ?
  LIMIT ?
  `, [subjek,limit ?? 50])

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
  
  const vals = Object.values(alamat)
  
  const [pos] = await exec(`select pos_id from pos where pos_id = ?`,[counter_id])

  if (!pos)
    return None(`Counter dengan id ${counter_id}, tidak ditemukan`)

  const { insertId } = await insert(table.barang.insert(), vals)
  const promises = []
  
  const ivals = barang_details
    .map( detail => Object.values(db.Barang_DetailSchema
      .parse({ ...detail, barang_id: insertId })) 
    )
    .flat()
  
  promises.push(exec( table.barang_detail.insert(barang_details.length) ,ivals))
  
  promises.push(exec( 
    `insert into tracing (barang_id, subjek, tipe, aktif) 
    values (${insertId}, ${pos.id}, 'counter', 1)
  `))
  
  await Promise.all(promises)
  return Ok({ no_resi: insertId })
})
