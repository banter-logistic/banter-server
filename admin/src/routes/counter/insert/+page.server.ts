// import type { Action, Actions } from "@sveltejs/kit";
// import { alamat, barang, brdetail } from "lib/database/schema";
// import { fromQuerySafeParse } from "lib/util/query";
// import { setTimeout } from "timers/promises";
// import { Handle } from "lib/util";

// const alamatInsert = alamat.omit({ id: true })
// const barangInsert = barang.omit({ no_resi: true, alamat_id: true })
// const brdetailInsert = brdetail.omit({ no_resi: true })
// const insertZod = alamatInsert.extend( barangInsert.shape ).extend({ barang: brdetailInsert.array() })

// export const actions: Actions = {
//   insert: Handle<Action>(async ({ locals, request }) => {
//     const rawQuery = await request.formData();
//     const alamatQuery = fromQuerySafeParse(alamat.omit({ id: true }), rawQuery)
//     const barangQuery = fromQuerySafeParse(barang.omit({ no_resi: true, alamat_id: true }), rawQuery)
//     const brdetailQuery = rawQuery.getAll('nama').map( (nama,i) => ({ koli_ke: i + 1, nama: nama as string }) satisfies Zod.infer<typeof brdetailInsert> )
    
//     console.log({
//       alamatQuery, barangQuery, brdetailQuery
//     })
//     await setTimeout(100)
    
//     return new Response();
//   })
// };

