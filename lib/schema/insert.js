/* auto generated */

export const BarangInsert = z.object({

	alamat: z.string(),
	kelurahan: z.string(),
	kecamatan: z.string(),
	kota: z.string(),
	provinsi: z.string(),
	kodepos: z.number(),
	pengirim: z.string(),
	penerima: z.string(),
	nohp_penerima: z.string(),
	berat: z.number(),
	volume: z.number(),
	total_koli: z.number(),
})

export const Barang_DetailInsert = z.object({
	barang_id: z.number(),
	koli_ke: z.number(),
	nama_barang: z.string(),
})

export const Barang_ManifestInsert = z.object({
	manifest_id: z.number(),
	barang_id: z.number(),
	keterangan: z.string(),
})

export const CustomerInsert = z.object({

	nama: z.string(),
	nohp: z.string(),
	alamat: z.string(),

})

export const DriverInsert = z.object({
	driver_id: z.number(),
	nama: z.string(),
	no_hp: z.string(),
	plat_nomor: z.string(),
	kubikase: z.number(),

	jenis_kendaraan: z.string(),
	tipe: z.string(),
})

export const ManifestInsert = z.object({


	driver_id: z.number(),
	aktif: z.number(),
})

export const PosInsert = z.object({

	nama_pos: z.string(),
	alamat: z.string(),

	tipe: z.string(),
})

export const SalesInsert = z.object({
	sales_id: z.number(),
	nama: z.string(),

	pos_id: z.number(),
})

export const SessionInsert = z.object({
	session_id: z.string(),

	user_id: z.number(),
})

export const TracingInsert = z.object({

	barang_id: z.number(),
	tipe: z.string(),
	subjek: z.number(),

	aktif: z.number(),
})

export const UserInsert = z.object({

	username: z.string(),
	passwd: z.string(),
	tipe: z.string(),
})
