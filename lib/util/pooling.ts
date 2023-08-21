import type { PoolConnection } from "mysql2/promise"
import { pool } from "../database/connection"
import { ph } from "../database/util"

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
  
  async insert(sql: string, value?: any[]): Promise<{ insertId: number }> {
    if (!this.conn) {
      this.conn = await pool.getConnection()
    }
    
    const [res] = await this.conn.query(sql,value) as any
    
    return res
  }
  
  async insertFormat<T = Record<string,any>>(table: string, input: Partial<{ [x in keyof T]: any }>): Promise<{ insertId: number }> {
    if (!this.conn) {
      this.conn = await pool.getConnection()
    }
    
    const len = Object.keys(input).length
    const fields = Object.keys(input).map( field => `\`${field}\`` ).join(',')
    const [res] = await this.conn.query(`insert into \`${table}\` (${fields}) values (${ph(len)})`, Object.values(input)) as any
    
    return res
  }
}

const expectedSqlError = {
  'ER_DUP_ENTRY': {
    name: 'NOT_FOUND',
    message: 'Halaman tidak ditemukan'
  }
} as Record<string,{ name: string, message: string, code?: string }>

type SqlError = {
  code: string,
  errno: number,
  sql: string,
  sqlState: string,
  sqlMessage: string
}