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
  return driver ? Ok(driver) : None('Driver tidak ditemukan')
})
