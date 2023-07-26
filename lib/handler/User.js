export const DriverGet = {
  Input: z.object({ driver_id: z.number(), tipe: z.enum(['driver']).default('driver') }),
  Output: db.DriverSchema,
  url: '/driver'
}


handle.build(DriverGet, async ({exec}, { driver_id, tipe }) => {
  const [a] = await exec(
    table[tipe].select() + ' where id=? limit 1',
    [driver_id]
  )
  console.log(driver_id, tipe)
  if (!a) return None('Driver id tidak ditemukan')
  return Ok(a)
})