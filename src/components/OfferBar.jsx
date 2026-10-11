import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Flame, X } from 'lucide-react'
import { OFFERS } from '../data/site'
import { useApp } from '../lib/store'
import { useCountdown } from '../lib/countdown'

// Utepe wa ofa chini ya hero: unaonyesha muda uliobaki
export default function OfferBar() {
  const { t, x } = useApp()
  const [hidden, setHidden] = useState(false)
  const { d, h, m, s } = useCountdown(OFFERS[0]?.endsAt)
  const pad = (n) => String(n).padStart(2, '0')
  if (!OFFERS.length) return null
  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div exit={{ height: 0, opacity: 0 }} className="relative z-10 overflow-hidden bg-gradient-to-r from-rose-600 via-rose-500 to-gold-500 text-white">
          <div className="container-x flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2.5 pr-10 text-center text-sm font-semibold">
            <span className="flex items-center gap-1.5"><Flame className="h-4 w-4 animate-pulse" /> {t('Ofa za wiki:', 'This week:')} {x(OFFERS[0].title)} — {x(OFFERS[0].badge)}</span>
            <span className="rounded-full bg-black/20 px-3 py-0.5 font-mono tabular-nums" aria-label={t('Muda uliobaki', 'Time left')}>
              {d > 0 && `${d}${t('s', 'd')} `}{pad(h)}:{pad(m)}:{pad(s)}
            </span>
            <a href="#ofa" className="underline decoration-2 underline-offset-4 hover:no-underline">{t('Ona ofa zote →', 'See all offers →')}</a>
          </div>
          <button onClick={() => setHidden(true)} aria-label={t('Funga', 'Close')} className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full hover:bg-black/20"><X className="h-4 w-4" /></button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
