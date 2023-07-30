import { readdir, readFile, writeFile } from "fs/promises";

const dirs = await readdir("lib/handler");
let urls = [];
let vars = {};
let i = 0;

for (const dir of dirs) {
  const data = await readFile("lib/handler/" + dir, "utf-8");

  /** @type {string[]} */
  const urliter = (data.match(/url: ['"]\S+['"]/g) ?? []).map((e) =>
    e.replace("url:", "").replace(/['"]/g, "").trim()
  );
  urls.push(...urliter);

  /** @type {string[]} */
  const variter = (data.match(/export const \w+/g) ?? []).map((e) =>
    e.replace("export const ", "")
  );

  vars[dir.replace(".js", "")] = variter; //Object.fromEntries(variter.map(e=>[e,0]))
}

web_api()

async function web_api() {
  
  await writeFile("lib/api.d.ts",`\
/* auto generated */
${Object.keys(vars).map( namesp => `import * as _${namesp} from "./handler/${namesp}.js"` ).join('\n')}
type zf<T extends Zod.Schema> = Zod.infer<T>;
function build<T extends { Input: any, Output: any }>(url: string):
  (data: T['Input'],Fetch?: typeof fetch) => Promise<Result<T['Output']>>;

export const Api: {
  ${Object.entries(vars)
    .map(
      ([namesp, types]) =>
        `${namesp}: {\n\t\t${types
          .map(type => `${type}: (i: zf<typeof _${namesp}['${type}']['Input']>) => Promise<Result<zf<typeof _${namesp}['${type}']['Output']>>>`)
          .join(",\n\t\t")}\n\t}`
    )
    .join(",\n\t")
  }
}

declare global {
  namespace api {
    ${Object.entries(vars)
      .map(
        ([namesp, types]) =>
          `namespace ${namesp} {\n\t\t${types
            .map(type => `\tnamespace ${type} {
\ \ \ \     type Input = zf<typeof _${namesp}['${type}']['Input']>
\ \ \ \     type Output = zf<typeof _${namesp}['${type}']['Output']>
\ \     }`).join("\n\t\t")}\n\t\t}`
      )
      .join("\n\t\t")
    }
  }
}
`,'utf-8');
  console.log('writing to lib/api.d.ts')
  i=0
  await writeFile("lib/api/index.js",`\
/* auto generated */
// const isBrowser = !(typeof window === 'undefined');
const host = 'http://localhost:4040'

function build(url) {
  return async (data,Fetch) => {
    try {
      const result = await (Fetch ?? fetch)(host + url,{
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
      }).then(e=>e.json())
      return result
    } catch (error) {
      console.error(error);
      return { success: false, error: { message: 'Kesalahan Server, mohon coba beberapa saat lagi', name: 'SERVER_ERR' } }
    }
  }
}

export const Api = {
  ${Object.entries(vars)
    .map(
      ([namesp, types]) =>
        `${namesp}: {\n\t\t${types
          .map(type => `${type}: build("${urls[i++]}")`)
          .join(",\n\t\t")}\n\t}`
    )
    .join(",\n\t")
  }
}`,'utf-8')
  console.log('writing to lib/api/index.js')
}


// function web_api() {
//   writeFile(
//     "lib/api/index.d.ts",
  
//     `${Object.entries(vars)
//       .map(([k, v]) => `import * as _${k} from "../handler/${k}.js"`)
//       .join("\n")}
  
//     type toZod<T> = T extends { Input: infer S, Output: infer T } ? { Input: Zod.infer<S>, Output: Zod.infer<T> } : never;
    
//     ${Object.entries(vars)
//       .map(([File, varsArr]) =>
//         varsArr
//           .map((v) => `export type ${v} = toZod<typeof _${File}['${v}']>`)
//           .join("\n")
//       )
//       .join("\n")}
//     `
//   );
  
// }

