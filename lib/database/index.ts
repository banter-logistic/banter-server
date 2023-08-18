
export const id = {
  PLG: "PLG",
  SLS: "SLS",
  DRV: "DRV",
  KUR: "KUR",
  WHS: "WHS",
  DSC: "DSC",
  CTR: "CTR",
  OPR: "OPR",
} as const

export const id_to_route = {
  // PLG: '/store',
  SLS: '/counter',
  DRV: '/driver',
  KUR: '/kurir',
  // WHS: '/warehouse',
  // DSC: '/distcenter',
  // CTR: '/counter',
} as Record<string,string>

