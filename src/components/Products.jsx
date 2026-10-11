import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Check, Search } from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '../data/site'
import { SafeImg, SectionTitle, tsh } from './ui'

function Card({ p, onAdd, inCart, i = 0 }) {
  const [added, setAdded] = useState(false)
  const click = () => { onAdd(p); setAdded(true); setTimeout(() => setAdded(false), 1200) }
  return (
    <motion.article layout initial={{ opacity: 0, y: 40, scale: 0.94 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-40px' }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.55, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="card group flex flex-col overflow-hidden" whileHover={{ y: -8 }}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <SafeImg src={p.img} alt={p.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        {p.tag && <span className="absolute left-3 top-3 rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-navy-950 shadow">{p.tag}</span>}
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy-900 backdrop-blur">{p.cat}</span>
      </div>
      <div className="flex flex-1 items-end justify-between gap-3 p-5">
        <div>
          <h3 className="font-semibold leading-snug text-navy-900">{p.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-navy-900/60">{p.desc}</p>
          <p className="mt-2 font-display text-xl font-black text-royal-600">{tsh(p.price)} <span className="font-sans text-xs font-normal text-navy-900/45">/ {p.unit}</span></p>
        </div>
        <button onClick={click} aria-label={`Ongeza ${p.name}`}
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-full transition ${added ? 'bg-emerald-500 text-white' : 'bg-navy-900 text-gold-300 hover:bg-gold-400 hover:text-navy-950'}`}>
          <AnimatePresence mode="wait">
            <motion.span key={added ? 'a' : 'b'} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
              {added ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
      {inCart > 0 && <div className="bg-gold-400/15 px-5 py-2 text-xs font-semibold text-gold-700">✓ {inCart} kwenye oda yako</div>}
    </motion.article>
  )
}

export default function Products({ onAdd, cart }) {
  const [cat, setCat] = useState('Zote')
  const [q, setQ] = useState('')
  const list = PRODUCTS.filter((p) => (cat === 'Zote' || p.cat === cat) && p.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <section id="bidhaa" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <SectionTitle eyebrow="Duka letu" title="Bidhaa bora," accent="bei rafiki." sub="Chagua bidhaa, ziongeze kwenye oda yako, kisha tuma oda nzima kwa WhatsApp kwa mbofyo mmoja." />

        <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition ${cat === c ? 'text-navy-950' : 'bg-white text-navy-900/70 ring-1 ring-navy-900/10 hover:text-navy-900'}`}>
                {cat === c && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-gold-400" />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
          <label className="flex w-full items-center gap-2 rounded-full bg-white px-4 py-2.5 ring-1 ring-navy-900/10 focus-within:ring-2 focus-within:ring-gold-400 md:w-72">
            <Search className="h-4 w-4 text-navy-900/40" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tafuta bidhaa..." className="w-full bg-transparent text-sm outline-none" />
          </label>
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => <Card key={p.id} i={i} p={p} onAdd={onAdd} inCart={cart[p.id]?.qty || 0} />)}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <p className="py-16 text-center text-navy-900/50">Hatujapata bidhaa hiyo — tuulize kwa WhatsApp, huenda tunayo!</p>}
      </div>
    </section>
  )
}
