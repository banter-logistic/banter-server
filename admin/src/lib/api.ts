
// const isBrowser = !(typeof window === 'undefined');
const host = 'http://localhost:4040'

function build<T extends { Input: any, Output: any }>(url: string) {
  return async (data: T['Input'],Fetch?: typeof fetch): Promise<Result<T['Output']>> => {
    try {
      const result = await (Fetch ?? fetch)(host + url,{
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
      }).then(e=>e.json())
      return result as T['Output']
    } catch (error) {
			console.error(error);
      return { success: false, error: { message: 'Kesalahan Server, mohon coba beberapa saat lagi', name: 'SERVER_ERR' } }
    }
  }
}

export const Api = {
  Auth: {
		Session: build<api.Session>("/user/session"),
		Logout: build<api.Logout>("/user/logout"),
		Login: build<api.Login>("/user/login"),
		Register: build<api.Register>("/user/counter/register")
	},
	Barang: {
		BarangList: build<api.BarangList>("/barang/list"),
		BarangInsert: build<api.BarangInsert>("/barang/insert")
	},
	Gateway: {
		GatewayOut: build<api.GatewayOut>("/gateway/out"),
		GatewayIn: build<api.GatewayIn>("/gateway/in")
	},
	Manifest: {
		ManifestQuery: build<api.ManifestQuery>("/manifest"),
		ManifestById: build<api.ManifestById>("/manifest/kurir")
	},
	Tracing: {
		TracingList: build<api.TracingList>("/barang/trace"),
		FinishBarang: build<api.FinishBarang>("/barang/finish")
	},
	User: {
		DriverGet: build<api.DriverGet>("/driver")
	}
}
