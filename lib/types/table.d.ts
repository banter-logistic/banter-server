import * as _db from '../schema/database'

type TableName<T extends string> = T extends `${infer Prefix}Schema` ? Lowercase<Prefix> : never;

type methods<T extends Zod.AnyZodObject> = {
  select: (
    i?: Partial<{ [P in keyof Zod.infer<T>]: string | true }>
    ,o?: {
      prefix?: string,
      more?: string 
    }) => string,
  selectOmit: ( 
    i?: Partial<{ [P in keyof Zod.infer<T>]: string | true }>
    ,o?: {
      prefix?: string,
      more?: string 
    })
    => string,
  insert: ( count?: number ) => string,
}

declare global {
  const table: { [P in keyof typeof db as TableName<P>]: methods<typeof db[P]> }
}
