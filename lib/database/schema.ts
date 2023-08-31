/** auto generated */
import { z } from 'zod';
const o = z.object;
const s = z.string();
const i = z.number();
export type admin = {admin_id: number,admin_dibuat: Date,admin_level: number,};export const admin = o({admin_id: i,admin_dibuat: z.date(),admin_level: i,});export type alamat = {alamat_id: number,alamat_detail: string,alamat_kelurahan: string,alamat_kecamatan: string,alamat_kabupaten: string,alamat_provinsi: string,alamat_kodepos: string,};export const alamat = o({alamat_id: i,alamat_detail: s,alamat_kelurahan: s,alamat_kecamatan: s,alamat_kabupaten: s,alamat_provinsi: s,alamat_kodepos: s,});export type barang = {barang_no_resi: number,barang_kode: string,barang_alamat_id: number,barang_total_koli: number,barang_pengirim: string,barang_pengirim_id: number,barang_penerima: string,barang_penerima_id: number,barang_nohp_penerima: string,barang_berat: number,barang_panjang: number,barang_tinggi: number,barang_lebar: number,};export const barang = o({barang_no_resi: i,barang_kode: s,barang_alamat_id: i,barang_total_koli: i,barang_pengirim: s,barang_pengirim_id: i,barang_penerima: s,barang_penerima_id: i,barang_nohp_penerima: s,barang_berat: i,barang_panjang: i,barang_tinggi: i,barang_lebar: i,});export type brdetail = {brdetail_no_resi: number,brdetail_nama: string,brdetail_koli_ke: number,};export const brdetail = o({brdetail_no_resi: i,brdetail_nama: s,brdetail_koli_ke: i,});export type brmanifest = {brmanifest_barang_id: number,brmanifest_manifest_id: number,};export const brmanifest = o({brmanifest_barang_id: i,brmanifest_manifest_id: i,});export type driver = {driver_id: number,driver_plat_nomor: string,driver_kubikase: number,driver_jenis_kendaraan: string,driver_tipe: string,};export const driver = o({driver_id: i,driver_plat_nomor: s,driver_kubikase: i,driver_jenis_kendaraan: s,driver_tipe: s,});export type manifest = {manifest_id: number,manifest_kode: string,manifest_subjek: number,manifest_aktif: number,manifest_dibuat: Date,};export const manifest = o({manifest_id: i,manifest_kode: s,manifest_subjek: i,manifest_aktif: i,manifest_dibuat: z.date(),});export type operator = {operator_id: number,operator_pos_id: number,};export const operator = o({operator_id: i,operator_pos_id: i,});export type pelanggan = {pelanggan_id: number,pelanggan_alamat_id: number,};export const pelanggan = o({pelanggan_id: i,pelanggan_alamat_id: i,});export type pos = {pos_id: number,pos_nama: string,pos_alamat_id: number,pos_tipe: string,pos_dibuat: Date,};export const pos = o({pos_id: i,pos_nama: s,pos_alamat_id: i,pos_tipe: s,pos_dibuat: z.date(),});export type sales = {sales_id: number,sales_pos_id: number,};export const sales = o({sales_id: i,sales_pos_id: i,});export type tracing = {tracing_id: number,tracing_status: string,tracing_subjek: number,tracing_dibuat: Date,tracing_aktif: number,tracing_barang_id: number,};export const tracing = o({tracing_id: i,tracing_status: s,tracing_subjek: i,tracing_dibuat: z.date(),tracing_aktif: i,tracing_barang_id: i,});export type user = {user_id: number,user_kode: string,user_username: string,user_nohp: string,user_nama: string,user_passwd: string,user_dibuat: Date,};export const user = o({user_id: i,user_kode: s,user_username: s,user_nohp: s,user_nama: s,user_passwd: s,user_dibuat: z.date(),});export type Schema = { admin: admin,alamat: alamat,barang: barang,brdetail: brdetail,brmanifest: brmanifest,driver: driver,manifest: manifest,operator: operator,pelanggan: pelanggan,pos: pos,sales: sales,tracing: tracing,user: user };
