import "../index.js"

{
  const cached = {}
  for (let i = 0;i < handle.handles.length;i++) {
    const { schema, handle: _handle, } = handle.handles[i]
    
    if (Object.hasOwn(cached, schema.url)) {
      throw new Error(`Duplicate url, in "${schema.url}"`)
    }
    
    cached[schema.url] = 0
  }
}


for (let i = 0;i < handle.handles.length;i++) {
  const { schema, handle: _handle, } = handle.handles[i]
  app.post(schema.url, async (req,res)=> {
    const body = await schema.Input.safeParseAsync(req.body)
    
    if (!body.success) return res.json(Err('validasi gagal, coba lagi'))
    
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    
    try {
      const result = await _handle( 
        {
          exec: async (sql,val) =>/** @type {any} */ (await conn.execute(sql,val))[0],
          insert: async (sql,val) =>/** @type {any} */ (await conn.execute(sql,val))[0],
        },
        body.data 
      )
      
      await conn.commit()
      res.json(result)
    } catch (error) {
      await conn.rollback()
      res.json(ServerErr(error))
    } finally {
      conn.release()
    }
  })
}
