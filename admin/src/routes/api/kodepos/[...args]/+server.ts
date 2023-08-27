import { json, type RequestHandler } from "@sveltejs/kit";
import data from "lib/dist/database2.json";

const provs = Object.keys(data)

const parse = (s: string) => {
  return s.replace(/-/g,' ').split(' ').map( e=> e[0].toUpperCase() + e.slice(1) ).join(' ')
}

export const GET: RequestHandler = async ({ params: { args } }) => {
  if (!args || args == '') {
    return json({ data: provs })
  }
  
  const params = args!.split('/')
  const len = params.length
  
  let out = data
  
  for (let i = 0; i < len; i++) {
    const elem = parse(params[i]);
    out = (out as any)[elem]
  }
  
  if (!out) {
    return json({ error: true, message: 'not found' })
  }
  
  return json({ data: typeof out == 'number' ? out : Object.keys(out) })
};
