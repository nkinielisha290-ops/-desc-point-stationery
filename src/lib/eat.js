// Tarehe na saa kwa saa za Tanzania (EAT, UTC+3), bila kutegemea saa ya simu ya mteja
const EAT_MS = 3 * 3600e3

// "Sasa" kama tarehe ya EAT (sehemu za UTC zinawakilisha saa za Tanzania)
export const nowEAT = () => new Date(Date.now() + EAT_MS)

export const ymd = (d) => d.toISOString().slice(0, 10)

// Siku zijazo za kazi (Jumatatu–Jumamosi), kuanzia leo
export function workDays(count = 14, closedDay = 0) {
  const out = []
  const d = nowEAT()
  d.setUTCHours(0, 0, 0, 0)
  while (out.length < count) {
    if (d.getUTCDay() !== closedDay) out.push(new Date(d))
    d.setUTCDate(d.getUTCDate() + 1)
  }
  return out
}

// Nafasi za dakika 30 kati ya kufungua na kufunga
export function slots(open = 8, close = 20, step = 30) {
  const out = []
  for (let m = open * 60; m <= close * 60 - step; m += step) out.push(`${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`)
  return out
}

// Je, nafasi hii ya leo imeshapita? (pamoja na dakika 30 za maandalizi)
export function isPast(dateStr, hhmm) {
  const now = nowEAT()
  if (dateStr !== ymd(now)) return false
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m < now.getUTCHours() * 60 + now.getUTCMinutes() + 30
}

// Saa 24 → "saa 2:30 asubuhi" (saa za Kiswahili)
export function swTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  const sw = ((h + 6) % 12) || 12
  const part = h < 12 ? 'asubuhi' : h < 16 ? 'mchana' : h < 19 ? 'jioni' : 'usiku'
  return `saa ${sw}:${String(m).padStart(2, '0')} ${part}`
}

// Faili la kalenda (.ics) — mteja analiongeza kwenye kalenda ya simu
export function icsFile({ title, description, location, dateStr, hhmm, minutes = 30 }) {
  const [y, mo, d] = dateStr.split('-').map(Number)
  const [h, m] = hhmm.split(':').map(Number)
  const start = new Date(Date.UTC(y, mo - 1, d, h, m) - EAT_MS)
  const end = new Date(start.getTime() + minutes * 60e3)
  const f = (dt) => dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const esc = (s) => String(s).replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n')
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Desc Point Stationery//Miadi//SW', 'BEGIN:VEVENT',
    `UID:${f(start)}-${Math.random().toString(36).slice(2)}@descpoint`, `DTSTAMP:${f(new Date())}`,
    `DTSTART:${f(start)}`, `DTEND:${f(end)}`, `SUMMARY:${esc(title)}`, `DESCRIPTION:${esc(description)}`, `LOCATION:${esc(location)}`,
    'BEGIN:VALARM', 'TRIGGER:-PT60M', 'ACTION:DISPLAY', `DESCRIPTION:${esc(title)}`, 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')
}
