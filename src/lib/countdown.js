import { useEffect, useState } from 'react'

const EAT = 3 * 3600e3 // Tanzania ni UTC+3

// Jumamosi ijayo saa 2:00 usiku (20:00 EAT) — ofa zinajirudia kila wiki
export function nextWeeklyDeadline(now = Date.now()) {
  const eat = new Date(now + EAT)
  const daysUntilSat = (6 - eat.getUTCDay() + 7) % 7
  let target = Date.UTC(eat.getUTCFullYear(), eat.getUTCMonth(), eat.getUTCDate() + daysUntilSat, 20) - EAT
  if (target <= now) target += 7 * 864e5
  return target
}

export function useCountdown(endsAt) {
  const target = endsAt ? new Date(endsAt).getTime() : null
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id) }, [])
  const end = target && target > now ? target : nextWeeklyDeadline(now)
  const left = Math.max(0, end - now)
  return {
    d: Math.floor(left / 864e5),
    h: Math.floor((left % 864e5) / 36e5),
    m: Math.floor((left % 36e5) / 6e4),
    s: Math.floor((left % 6e4) / 1e3),
  }
}
