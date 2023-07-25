/** @typedef {import("express").Handler} Handler */

/** @type {Handler} */
export const logger = (req,_,next)=>{
  const date = new Date()
  const m = date.getMinutes(), s = date.getSeconds()
  const time = "[" + (m < 10 ? '0' : '') + m + ":" + (s < 10 ? '0' : '') + s + "]"
  console.log(time, req.method.toUpperCase(), req.path)
  next()
}

/** @type {Handler} */
export const verbose_logger = (req,_,next)=>{
  const a = req.body
  console.log("[BODY]", a)
  next()
}

/** @type {Handler} */
export const cors = (_,res,next)=>{
  res.setHeader('access-control-allow-origin','*')
  .setHeader('access-control-allow-method','*')
  .setHeader('access-control-allow-headers','*')
  .setHeader('Access-Control-Allow-Content-Type','application/json')
  next()
}
