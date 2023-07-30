/* auto generated */

export const BarangSchema = z.object({
	no_resi: z.number(),
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
	total_koli: z.number()
})

export const Barang_DetailSchema = z.object({
	barang_id: z.number(),
	koli_ke: z.number(),
	nama_barang: z.string()
})

export const Barang_ManifestSchema = z.object({
	manifest_id: z.number(),
	barang_id: z.number(),
	keterangan: z.string()
})

export const CustomerSchema = z.object({
	customer_id: z.number(),
	nama: z.string(),
	nohp: z.string(),
	alamat: z.string(),
	dibuat: z.date()
})

export const DriverSchema = z.object({
	driver_id: z.number(),
	nama: z.string(),
	no_hp: z.string(),
	plat_nomor: z.string(),
	kubikase: z.number(),
	dibuat: z.date(),
	jenis_kendaraan: z.string(),
	tipe: z.string()
})

export const ManifestSchema = z.object({
	manifest_id: z.number(),
	dibuat: z.date(),
	driver_id: z.number(),
	aktif: z.number()
})

export const PosSchema = z.object({
	pos_id: z.number(),
	nama_pos: z.string(),
	alamat: z.string(),
	dibuat: z.date(),
	tipe: z.string()
})

export const SalesSchema = z.object({
	sales_id: z.number(),
	nama: z.string(),
	dibuat: z.date(),
	pos_id: z.number()
})

export const SessionSchema = z.object({
	session_id: z.string(),
	exp: z.string(),
	user_id: z.number()
})

export const TracingSchema = z.object({
	tracing_id: z.number(),
	barang_id: z.number(),
	tipe: z.string(),
	subjek: z.number(),
	dibuat: z.date(),
	aktif: z.number()
})

export const UserSchema = z.object({
	user_id: z.number(),
	username: z.string(),
	passwd: z.string(),
	tipe: z.string()
})
