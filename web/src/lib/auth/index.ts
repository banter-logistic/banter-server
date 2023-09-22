import type { RequestEvent } from "@sveltejs/kit";


export interface User {
  isLoggedin: boolean
  email: string
}

interface Db {
  password: string
}

import { readFile, writeFile } from "fs/promises";

const localDb = JSON.parse(await readFile('src/lib/auth/db.json','utf-8')) as [string,Db][]

function getDb(key: string): Db | null {
  return localDb.find(e=>e[0] === key)?.[1] ?? null
}

async function setDb(key: string, val: Db) {
  localDb.push([key,val])
  await writeFile('src/lib/auth/db.json',JSON.stringify(localDb))
}

export async function login(event: RequestEvent) {
  
  const { email, password: inputPassword } = Object.fromEntries(await event.request.formData()) as any
  
  const data = getDb(email)
  
  if (!data) return false
  
  const { password } = data
  
  if (password !== inputPassword) return false
  
  const auth = {
    isLoggedin: true,
    email,
  } satisfies User
  
  event.cookies.set('sessionId',JSON.stringify(auth))
  
  return true
}

export function logout(event: RequestEvent) {
  console.log('oof')
  event.cookies.delete('sessionId')
}

export async function register(event: RequestEvent) {
  try {
    const { email, password, confirmPassword } = Object.fromEntries(await event.request.formData()) as any
    
    if (password !== confirmPassword) {
      return { error: 'konfirmasi password tidak sama' }
    } else {
      
    }
    
    await setDb(email,{
      password
    })
    return { error: null }
  } catch (error: any) {
    console.error(error)
    return { error: (error as Error).message }
  }
}

export function loadAuth(event: RequestEvent): User {
  try {
    const cookie = event.cookies.get('sessionId')
    
    if (!cookie) throw ''
    
    const session = JSON.parse(cookie) as User
    
    return session
  } catch (error) {
    return {
      isLoggedin: false,
      email: ''
    }
  }
  
}