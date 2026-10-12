import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus, MessageCircle, ShoppingBag, Trash2, FileText, Copy, Check } from 'lucide-react'
import { BUSINESS, waLink } from '../data/site'
import { useApp, newOrderId } from '../lib/store'
import { SafeImg, tsh } from './ui'

export default function OrderDrawer() {
  const { t, x, items, total, setQty, clear, cartOpen: open, setCartOpen, rememberOrder, notify } = useApp()
  const [name, setName] = useState('')
  const [place, setPlace] = useState('')
  const [sent, setSent] = useState(null)
  const onClose = () => setCartOpen(false)

  useEffect(() => {
    if (!open) return
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [open])

  const groups = [
    ['product', t('BIDHAA', 'PRODUCTS')],
    ['service', t('HUDUMA', 'SERVICES')],
    ['print', t('PRINTING (FAILI)', 'PRINTING (FILES)')],
    ['design', t('DESIGN', 'DESIGN')],
  ]

  const send = () => {
    const id = newOrderId()
    const lines = groups.map(([k, label]) => {
      const g = items.filter((i) => (i.kind || 'product') === k)
      if (!g.length) return ''
      return `*${label}*\n` + g.map((i) => `• ${x(i.name)} — ${i.qty} ${x(i.unit) || ''} × ${tsh(i.price)} = ${tsh(i.qty * i.price)}${i.meta ? `\n   ↳ ${x(i.meta)}` : ''}`).join('\n') + '\n\n'
    }).join('')
    const msg =
      t(`Habari ${BUSINESS.name}! Naomba kuagiza:\n\n`, `Hello ${BUSINESS.name}! I'd like to order:\n\n`) +
      `🧾 ${t('Namba ya oda', 'Order no.')}: *${id}*\n\n` + lines +
      `*${t('JUMLA', 'TOTAL')}: ${tsh(total)}*\n\n` +
      `${t('Jina', 'Name')}: ${name || '-'}\n${t('Mahali', 'Location')}: ${place || '-'}` +
      (items.some((i) => i.kind === 'print') ? `\n\n📎 ${t('Nitatuma faili hapa chini.', 'I will attach the file(s) below.')}` : '')
    rememberOrder({ id, total, date: new Date().toISOString(), count: items.length })
    setSent({ id, link: waLink(msg) })
    window.open(waLink(msg), '_blank', 'noopener')
  }

  const copyId = async () => {
    try { await navigator.clipboard.writeText(sent.id); notify(t('Namba imenakiliwa', 'Number copied')) } catch { /* chagua kwa mkono */ }
  }

  const finish = () => { clear(); setSent(null); onClose() }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-[80] bg-navy-950/60" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside role="dialog" aria-modal="true" aria-label={t('Cart yako', 'Your cart')}
            className="fixed bottom-0 right-0 top-0 z-[90] flex w-full max-w-md flex-col bg-canvas shadow-2xl"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 260 }}>
            <div className="flex items-center justify-between bg-navy-950 px-6 py-5 text-white" style={{ paddingTop: 'max(1.25rem, env(safe-area-inset-top, 0px))' }}>
              <div>
                <p className="text-xs font-bold sm:text-sm text-gold-300">{t('Cart yako', 'Your cart')}</p>
                <p className="font-display text-2xl font-bold">{items.length} {t('vitu', 'items')}</p>
              </div>
              <button onClick={onClose} aria-label={t('Funga', 'Close')} className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><X className="h-5 w-5" /></button>
            </div>

            {sent ? (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="grid h-20 w-20 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-10 w-10" />
                </motion.div>
                <h3 className="mt-6 font-display text-2xl font-bold">{t('Oda imeandaliwa!', 'Order prepared!')}</h3>
                <p className="mt-2 text-ink/65">{t('Hifadhi namba hii kufuatilia oda yako:', 'Keep this number to track your order:')}</p>
                <button onClick={copyId} className="mt-4 flex select-all items-center gap-2 rounded-2xl bg-surface px-5 py-3 font-display text-xl font-bold tracking-wide ring-2 ring-gold-400">
                  {sent.id} <Copy className="h-4 w-4 text-gold-600" />
                </button>
                <p className="mt-4 max-w-xs text-sm text-ink/60">{t('WhatsApp haikufunguka? Bonyeza hapa chini kutuma tena.', 'WhatsApp didn’t open? Tap below to send again.')}</p>
                <a href={sent.link} target="_blank" rel="noreferrer" className="btn-gold mt-4"><MessageCircle className="h-5 w-5" /> {t('Fungua WhatsApp', 'Open WhatsApp')}</a>
                <a href="#fuatilia" onClick={finish} className="mt-3 text-sm font-semibold text-royal-500 hover:underline">{t('Fuatilia oda →', 'Track order →')}</a>
                <button onClick={finish} className="mt-6 text-sm text-ink/50 hover:text-ink">{t('Maliza na safisha cart', 'Done, clear cart')}</button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto p-5">
                  {items.length === 0 && (
                    <div className="flex h-full flex-col items-center justify-center text-center text-ink/50">
                      <ShoppingBag className="h-14 w-14 text-gold-500" />
                      <p className="mt-4">{t('Bado hujaongeza kitu.', 'Your cart is empty.')}</p>
                      <a href="#bidhaa" onClick={onClose} className="btn-gold mt-6">{t('Tazama bidhaa', 'Browse products')}</a>
                    </div>
                  )}
                  <AnimatePresence initial={false}>
                    {items.map((i) => (
                      <motion.div layout key={i.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40, height: 0 }}
                        className="card flex items-center gap-3 p-3">
                        {i.img ? <SafeImg src={i.img} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                          : <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-navy-900 text-gold-300"><FileText className="h-7 w-7" /></span>}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{x(i.name)}</p>
                          {i.meta && <p className="truncate text-[11px] text-ink/50">{x(i.meta)}</p>}
                          <p className="text-xs text-ink/50">{tsh(i.price)} / {x(i.unit)}</p>
                          <p className="text-sm font-bold text-royal-500">{tsh(i.price * i.qty)}</p>
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-ink/5 p-1">
                          <button onClick={() => setQty(i.id, i.qty - 1)} className="grid h-8 w-8 place-items-center rounded-full bg-surface" aria-label={t('Punguza', 'Decrease')}>
                            {i.qty === 1 ? <Trash2 className="h-3 w-3 text-rose-500" /> : <Minus className="h-3 w-3" />}
                          </button>
                          <span className="w-6 text-center text-sm font-bold tabular-nums">{i.qty}</span>
                          <button onClick={() => setQty(i.id, i.qty + 1)} className="grid h-8 w-8 place-items-center rounded-full bg-surface" aria-label={t('Ongeza', 'Increase')}><Plus className="h-3 w-3" /></button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {items.length > 0 && (
                  <div className="border-t border-ink/10 bg-surface p-5" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom, 0px))' }}>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="sr-only" htmlFor="cart-name">{t('Jina lako', 'Your name')}</label>
                      <input id="cart-name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('Jina lako', 'Your name')} className="rounded-xl bg-ink/5 px-3 py-2.5 text-sm outline-none ring-gold-400 focus:ring-2" />
                      <label className="sr-only" htmlFor="cart-place">{t('Mahali', 'Location')}</label>
                      <input id="cart-place" value={place} onChange={(e) => setPlace(e.target.value)} placeholder={t('Mahali (mf. Madafu)', 'Location (e.g. Madafu)')} className="rounded-xl bg-ink/5 px-3 py-2.5 text-sm outline-none ring-gold-400 focus:ring-2" />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-ink/60">{t('Jumla', 'Total')}</span>
                      <span className="font-display text-3xl font-bold tabular-nums">{tsh(total)}</span>
                    </div>
                    <button onClick={send} className="btn-gold mt-4 w-full text-base">
                      <MessageCircle className="h-5 w-5" /> {t('Tuma oda kwa WhatsApp', 'Send order on WhatsApp')}
                    </button>
                    <button onClick={clear} className="mt-3 flex w-full items-center justify-center gap-2 text-sm text-ink/50 hover:text-rose-600">
                      <Trash2 className="h-4 w-4" /> {t('Futa cart', 'Clear cart')}
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
