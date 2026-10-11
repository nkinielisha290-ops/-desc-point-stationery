import { useEffect, useState } from 'react'
import { BUSINESS } from '../data/site'

// Inaangalia kama duka liko wazi kwa saa za Tanzania (EAT)
export function useOpenStatus() {
  const calc = () => {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Dar_es_Salaam' }))
    const d = now.getDay(), h = now.getHours() + now.getMinutes() / 60
    const { open, close, closedDay } = BUSINESS.hours
    return { open: d !== closedDay && h >= open && h < close }
  }
  const [s, setS] = useState(calc)
  useEffect(() => { const t = setInterval(() => setS(calc()), 60000); return () => clearInterval(t) }, [])
  return s
}
