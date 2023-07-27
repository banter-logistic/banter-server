import * as _Auth from "./handler/Auth.js"
import * as _Barang from "./handler/Barang.js"
import * as _Gateway from "./handler/Gateway.js"
import * as _Manifest from "./handler/Manifest.js"
import * as _Tracing from "./handler/Tracing.js"
import * as _User from "./handler/User.js"
type zf<T extends Zod.Schema> = Zod.infer<T>;
function build<T extends { Input: any, Output: any }>(url: string):
  (data: T['Input'],Fetch?: typeof fetch) => Promise<Result<T['Output']>>;

export const Api: {
  Auth: {
		Session: (i: zf<typeof _Auth['Session']['Input']>) => Promise<Result<zf<typeof _Auth['Session']['Output']>>>,
		Logout: (i: zf<typeof _Auth['Logout']['Input']>) => Promise<Result<zf<typeof _Auth['Logout']['Output']>>>,
		Login: (i: zf<typeof _Auth['Login']['Input']>) => Promise<Result<zf<typeof _Auth['Login']['Output']>>>,
		Register: (i: zf<typeof _Auth['Register']['Input']>) => Promise<Result<zf<typeof _Auth['Register']['Output']>>>,
		UserLogin: (i: zf<typeof _Auth['CustomerLogin']['Input']>) => Promise<Result<zf<typeof _Auth['CustomerLogin']['Output']>>>,
		UserRegister: (i: zf<typeof _Auth['CustomerRegister']['Input']>) => Promise<Result<zf<typeof _Auth['CustomerRegister']['Output']>>>
	},
	Barang: {
		BarangList: (i: zf<typeof _Barang['BarangCounterList']['Input']>) => Promise<Result<zf<typeof _Barang['BarangCounterList']['Output']>>>,
		BarangInsert: (i: zf<typeof _Barang['BarangInsert']['Input']>) => Promise<Result<zf<typeof _Barang['BarangInsert']['Output']>>>
	},
	Gateway: {
		GatewayOut: (i: zf<typeof _Gateway['GatewayOut']['Input']>) => Promise<Result<zf<typeof _Gateway['GatewayOut']['Output']>>>,
		GatewayIn: (i: zf<typeof _Gateway['GatewayIn']['Input']>) => Promise<Result<zf<typeof _Gateway['GatewayIn']['Output']>>>
	},
	Manifest: {
		ManifestQuery: (i: zf<typeof _Manifest['GetManifest']['Input']>) => Promise<Result<zf<typeof _Manifest['GetManifest']['Output']>>>,
		ManifestById: (i: zf<typeof _Manifest['ManifestById']['Input']>) => Promise<Result<zf<typeof _Manifest['ManifestById']['Output']>>>
	},
	Tracing: {
		TracingList: (i: zf<typeof _Tracing['TracingList']['Input']>) => Promise<Result<zf<typeof _Tracing['TracingList']['Output']>>>,
		FinishBarang: (i: zf<typeof _Tracing['FinishBarang']['Input']>) => Promise<Result<zf<typeof _Tracing['FinishBarang']['Output']>>>
	},
	User: {
		DriverGet: (i: zf<typeof _User['getDriver']['Input']>) => Promise<Result<zf<typeof _User['getDriver']['Output']>>>
	}
}
