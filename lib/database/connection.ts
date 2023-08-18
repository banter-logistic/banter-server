import { createPool } from "mysql2/promise";


export const pool = createPool({
  user: 'deuzo',
  password: 'mariadb2017',
  database: 'banter_db',
  socketPath: '/var/run/mysqld/mysqld.sock',
  // waitForConnections: true,
  // connectionLimit: 10,
  // maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  // idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  // queueLimit: 0,
  // enableKeepAlive: true,
  // keepAliveInitialDelay: 0,
  // rowsAsArray: true    // as array without the key name
  // multipleStatements: true
})
