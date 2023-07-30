import * as _db from '../schema/database.t'

type TableName<T extends string> = T extends `${infer Prefix}Schema` ? Lowercase<Prefix> : never;
type InsertTable<T extends string> = T extends `${infer Prefix}Insert` ? Lowercase<Prefix> : never;

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
  schema: ( keys: Partial<{ [P in keyof Zod.infer<T>]: true }>, prefix?: string ) => string
}

type inserts<T extends Zod.AnyZodObject> = {
  insert: <E extends (q: string, v: any[]) => any>( exec: E, schema: Zod.infer<T> ) => ReturnType<E>,
}

declare global {
  const table: { [P in keyof typeof db as TableName<P>]: methods<typeof db[P]> } & { [P in keyof typeof db as InsertTable<P>]: inserts<typeof db[P]> }
}

table.sales.insert(() => {}, {  })