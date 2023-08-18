import type { PoolConnection } from "mysql2/promise"
import { pool } from "../database/connection"

/** utility for working with db connection pooling */
export class Pooling {
  conn: PoolConnection | null = null
  
  async query<T = any>(sql: string, value?: any[]): Promise<T[]> {
    if (!this.conn) {
      this.conn = await pool.getConnection()
    }
    
    const [res] = await this.conn.query(sql,value)
    
    return res as T[]
  }
}
