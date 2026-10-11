import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus, MessageCircle, ShoppingBag, Trash2 } from 'lucide-react'
import { BUSINESS, waLink } from '../data/site'
import { SafeImg, tsh } from './ui'

export default function OrderDrawer({ open, onClose, cart, setQty, clear }) {
  const items = Object.values(cart)
  const total = items.reduce((s, i) => s + i.qty * i.price, 0)
  const message =
    `Habari ${BUSINESS.name}! Naomba kuagiza:\n\n` +
    ['p', 's'].map((k) => {
      const g = items.filter((i) => String(i.id).startsWith(k))
      if (!g.length) return ''
      return `*${k === 'p' ? 'BIDHAA' : 'HUDUMA'}*\n` + g.map((i) => `• ${i.name} — ${i.qty} ${i.unit || ''} × ${tsh(i.price)} = ${tsh(i.qty * i.price)}`).join('\n') + '\n\n'
    }).join('') +
    `Jumla: ${tsh(total)}\n\nJina: \nMahali: `

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-[80] bg-navy-950/60 backdrop-blur-sm" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside className="fixed bottom-0 right-0 top-0 z-[90] flex w-full max-w-md flex-col bg-paper shadow-2xl"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 260 }}>
            <div className="flex items-center justify-between bg-navy-950 px-6 py-5 text-white">
              <div>
                <p className="font-script text-xl text-gold-300">Oda yako</p>
                <p className="font-display text-2xl font-black">{items.length} bidhaa</p>
              </div>
              <button onClick={onClose} aria-label="Funga" className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><X className="h-5 w-5" /></button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-6">
              {items.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center text-center text-navy-900/50">
                  <ShoppingBag className="h-14 w-14 text-gold-500" />
                  <p className="mt-4">Bado hujaongeza bidhaa.</p>
                  <a href="#bidhaa" onClick={onClose} className="btn-gold mt-6">Tazama bidhaa</a>
                </div>
              )}
              {items.map((i) => (
                <motion.div layout key={i.id} className="card flex items-center gap-3 p-3">
                  <SafeImg src={i.img} alt={i.name} className="h-16 w-16 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{i.name}</p>
                    <p className="text-xs text-navy-900/50">{tsh(i.price)} / {i.unit}</p>
                    <p className="text-sm font-bold text-royal-600">{tsh(i.price * i.qty)}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-navy-900/5 p-1">
                    <button onClick={() => setQty(i.id, i.qty - 1)} className="grid h-8 w-8 place-items-center rounded-full bg-white" aria-label="Punguza"><Minus className="h-3 w-3" /></button>
                    <span className="w-6 text-center text-sm font-bold">{i.qty}</span>
                    <button onClick={() => setQty(i.id, i.qty + 1)} className="grid h-8 w-8 place-items-center rounded-full bg-white" aria-label="Ongeza"><Plus className="h-3 w-3" /></button>
                  </div>
                </motion.div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="border-t border-navy-900/10 bg-white p-6">
                <div className="flex items-center justify-between">
                  <span className="text-navy-900/60">Jumla</span>
                  <span className="font-display text-3xl font-black">{tsh(total)}</span>
                </div>
                <a href={waLink(message)} target="_blank" rel="noreferrer" className="btn-gold mt-5 w-full text-base">
                  <MessageCircle className="h-5 w-5" /> Tuma oda kwa WhatsApp
                </a>
                <button onClick={clear} className="mt-3 flex w-full items-center justify-center gap-2 text-sm text-navy-900/50 hover:text-rose-600">
                  <Trash2 className="h-4 w-4" /> Futa oda
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
