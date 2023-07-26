import { Api } from "lib/api";
import { formData } from "$lib";

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await formData(request)
    
    // cek apakah form diisi
    if (!data.username || !data.password) {
      return { success: false, pesan: 'username dan password diperlukan' }
    }
    
    // panggil api
    const result = await Api.Auth.Login({ username: data.username, passwd: data.password })
    
    // username password salah
    if (result.success == null) {
      return { success: false, pesan: 'username atau password salah' }
    }
    
    // server error
    if (result.success == false) {
      return { success: false, pesan: 'server error, coba lagi' }
    }
    
    // login berhasil
    return { success: true, data: result.data.type }
  }
};