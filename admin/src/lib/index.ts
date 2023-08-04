export const dateLog = () => {
  const t = new Date()
  t.setUTCHours( t.getUTCHours() + 7 )
  console.log(`[${t.toUTCString().split(' ').slice(0,5).join(' ')}]`)
}

export const logErr = (error: any) => {
  dateLog()
  console.log('\x1b[91m[SERVER ERR]\x1b[0m')
  console.error(error)
  console.log('\x1b[91m[/SERVER ERR]\x1b[0m')
}

export const Ok = <T>(data: T) => {
  return { success: true, data } satisfies Result<T>
}

export const None = <T = any>(msg: string) => {
  return { success: null, message: msg } satisfies Result<T>
}

export const Err = <T = any>(msg?: string, name?: string) => {
  return { success: false, error: { message: msg ?? 'Terjadi kesalahan, coba lagi', name: name ?? 'BAD_REQUEST' } } satisfies Result<T>
}

export const ServerErr = <T = any>(error: any) => {
  dateLog()
  console.log('[SERVER ERR]')
  console.error(error)
  console.log('[/SERVER ERR]')
  return { success: false, error: { message: 'Kesalahan Server, mohon coba beberapa saat lagi', name: 'SERVER_ERR' } } satisfies Result<T>
}

export function safeParseInt(val: any, fallback: number): number;
export function safeParseInt(val: any | undefined): Result<number>;
export function safeParseInt(val: any | undefined, fallback?: number): Result<number> | number {  
  if (val == null) return fallback ?? Err<number>()
  const i = parseInt(val)
  if (fallback)
    return isNaN(i) ? fallback : i
  return isNaN(i) ? Err<number>() : Ok(i)
}

/** make sure number has 2 digit */
const dp = (i: number) => {
  return `${i <= 9 ? 0 : ''}${i}`
}

export const date = (date?: ConstructorParameters<DateConstructor>[0]) => {
  const d = date ? new Date(date) : new Date()
  return {
    tanggal: d.getDate(),
    hari: _day[d.getDay()],
    bulan: _mon[d.getMonth()],
    tahun: d.getFullYear(),
    display:`${_day[d.getDay()]}, ${d.getDate()}-${_mon[d.getMonth()]}-${d.getFullYear()}`,
  }
}

export const date_compact = (date?: ConstructorParameters<DateConstructor>[0]) => {
  const d = date ? new Date(date) : new Date()
  const tanggal = dp(d.getDate())
  const hari = _daycomp[d.getDay()]
  const bulan = dp(_monidx[d.getMonth()])
  const tahun = d.getFullYear()
  return {
    tanggal,
    hari,
    bulan,
    tahun,
    display:`${hari}, ${tanggal}-${bulan}-${tahun}`,
  }
}

const _daylist = {
  Sun: 'Minggu',
  Mon: 'Senin',
  Tue: 'Selasa',
  Wed: 'Rabu',
  Thu: 'Kamis',
  Fri: 'Jumat',
  Sat: 'Sabtu',
}

const _day = Object.values(_daylist)

const _daycomplist = {
  Sun: 'Min',
  Mon: 'Sen',
  Tue: 'Sel',
  Wed: 'Rab',
  Thu: 'Kam',
  Fri: 'Jum',
  Sat: 'Sab',
}

const _daycomp = Object.values(_daycomplist)

const _monlist = {
  Jan: 'Januari',
  Feb: 'Februari',
  Mar: 'Maret',
  Apr: 'April',
  May: 'Mei',
  Jun: 'Juni',
  Jul: 'Juli',
  Aug: 'Agustus',
  Sep: 'September',
  Okt: 'Oktober',
  Nov: 'November',
  Dec: 'Desember',
}

const _monidxlist = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Okt: 10,
  Nov: 11,
  Dec: 12,
}

const _mon = Object.values(_monlist)
const _monidx = Object.values(_monidxlist)