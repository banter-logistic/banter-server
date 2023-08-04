import { error, type Actions } from "@sveltejs/kit";
import { Api } from "lib/api";

export const actions: Actions = {
  default: async ({ request, locals: { auth } }) => {
    const form = await request.formData()
    const parse = (i: string) => {
      console.log(i, form.get(i))
      if (isNaN(parseInt(form.get(i)! as string))) 
        throw error(404, { message: 'Kesalahan data', code: 'BAD_REQUEST' })
      else
        return parseInt(form.get(i)! as string)
    }
    const get = (i: string) => form.get(i)! as string
    
    const data: api.Barang.BarangInsert.Input = {
      alamat: get('alamat'),
      berat: parse('berat'),
      user_id: auth.user_id,
      kecamatan: get('kecamatan'),
      kelurahan: get('kelurahan'),
      kodepos: parse('kodepos'),
      kota: get('kota'),
      nohp_penerima: get('no_hp'),
      penerima: get('penerima'),
      pengirim: get('pengirim'),
      provinsi: get('provinsi'),
      total_koli: parse('total_koli'),
      volume: parse('volume'),
      barang_details: Array(parse('total_koli')).fill(0).map( (_,i) =>{ return { koli_ke: i + 1, nama_barang: get(`nama_${i+1}`) } })
    }
    console.log('end',data)
    return await Api.Barang.BarangInsert(data)
  }
};