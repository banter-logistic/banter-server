import type { PoolConnection } from "mysql2/promise"
import { pool } from "./connection"
import type { Schema, alamat } from "./schema";

/** draw placeholder `?` n times */
export const ph = (i: number) => Array(i).fill('?').join(',')

/**
 * create type safe sql properties
 * @example 
 * ```ts
 * // no need to add `from table`
 * 
 * const { user, admin } = select
 * query(`select ${user('id','name')} where ${user('id')} = ?`,[id])
 * 
 * // alias
 * query(`select ${admin('id','name:username')} where ${admin('id')} = ?`,[id])
 * ```
 */
export const select = new Proxy({},{
  get(_,table) {
    if (typeof table != 'string') throw new Error('Cannot use symbol')
      
    const parseAlias = (prop: string) => {
      return prop.includes(':') ? `\`${prop.split(':')[0]}\` as \`${prop.split(':').at(-1)}\`` : `\`${prop}\``
    }
    
    return (...props: string[]) => {
      if (props.length == 0) {
        return `\`${table}\`.* from \`${table}\``
      }
      
      return props
        .map( prop => `\`${table}\`.${parseAlias(prop)}`)
        .join(',') + ` from \`${table}\``;
    }
  }
}) as {
  [x in keyof Schema]: (...i: (keyof Schema[x] | `${Extract<keyof Schema[x],string>}:${string}`)[]) => string
};

/**
 * get typesafe table string
 * @example
 * ```ts
 * const { User, Admin } = table
 * const sql = `left join ${User} on ${user('id')} = ?`
 * ```
 */
export const table = new Proxy({},{
  get(_,key){
    return key.toString().toLowerCase()
  }
}) as {
  [x in keyof Schema as Capitalize<x>]: x
};

/**
 * 'User' => 'User'
 * 'User:Some' => 'Some'
 */
export type SqlProp<Prop> = Prop extends `${string}:${infer As}` ? As : Prop



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

/**
 * format alamat from database
 */
export const displayAlamat = ({ 
  alamat_detail, 
  alamat_kelurahan, 
  alamat_kecamatan, 
  alamat_kabupaten, 
  alamat_provinsi,
  alamat_kodepos,
}: alamat
) => `${alamat_detail}, ${alamat_kelurahan}, ${alamat_kecamatan}, ${alamat_kabupaten}, ${alamat_provinsi} ${alamat_kodepos}`