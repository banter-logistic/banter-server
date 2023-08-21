import { createConnection } from "mysql2/promise";

const conn = await createConnection({
  user: 'deuzo',
  password: 'mariadb2017',
  database: 'banter_db',
  socketPath: '/var/run/mysqld/mysqld.sock'
})

// @ts-ignore
const tables = (await conn.query('show tables'))[0].map( e => e.Tables_in_banter_db )

for (const table of tables) {
  console.log((await conn.query('select count(*) as ' + table + ' from ' + table))[0])
}

// ;console.log((await conn.query('describe pos'))[0])

conn.end()