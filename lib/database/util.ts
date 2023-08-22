import type { alamat } from "./schema";

/** draw placeholder `?` n times */
export const ph = (i: number) => Array(i).fill('?').join(',')

import type { Schema } from "./schema";

export const select = new Proxy({},{
  get(_,table) {
    if (typeof table == 'string')
      return (...props: string[]) => {
        return props.map( prop => `\`${table}\`.\`${prop}\`` ).join(',')
      }
    else
      throw new Error('Cannot use symbol when accessing proxy')
  }
}) as { [x in keyof Schema]: (...i: (keyof Schema[x])[]) => string };

export const fields = new Proxy({},{
  get(_,table) {
    if (typeof table == 'string')
      return (...props: string[]) => {
        return props.map( prop => `\`${prop}\`` ).join(',')
      }
    else
      throw new Error('Cannot use symbol when accessing proxy')
  }
}) as { [x in keyof Schema]: (...i: (keyof Schema[x])[]) => string };

export const table = new Proxy({},{
  get: (_,key) => key
}) as { [x in keyof Schema]: string }

export const displayAlamat = ({ 
  alamat_detail, 
  alamat_kelurahan, 
  alamat_kecamatan, 
  alamat_kabupaten, 
  alamat_provinsi,
  alamat_kodepos,
}: alamat
) => `${alamat_detail}, ${alamat_kelurahan}, ${alamat_kecamatan}, ${alamat_kabupaten}, ${alamat_provinsi} ${alamat_kodepos}`