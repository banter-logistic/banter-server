import { json, type RequestHandler } from "@sveltejs/kit";
import data from "lib/dist/database2";

const provs = Object.keys(data)

const parse = (s?: string) => {
  return s?.replace(/-/g,' ').split(' ').map( e=> e[0].toUpperCase() + e.slice(1) ).join(' ')
}

export const GET: RequestHandler = async ({ params: { args } }) => {
  try {
    if (!args || args == '') {
      return json({ data: provs })
    }
    
    const params = args!.split('/')
    const len = params.length
    
    let out = data
    
    for (let i = 0; i < len; i++) {
      const elem = parse(params[i]);
      if (!elem) break
      out = (out as any)[elem]
    }
    
    if (!out) {
      return json({ error: true, message: 'not found', data: [] })
    }
    
    return json({ data: typeof out == 'number' ? out : Object.keys(out) })
  } catch (error) {
    return json({ error: true, message: 'not found', data: [] })
  }
};
