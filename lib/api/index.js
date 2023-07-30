
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
		Login: build("/user/login"),
		Logout: build("/user/logout"),
		GetSession: build("/user/session"),
		GetSalesSession: build("/sales/session"),
		CustomerLogin: build("/customer/login"),
		GetCustomerSession: build("/customer/session"),
		CustomerRegister: build("/customer/register")
	},
	Barang: {
		BarangCounterList: build("/barang/list"),
		BarangInsert: build("/barang/insert")
	},
	Gateway: {
		GatewayOut: build("/gateway/out"),
		GatewayIn: build("/gateway/in")
	},
	Manifest: {
		GetManifest: build("/manifest"),
		ManifestById: build("/manifest/kurir")
	},
	Tracing: {
		TracingList: build("/barang/trace"),
		FinishBarang: build("/barang/finish")
	},
	User: {
		GetDriver: build("/driver"),
		GetSales: build("/user/sales")
	}
}