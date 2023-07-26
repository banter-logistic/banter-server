
// const isBrowser = !(typeof window === 'undefined');
const host = 'http://localhost:4040'

function build(url) {
  return async (data,Fetch) => {
    try {
      const result = await (Fetch ?? fetch)(host + url,{
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
      }).then(e=>e.json())
      return result
    } catch (error) {
      console.error(error);
      return { success: false, error: { message: 'Kesalahan Server, mohon coba beberapa saat lagi', name: 'SERVER_ERR' } }
    }
  }
}

export const Api = {
  Auth: {
		Session: build("/user/session"),
		Logout: build("/user/logout"),
		Login: build("/user/login"),
		Register: build("/user/counter/register"),
		UserLogin: build("/user/customer"),
		UserRegister: build("/user/customer/register")
	},
	Barang: {
		BarangList: build("/barang/list"),
		BarangInsert: build("/barang/insert")
	},
	Gateway: {
		GatewayOut: build("/gateway/out"),
		GatewayIn: build("/gateway/in")
	},
	Manifest: {
		ManifestQuery: build("/manifest"),
		ManifestById: build("/manifest/kurir")
	},
	Tracing: {
		TracingList: build("/barang/trace"),
		FinishBarang: build("/barang/finish")
	},
	User: {
		DriverGet: build("/driver")
	}
}