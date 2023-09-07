import { createPool } from "mysql2/promise";
import { DBNAME, DBPASSWD, DBUSERNAME, DBSOCKET } from "$env/static/private";

export const pool = createPool({
  user: DBUSERNAME,
  password: DBPASSWD,
  database: DBNAME,
  socketPath: DBSOCKET,
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
