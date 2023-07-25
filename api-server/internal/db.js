import { createPool } from "mysql2/promise"

global.pool = createPool({
  host: process.env.DBURL,
  user: process.env.DBUSERNAME,
  database: process.env.DBNAME,
  password: process.env.DBPASSWORD,
  socketPath: process.env.DBSOCKET,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  // rowsAsArray: true    // as array without the key name
  // multipleStatements: true
});
