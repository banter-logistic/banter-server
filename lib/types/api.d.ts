import * as _Auth from "../handler/Auth.js"
import * as _Barang from "../handler/Barang.js"
import * as _Gateway from "../handler/Gateway.js"
import * as _Manifest from "../handler/Manifest.js"
import * as _Tracing from "../handler/Tracing.js"
import * as _User from "../handler/User.js"
type zinfer<T> = { Input: Zod.infer<T['Input']>, Output: Zod.infer<T['Output']> };
declare global {
  namespace api {
    export type Session = zinfer<typeof _Auth['Session']>
    export type Logout = zinfer<typeof _Auth['Logout']>
    export type Login = zinfer<typeof _Auth['Login']>
    export type Register = zinfer<typeof _Auth['Register']>
    export type BarangList = zinfer<typeof _Barang['BarangList']>
    export type BarangInsert = zinfer<typeof _Barang['BarangInsert']>
    export type GatewayOut = zinfer<typeof _Gateway['GatewayOut']>
    export type GatewayIn = zinfer<typeof _Gateway['GatewayIn']>
    export type ManifestQuery = zinfer<typeof _Manifest['ManifestQuery']>
    export type ManifestById = zinfer<typeof _Manifest['ManifestById']>
    export type TracingList = zinfer<typeof _Tracing['TracingList']>
    export type FinishBarang = zinfer<typeof _Tracing['FinishBarang']>
    export type DriverGet = zinfer<typeof _User['DriverGet']>
  }
}