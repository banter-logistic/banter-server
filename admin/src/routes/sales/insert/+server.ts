import { json, type RequestHandler } from "@sveltejs/kit";
import { Api } from "lib/api";

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json()
  const result = await Api.Barang.BarangInsert(data)
  return json(result);
};