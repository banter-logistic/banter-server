
const str = [33,127]
const char = [97,123]
const vocal = [97,101,105,111,117]
const hex = '0123456789abcdef'.split('')

export const arr = <T>(len: number,each: (i:number) => T) => Array(len).fill(0).map((_,i)=>each(i))

/** random integer */
export const rand = (min=0,max=10) => Math.floor(Math.random() * (max - min)) + min
/** random array */
export const randAr = <T>(arr: T[]) => arr[rand(0,arr.length)]

/** random char and symbol */
export const randSt = () => String.fromCharCode(rand(str[0],str[1]))
/** random char */
export const randCh = () => String.fromCharCode(rand(char[0],char[1]))
/** random characters */
export const randCs = (len=4) => arr(len,randCh).join('')
/** random char uppercase */
export const randChu = () => String.fromCharCode(rand(char[0],char[1])).toUpperCase()
/** random characters uppercase */
export const randCsu = (len=4) => arr(len,randChu).join('')

/** random vocal */
export const randVo = () => 'aiueo'[rand(0,5)]
/** random nonvocal */
export const randCo = () => {
  let a
  do {
    a = rand(char[0],char[1])
  } while (vocal.includes(a));
  return String.fromCharCode(a)
}

const patterns = [
  [1,1,0,1],
  [1,0,1,0],
  [0,1,0,1],
  [1,0,0,1],
  [0,1,1,0],
  [1,0,0],
  [0,1,0],
  [0,0,1],
  [1,0,1],
  [1,1,0],
  [0,1,1],
]

/** random word */
export const randWo = () => patterns[rand(0,patterns.length)].map(e=>e?randCo():randVo()).join('')
/** random line */
export const randLi = (count=15) => arr(count, ()=>randAr(patterns).map(e=>e?randCo():randVo()).join('')).join(' ')
/** random rupiah */
export const randRp = () => parseInt(`${rand(1,300)}${rand(0,9)}00`)
/** random dollar */
export const randDo = () => rand(0,100)
/** random hex color */
export const randHx = () => arr(6,()=>randAr(hex)).join('')