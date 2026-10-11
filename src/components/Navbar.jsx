import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ShoppingBag, MessageCircle } from 'lucide-react'
import { BUSINESS, waLink } from '../data/site'

const LINKS = [
  ['Gundua', '#gundua'],
  ['Huduma', '#huduma'],
  ['Bei', '#bei'],
  ['Bidhaa', '#bidhaa'],
  ['Kuhusu', '#kuhusu'],
  ['Ushuhuda', '#ushuhuda'],
  ['Mawasiliano', '#mawasiliano'],
]

export default function Navbar({ count, onCart }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-navy-950/85 py-2 shadow-2xl shadow-navy-950/30 backdrop-blur-xl' : 'py-4'}`}>
      <nav className="container-x flex items-center justify-between">
        <a href="#" className="group flex items-center gap-3">
          <motion.img
            src="/logo.png" alt="Desc Point Stationery logo"
            className={`rounded-full ring-2 ring-gold-400/70 transition-all duration-500 ${scrolled ? 'h-11 w-11' : 'h-14 w-14'}`}
            whileHover={{ rotate: 360 }} transition={{ duration: 0.9 }}
          />
          <span className="leading-none">
            <span className="block font-display text-lg font-black text-white sm:text-xl">Desc Point</span>
            <span className="font-script text-lg text-gold-300">Stationery</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map(([l, h]) => (
            <li key={h}>
              <a href={h} className="group relative px-3 py-2 text-sm font-medium text-white/85 transition hover:text-white">
                {l}
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded bg-gold-400 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button onClick={onCart} aria-label="Oda yangu" className="relative grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <motion.span key={count} initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold-400 px-1 text-xs font-bold text-navy-950">
                {count}
              </motion.span>
            )}
          </button>
          <a href={waLink(`Habari ${BUSINESS.name}, naomba msaada.`)} target="_blank" rel="noreferrer" className="btn-gold hidden !px-5 !py-2.5 text-sm sm:inline-flex">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <button onClick={() => setOpen(true)} aria-label="Fungua menyu" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[70] bg-navy-950/95 backdrop-blur-xl lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="container-x flex items-center justify-between py-4">
              <img src="/logo.png" alt="" className="h-12 w-12 rounded-full" />
              <button onClick={() => setOpen(false)} aria-label="Funga" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white"><X /></button>
            </div>
            <ul className="container-x mt-6 space-y-2">
              {LINKS.map(([l, h], i) => (
                <motion.li key={h} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <a href={h} onClick={() => setOpen(false)} className="block border-b border-white/10 py-4 font-display text-3xl font-bold text-white hover:text-gold-300">{l}</a>
                </motion.li>
              ))}
            </ul>
            <div className="container-x mt-8">
              <a href={waLink('Habari, naomba msaada.')} target="_blank" rel="noreferrer" className="btn-gold w-full"><MessageCircle className="h-5 w-5" /> Ongea nasi WhatsApp</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
