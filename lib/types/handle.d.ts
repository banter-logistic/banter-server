import * as h from "../util/handle.js/index.js"
import * as dd from "../schema/database.t.js/index.js";

declare global {
  namespace handle {
    
    /** all handles */
    export const handles: {
      schema: Parameters<typeof build>['0'],
      handle: Parameters<typeof build>['1'],
    }[]

    /** create new handle */
    export const build: <T extends {
      Input: Zod.ZodType, 
      Output: Zod.ZodType, url: string 
    }>(
      schema: T, 
      handle: (
        helper: {
          exec: <U extends Zod.Schema = any>(sql: string, val?: any, sch?: U) => Promise<Zod.infer<U>[]>,
          insert: (sql: string, val?: any) => Promise<{ insertId: number }>
        },
        i: Zod.infer<T['Input']>,
      ) => Promise<Result<Zod.infer<T['Output']>>>) 
    => void;

    /** 
     * to sql array parameter, it need to be in order 
     * @example exec('insert into', toSqlParam(OutSchema, { data }) )
     */
    export const toSqlParam: <T extends Zod.AnyZodObject>(
      s: T, 
      data: Zod.infer<T>
    ) => any[]
      
    /** create random hash, currently for session id only */
		export const createHash: () => string
    /** create placeholders ("?") for sql string query */
		export const params: (n: number) => string
    
    // For another day
    // export const create: <T extends schema>(
    //   schema:T, 
    //   handle: (i: Zod.infer<T['Input']> & { exec:exec } ) => Promise<Result<Zod.infer<T['Output']>>>
    // ) => handle<T>;
    
    // type schema = {
    //   Input: Zod.Schema
    //   Output: Zod.Schema
    //   url: string
    // }

    // type exec = <U extends Zod.Schema = any>(sql: string, val?: any, sch?: U) => Promise<Zod.infer<U>[]>

    // type handle<T extends schema> = {
    //   schema: T
    //   main: ((i: Zod.infer<T['Input']>) => Promise<Result<Zod.infer<T['Output']>>>)[]
    //   extends: <U extends schema>(
    //     s: U, 
    //     i: (i: Zod.infer<U['Input']> & Zod.infer<T['Input']> & { exec:exec }) => Promise<Result<Zod.infer<U['Output']>>>
    //   ) => handle<{ Input: T['Input'] & U['Input'], Output: T['Input'] & U['Input'] }>
    // }
  }
}