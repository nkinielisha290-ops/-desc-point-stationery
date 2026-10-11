import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, ShoppingBag, CheckCircle2, Smartphone, X } from 'lucide-react'
import { BUSINESS, waLink } from '../data/site'
import { useApp } from '../lib/store'

export default function Floating() {
  const { t, count, setCartOpen, toast, canInstall, install } = useApp()
  const [skip, setSkip] = useState(false)
  return (
    <>
      <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:right-5" style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <AnimatePresence>
          {count > 0 && (
            <motion.button initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0 }} onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 rounded-full bg-navy-900 px-5 py-3 font-semibold text-white shadow-2xl ring-2 ring-gold-400">
              <ShoppingBag className="h-5 w-5 text-gold-400" /> {t('Cart', 'Cart')} ({count})
            </motion.button>
          )}
        </AnimatePresence>
        <motion.a href={waLink(t(`Habari ${BUSINESS.name}!`, `Hello ${BUSINESS.name}!`))} target="_blank" rel="noreferrer" aria-label="WhatsApp"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: 'spring' }}
          className="relative grid h-16 w-16 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-600/40">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
          <MessageCircle className="relative h-8 w-8" />
        </motion.a>
      </div>

      {/* Kadi ya kuweka App (simu) */}
      <AnimatePresence>
        {canInstall && !skip && (
          <motion.div initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 120, opacity: 0 }} transition={{ delay: 4, type: 'spring', damping: 22 }}
            className="fixed bottom-4 left-4 right-24 z-40 flex items-center gap-3 rounded-2xl bg-navy-950 p-3 pr-2 text-white shadow-2xl ring-1 ring-gold-400/40 sm:right-auto sm:w-80 xl:hidden"
            style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}>
            <img src="/logo.png" alt="" className="h-11 w-11 shrink-0 rounded-xl" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold leading-tight">{t('Weka Desc Point kwenye simu', 'Get the Desc Point app')}</p>
              <p className="text-[11px] text-white/60">{t('Haraka, hata mtandao ukiwa dhaifu', 'Fast, even on a weak connection')}</p>
            </div>
            <button onClick={install} className="flex shrink-0 items-center gap-1 rounded-full bg-gold-400 px-3 py-2 text-xs font-bold text-navy-950"><Smartphone className="h-3.5 w-3.5" /> {t('Weka', 'Install')}</button>
            <button onClick={() => setSkip(true)} aria-label={t('Funga', 'Close')} className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/50 hover:text-white"><X className="h-4 w-4" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast ya taarifa fupi */}
      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[95] flex justify-center px-4" aria-live="polite">
        <AnimatePresence>
          {toast && (
            <motion.div key={toast.id} initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-2 rounded-full bg-navy-950 px-5 py-3 text-sm font-medium text-white shadow-2xl ring-1 ring-gold-400/50">
              <CheckCircle2 className="h-4 w-4 text-gold-400" /> {toast.msg}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
