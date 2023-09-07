const dp = (i: number) => i < 10 ? `0${i}` : i

export const date = (date?: ConstructorParameters<DateConstructor>[0]) => {
  const d = date ? new Date(date) : new Date()
  return {
    tanggal: d.getDate(),
    hari: _day[d.getDay()],
    bulan: _mon[d.getMonth()],
    tahun: d.getFullYear(),
    display:`${_day[d.getDay()]}, ${d.getDate()} ${_mon[d.getMonth()]} ${d.getFullYear()}`,
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
