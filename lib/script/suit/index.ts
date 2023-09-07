import { arr, rand, randAr, randCh, randChu, randCs, randCsu, randLi, randWo } from "../../faker";

const w5 = () => randCsu(5)
const rl = () => randLi(rand(3, 7))

export const Master = {
  airline: arr(rand(20,30), i => ({
    id: i,
    Name: rl(),
    "Airline Code": rand(1,400),
    "Carrier Code": randCsu(2),
    "Other Code": randCsu(3),
    "Country": randWo(),
    "IATA": randAr(['-','true'])
  })),
  
  "airline-schedule": arr(rand(20,30), i => ({
    id: i,
    departure: w5(),
    destination: w5(),
    airline: rl(),
  })),
  
  "chart-of-account": arr(rand(20,30), i => ({
    "COA Code": rand(1000,2000),
    "COA Description": rl(),
    "Group Name": randWo(),
    "General": randAr(['N','Y']),
    "Prefix IN": randCsu(8),
    "Prefix OUT": randCsu(8),
  })),
  
  "container": arr(rand(20,30), i => ({
    "Container ID": i,
    "Container": randAr(["Dry","High Cube","Open Top"]),
    "Size": rand(20,80)
  })),
  
  "currency": arr(rand(20,30), i => ({
    "Currency ID": i,
    Currency: randCs(5)
  })),
  
  "invoice": arr(rand(20,30), i => ({
    "Invoice Term": randCsu(3)
  })),
  
  "kpbc": arr(rand(20,30), i => Object.fromEntries( arr(10, i => [randWo(),randLi(6)]) )),
  
  "pib-peb": arr(rand(20,30), i => ({
    "PIB / PEB No": `${arr(5,()=>rand()).join('')}-${arr(5,()=>rand()).join('')}`,
    "Group": `${arr(3,randChu).join('')}-${arr(3,randChu).join('')}-${arr(3,randChu).join('')}-${arr(5,randChu).join('')}`
  })),
  
  "port": arr(rand(20,30), i => ({
    "Port ID": i,
    "Port Name": randWo(),
    "Port Code": randLi(rand(1,6)),
    "City Code": randLi(rand(1,6)),
    "Country": randLi(rand(1,6)),
    "City": randLi(rand(1,6)),
    "Type": randCsu(3),
  }))
}