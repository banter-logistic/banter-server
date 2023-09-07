import type { id } from "../db/data";

export type ids = keyof typeof id

type user = {
  kode: 'ADM'
  level: number
} | {
  kode: 'PLG'
  something: string
} | {
  kode: 'SLS' | 'OPR'
  pos_id: number
}

type general = {
  id: number
  kode: ids
  username: string
}

export type User = user & general