import * as _view from "../schema/view.js"

declare global {
  namespace view {
    export const BarangInsert: typeof _view.BarangInsert
		export const Barang_DetailInsert: typeof _view.Barang_DetailInsert
		export const TracingInsert: typeof _view.TracingInsert
		export const ManifestInsert: typeof _view.ManifestInsert
		export const Barang_ManifestInsert: typeof _view.Barang_ManifestInsert
		export const BarangDisplay: typeof _view.BarangDisplay
		export const TracingDisplay: typeof _view.TracingDisplay
		export const ManifestDisplay: typeof _view.ManifestDisplay
		export const ManifestDisplayExt: typeof _view.ManifestDisplayExt
    
    export type BarangInsert = typeof BarangInsert
		export type Barang_DetailInsert = typeof Barang_DetailInsert
		export type TracingInsert = typeof TracingInsert
		export type ManifestInsert = typeof ManifestInsert
		export type Barang_ManifestInsert = typeof Barang_ManifestInsert
		export type BarangDisplay = typeof BarangDisplay
		export type TracingDisplay = typeof TracingDisplay
		export type ManifestDisplay = typeof ManifestDisplay
		export type ManifestDisplayExt = typeof ManifestDisplayExt
  }
}