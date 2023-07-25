import * as _db from "../schema/database.js"

declare global {
  namespace db {
    export const BarangSchema: typeof _db.BarangSchema
		export const Barang_DetailSchema: typeof _db.Barang_DetailSchema
		export const TracingSchema: typeof _db.TracingSchema
		export const Barang_ManifestSchema: typeof _db.Barang_ManifestSchema
		export const ManifestSchema: typeof _db.ManifestSchema
		export const KurirSchema: typeof _db.KurirSchema
		export const PosSchema: typeof _db.PosSchema
		export const CounterSchema: typeof _db.CounterSchema
		export const DriverSchema: typeof _db.DriverSchema
		export const UserSchema: typeof _db.UserSchema
		export const SessionSchema: typeof _db.SessionSchema
    
    export type BarangSchema = Zod.infer<typeof BarangSchema>
		export type Barang_DetailSchema = Zod.infer<typeof Barang_DetailSchema>
		export type TracingSchema = Zod.infer<typeof TracingSchema>
		export type Barang_ManifestSchema = Zod.infer<typeof Barang_ManifestSchema>
		export type ManifestSchema = Zod.infer<typeof ManifestSchema>
		export type KurirSchema = Zod.infer<typeof KurirSchema>
		export type PosSchema = Zod.infer<typeof PosSchema>
		export type CounterSchema = Zod.infer<typeof CounterSchema>
		export type DriverSchema = Zod.infer<typeof DriverSchema>
		export type UserSchema = Zod.infer<typeof UserSchema>
		export type SessionSchema = Zod.infer<typeof SessionSchema>
  }
}