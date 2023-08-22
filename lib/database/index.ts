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

export const userId = {
  PLG: "PLG",
  SLS: "SLS",
  DRV: "DRV",
  KUR: "KUR",
  OPR: "OPR",
  ADM: "ADM",
} as const

export const posId = {
  WHS: "WHS",
  DSC: "DSC",
  CTR: "CTR",
} as const

export const idToRoute = {
  SLS: '/counter',
  DRV: '/driver',
  KUR: '/kurir',
  ADM: '/admin',
} as Record<string,string>

