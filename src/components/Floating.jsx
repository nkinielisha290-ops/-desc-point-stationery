import { motion } from 'framer-motion'
import { MessageCircle, ShoppingBag } from 'lucide-react'
import { BUSINESS, waLink } from '../data/site'

export default function Floating({ count, onCart }) {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {count > 0 && (
        <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={onCart}
          className="flex items-center gap-2 rounded-full bg-navy-900 px-5 py-3 font-semibold text-white shadow-2xl ring-2 ring-gold-400">
          <ShoppingBag className="h-5 w-5 text-gold-400" /> Oda ({count})
        </motion.button>
      )}
      <motion.a href={waLink(`Habari ${BUSINESS.name}!`)} target="_blank" rel="noreferrer" aria-label="WhatsApp"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: 'spring' }}
        className="relative grid h-16 w-16 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-600/40">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <MessageCircle className="relative h-8 w-8" />
      </motion.a>
    </div>
  )
}
