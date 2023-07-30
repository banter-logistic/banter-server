export const GetDriver = {
  Input: z.object({ driver_id: z.number(), tipe: z.enum(['driver','kurir']).default('driver') }),
  Output: db.DriverSchema,
  url: '/driver'
}


handle.build(GetDriver, async ({exec}, { driver_id, tipe }) => {
  const [driver] = await exec(
    table.driver.select() + ' where driver_id=? and tipe = ? limit 1',
    [driver_id, tipe]
  )
  
  if (tipe == 'kurir') {
    const [man] = await exec('select manifest_id from manifest where driver_id = ? and aktif = 1 limit 1', [driver_id], db.ManifestSchema)
    if (man) {
      return None('Kurir sedang membawa manifest, ' + man.manifest_id)
    }
  }
  
  return driver ? Ok(driver) : None('Driver tidak ditemukan')
})

export const GetSales = {
  Input: z.object({ sales_id: z.number() }),
  Output: z.object({
    ...db.SalesSchema.shape,
    ...db.PosSchema.shape
  }),
  url: '/user/sales'
}

handle.build(GetSales, async ({exec},{ sales_id }) => {
  const [res] = await exec(`
  select p.*,s.* from sales s
  left join pos p on s.pos_id = p.pos_id
  where s.sales_id = ? limit 1
  `,[sales_id])
  
  return res ? Ok( GetSales.Output.parse(res) ) : None()
})