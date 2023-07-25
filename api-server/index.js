// @ts-check
import express from "express";
import mid from "body-parser";
import "./internal/config.js";
import "./internal/db.js"
import { cors, logger } from "./internal/middleware.js";

// @ts-ignore
global.app = express()

const PORT = process.env.CONTROLLERPORT ?? 4040

app.use(mid.json())

if (process.env.ENVIRONMENT == 'development') {
  app.use(cors)
}

app.use(logger);

await import("lib/api/express.js")

app.all('*',(req,res)=>res.json({ success: false, error: 'endpoint not found' }))

process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT_ERR]',err)
})


const server = app.listen(PORT,()=>console.log(`Listening in http://localhost:${PORT}...`))
console.log("pid",process.pid)

process.on('SIGINT',e=>{
  console.log('closing server...')
  pool.end()
  server.closeIdleConnections()
  server.closeAllConnections()
  server.close(async ()=>{
    process.exit()
  })
})
