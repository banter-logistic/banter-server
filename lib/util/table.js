
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
    
    insert: (exec,data) => {
      const schema = db[schemaName.replace('Schema','Insert')]
      
      const keys = Object.keys(schema.shape)
      const insert = '(' + keys.join(',') + ')';
      const placeholds = `(${Array(keys.length).fill('?').join(',')})`
      
      return exec(`INSERT INTO ${_table} ${insert} values ${placeholds}`,Object.values(schema.parse(data)))
    },
    
    schema: (keys,prefix) => {
      return Object.keys(keys)
        .map( e => prefix ? prefix + '.' + e : e )
        .join(',')
    }
  }
}
