import bcrypt from "bcrypt";

export const Session = {
  Input: z.object({ cookie: z.string() }),
  
  Output: db.SessionSchema.pick({ 
    value: true, exp: true
  }).extend(db.UserSchema.pick({ 
    username: true, 
    type: true, 
    subjek: true 
  }).shape),
  
  url: "/user/session"
}

handle.build(Session, async ({ exec }, { cookie }) => {
  
  const [sessionValue] = await exec(`\
  SELECT s.value,s.exp,u.username,u.subjek,u.type,
  CASE
    WHEN u.\`type\` = 'counter' THEN c.nama
    WHEN u.\`type\` = 'driver' THEN d.nama
    WHEN u.\`type\` = 'kurir' THEN k.nama
  ELSE NULL
  END AS \`nama\`
  FROM session s
  LEFT JOIN user u ON u.id = s.user_id
  LEFT JOIN counter c ON u.\`type\` = 'counter' AND c.id = u.id
  LEFT JOIN driver d ON u.\`type\` = 'driver' AND d.id = u.id
  LEFT JOIN kurir k ON u.\`type\` = 'kurir' AND k.id = u.id
  WHERE sessionId = ?
  `, [cookie], Session.Output)
  
  return sessionValue ? Ok(sessionValue) : None('silahkan login kembali')
})


export const Logout = {
  Input: z.object({ sessionId: z.string() }),
  Output: z.object({}),
  url: '/user/logout'
}

handle.build(Logout, async ({exec}, { sessionId }) => {
  await exec('delete from session where sessionId = ? limit 1',[sessionId])
  return Ok({})
})


export const Login = {
  Input: db.UserSchema.pick({ username: true, passwd: true }),
  Output: db.UserSchema.pick({ type: true })
    .extend(db.SessionSchema.pick({ sessionId: true }).shape),
  url: "/user/login"
}

handle.build(Login, async ({exec}, { username, passwd }) => {
  
  const err = 'username atau password salah'
  
  const [user] = await exec("SELECT * FROM user WHERE username = ? LIMIT 1", [username])
  if (!user) return None(err)
  
  const result = await bcrypt.compare(passwd, user.passwd)
  if (!result) return None(err)
  
  const hash = handle.createHash()
  
  await exec('insert into session (`sessionId`,`value`,`user_id`) values (?, ?, ?)',[hash,'key=value',user.id])
  
  return Ok({ type: user.type, sessionId: hash })
})


// @TODO, want to register, but data validation is unknown
// until we know what type is user registering

// export const Register = {
//   Input: db.UserSchema.omit({ id: true, subjek: true })
//     .extend(CounterSchema.omit({ dibuat:true, id:true }).shape),
//   Output: UserSchema.pick({ id: true }),
//   url: "/user/counter/register"
// }

