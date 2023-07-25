import { readFileSync,  } from "fs";
import { z } from "zod";

/** @type {any} */
let env = ''

// bottom have priority
try { env +=  readFileSync('../.env','utf-8') + '\n' } catch (_) { }
try { env += readFileSync('./.env','utf-8') + '\n' } catch (_) { }
try { env += readFileSync('./api-server/.env','utf-8') + '\n' } catch (_) { }

env = parseEnv(env);

const er = (k) => ({ required_error: k + ' env diperlukan'})

export const envSchema = z.object({
  DBUSERNAME: z.string(er('DBUSERNAME')),
  DBPASSWORD: z.string(er('DBPASSWORD')),
  DBNAME: z.string(er('DBNAME')),
  
  DBURL: z.string().optional(),
  DBSOCKET: z.string().optional(),
  CONTROLLERPORT: z.string().optional(),
  ENVIRONMENT: z.string().default('production'),
})


const envs = envSchema.safeParse(env)

if (!envs.success) {
  console.error('[ENV ERROR]')
  const f = envs.error.format()
  Object.entries(f).forEach(([k,v])=>{
    if ("_errors" in v) {
      console.error(v._errors[0])
    }
  })
  console.log("Terminating...")
  process.exit(1)
}

if (!envs.data.DBURL && !envs.data.DBSOCKET) {
  console.error("salah satu DBURL atau DBSOCKET diperlukan")
  console.error("untuk cek mysql socket")
  console.error("$ mariadb-admin -p -u deuzo variables | grep \" socket \"")
  console.log("Terminating...")
  process.exit(1)
}

console.log('Environment: ' + envs.data.ENVIRONMENT)

Object.entries(envs.data).forEach(([k,v])=>{
  process.env[k.trim()] = v.trim()
})

function parseEnv(envContent) {
  return Object.fromEntries(envContent.split('\n').map((line)=>{
    if (!line.includes('=')) return
    const [k,v] = line.split('=')
    return [k.trim(),v.trim()]
  }).filter(Boolean))
}