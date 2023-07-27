
// @ts-ignore
export const table = {}

const schema = Object.entries(db)
const s = (s,b='',a='') => s ? b + s + a : ''

for (let i = 0;i < schema.length;i++) {
  const [ schemaName, _ ] = schema[i]
  const _table = schemaName.replace('Schema','').toLowerCase()
  
  // @ts-ignore
  table[_table] = {
    select: (i,o = {}) => {
      const { prefix, more } = o
      const select = i ? (Object.entries(i).map(([k,v])=>
        s(prefix,'','.') + typeof v == 'string' ? `${k} as ${v}` : `${k}`
      ).join(',')) : '*';
      return `SELECT ${select}${s(more,',')} FROM ${_table} ${s(prefix)}`
    },
    
    insert: (count = 1) => {
      const keys = Object.keys(view[schemaName.replace('Schema','Insert')].shape)
      const insert = '(' + keys.join(',') + ')';
      const placeholds = `(${Array(keys.length).fill('?').join(',')})`
      const icount = count == 1 ? placeholds : Array(count).fill(placeholds).join(',')
      return `INSERT INTO ${_table} ${insert} values ${icount}`
    },
    
    schema: (keys,prefix) => {
      return Object.keys(keys)
        .map( e => prefix ? prefix + '.' + e : e )
        .join(',')
    }
  }
}
