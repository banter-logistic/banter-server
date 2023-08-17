import { createPool } from "mysql2/promise";


export const pool = createPool({
  user: 'deuzo',
  password: 'mariadb2017',
  database: 'banter_db',
  socketPath: '/var/run/mysqld/mysqld.sock'
})
