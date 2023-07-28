import bcrypt from "bcrypt";

export const Login = {
  Input: db.UserSchema.pick({ username: true, passwd: true }),
  Output: db.UserSchema.pick({ tipe: true })
    .extend(db.SessionSchema.pick({ session_id: true }).shape),
  url: "/user/login"
}

handle.build(Login, async ({exec}, { username, passwd }) => {
  
  const err = 'username atau password salah'
  
  const [user] = await exec("SELECT * FROM user WHERE username = ? LIMIT 1", [username], db.UserSchema)
  if (!user) return None(err)
  
  const result = await bcrypt.compare(passwd, user.passwd)
  if (!result) return None(err)
  
  const hash = handle.createHash()
  
  await exec(`
    insert into session (session_id,value,user_id) 
    values (?, ?, ?)`,[hash,'key=value',user.user_id]);
  
  return Ok({ tipe: user.tipe, session_id: hash })
})

export const Logout = {
  Input: z.object({ session_id: z.string() }),
  Output: z.object({}),
  url: '/user/logout'
}

handle.build(Logout, async ({exec}, { session_id }) => {
  await exec('delete from session where session_id = ? limit 1',[session_id])
  return Ok({})
})

export const GetSession = {
  Input: z.object({ cookie: z.string() }),
  Output: z.object({ tipe: z.string(), subjek: z.number() }),
  url: '/user/session'
}

handle.build(GetSession, async ({exec},{ cookie }) => {
  
  const [user] = await exec(`
    select u.tipe,u.subjek
    from session s 
    left join user u on u.user_id = s.user_id
    where s.session_id = ? limit 1
  `, [cookie], GetSession.Output)

  return user ? Ok(user) : None('silahkan login kembali')
})


export const GetSalesSession = {
  Input: z.object({ cookie: z.string() }),
  Output: db.SalesSchema.pick({ sales_id: true, nama: true })
    .extend( db.PosSchema.pick({ pos_id: true, nama_pos: true, alamat: true}).shape ),
  url: '/sales/session'
}

handle.build(GetSalesSession, async ({exec},{ cookie }) => {
  
  const [user] = await exec(`
    select 
      sl.nama,sl.sales_id,p.nama_pos,p.alamat,p.pos_id
    from session s 
    left join user u on u.user_id = s.user_id and u.tipe = 'sales'
    left join sales sl on sl.sales_id = u.subjek
    left join pos p on p.pos_id = sl.pos_id
    where s.session_id = ? limit 1
  `, [cookie], GetSalesSession.Output)
  
  return user ? Ok(user) : None('silahkan login kembali')
})


export const CustomerLogin = {
  Input: z.object({
    username: z.string(),
    passwd: z.string()
  }),
  Output: z.object({
    session_id: z.string()
  }),
  url: '/customer/login'
}

handle.build(CustomerLogin, async ({exec}, { username, passwd }) => {
  
  const err = 'username atau password salah'
  
  const [user] = await exec(`
    SELECT * FROM user 
    WHERE username = ? and tipe = 'customer' LIMIT 1`
    , [username])
  if (!user) return None(err)
  
  const result = await bcrypt.compare(passwd, user.passwd)
  if (!result) return None(err)
  
  const hash = handle.createHash()
  
  await exec(`
    insert into session (session_id,value,user_id) 
    values (?, ?, ?)',[hash,'key=value',user.id])`);
  
  return Ok({ tipe: user.tipe, session_id: hash })
})

export const GetCustomerSession = {
  Input: z.object({
    cookie: z.string()
  }),
  Output: db.CustomerSchema.pick({
    nama: true, 
    alamat: true, 
    nohp: true
  }),
  url: '/customer/session'
}

handle.build(GetCustomerSession, async ({ exec }, { cookie }) => {
  
  const [sessionValue] = await exec(`\
  SELECT c.nama,c.nohp,c.alamat FROM session s
  LEFT JOIN user u ON u.user_id = s.user_id AND u.type = 'customer'
  LEFT JOIN customer c ON c.customer_id = u.subjek
  WHERE sessionId = ? limit 1
  `, [cookie], GetCustomerSession.Output)
  
  return sessionValue ? Ok(sessionValue) : None('silahkan login kembali')
})

export const CustomerRegister = {
  Input: db.CustomerSchema.omit({
    customer_id: true,
    dibuat: true
  }).extend(db.UserSchema.omit({
    user_id: true,
    tipe: true,
    subjek: true,
  }).shape),
  
  Output: z.object({ id: z.number() }),
  url: '/customer/register'
}

handle.build(CustomerRegister, async ({ exec, insert }, { username, passwd, alamat, nama, nohp }) => {
  
  const avail = await exec(`select username from user where username = ?`,[username])
  
  if (avail) return None('username tidak tersedia')

  const cryptPass = await bcrypt.hash(passwd, 10);
  
  const customer = await insert(table.customer.insert(),[nama, nohp, alamat])
  const user = await insert(table.user.insert(),[username, cryptPass, 'customer', customer.insertId])
  
  return Ok({ id: user.insertId })
})


