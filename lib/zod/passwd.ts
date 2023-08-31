

export const repetition = (s: string) => {
  const len = s.length
  
  let pow: number = 0
  let last: number = 0
  
  // repetition
  for (let i = 0; i < len; i++) {
    if (pow >= 4) {
      return false
    }
    
    const c = s.charCodeAt(i)
    if (c - 1 == last) {
      pow++
    } else if (c == last) {
      pow++
    } else {
      pow = 0
    }
    last = c
  }
  return true
}
export const reserved = (e: string) => !(/[<>';]/.test(e))