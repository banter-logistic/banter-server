
function build<T extends { Input: any, Output: any }>(url: string): 
  (data: T['Input'],Fetch?: typeof fetch) => Promise<Result<T['Output']>>;

export const Api: {
  Auth: {
    Session: (i: api.Session['Input']) => Promise<Result<api.Session['Output']>>,
    Logout: ReturnType<typeof build<api.Logout>>,
    Login: ReturnType<typeof build<api.Login>>,
    Register: ReturnType<typeof build<api.Register>>
  },
  Barang: {
    BarangList: ReturnType<typeof build<api.BarangList>>,
    BarangInsert: ReturnType<typeof build<api.BarangInsert>>
  },
  Gateway: {
    GatewayOut: ReturnType<typeof build<api.GatewayOut>>,
    GatewayIn: ReturnType<typeof build<api.GatewayIn>>
  },
  Manifest: {
    ManifestQuery: ReturnType<typeof build<api.ManifestQuery>>,
    ManifestById: ReturnType<typeof build<api.ManifestById>>
  },
  Tracing: {
    TracingList: ReturnType<typeof build<api.TracingList>>,
    FinishBarang: ReturnType<typeof build<api.FinishBarang>>
  },
  User: {
    DriverGet: ReturnType<typeof build<api.DriverGet>>
  }
}
