
export const id = {
  PLG: "PLG",
  SLS: "SLS",
  DRV: "DRV",
  KUR: "KUR",
  OPR: "OPR",
  ADM: "ADM",
  
  WHS: "WHS",
  DSC: "DSC",
  CTR: "CTR",
} as const

export const user_id = {
  "admin": "ADM",
  "operator": "opr",
  "sales": "SLS",
  "driver": "DRV",
}

export const id_to_route = {
  // PLG: '/store',
  SLS: '/counter',
  DRV: '/driver',
  KUR: '/kurir',
  ADM: '/admin',
  // WHS: '/warehouse',
  // DSC: '/distcenter',
  // CTR: '/counter',
} as Record<string,string>

