import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Check, Search, Heart, MessageCircle } from 'lucide-react'
import { CATEGORIES, PRODUCTS, catLabel, waLink } from '../data/site'
import { useApp } from '../lib/store'
import { SafeImg, SectionTitle, tsh } from './ui'

function Card({ p, i }) {
  const { t, x, add, cart, wishlist, toggleWish, notify } = useApp()
  const [added, setAdded] = useState(false)
  const inCart = cart[p.id]?.qty || 0
  const loved = wishlist.includes(p.id)
  const click = () => {
    add(p); setAdded(true); notify(t('Imeongezwa kwenye cart', 'Added to cart'))
    setTimeout(() => setAdded(false), 1200)
  }
  return (
    <motion.article layout initial={{ opacity: 0, y: 40, scale: 0.94 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-40px' }}
      exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.55, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="card group flex flex-col overflow-hidden" whileHover={{ y: -8 }}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <SafeImg src={p.img} alt={x(p.name)} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        {p.tag && <span className="absolute left-3 top-3 rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-navy-950 shadow">{x(p.tag)}</span>}
        <motion.button whileTap={{ scale: 0.8 }} onClick={() => { toggleWish(p.id); notify(loved ? t('Imeondolewa', 'Removed') : t('Imehifadhiwa kwenye unavyovipenda', 'Saved to wishlist')) }}
          aria-pressed={loved} aria-label={loved ? t('Ondoa kwenye unavyovipenda', 'Remove from wishlist') : t('Hifadhi', 'Save to wishlist')}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow backdrop-blur transition hover:scale-110">
          <Heart className={`h-5 w-5 transition ${loved ? 'fill-rose-500 text-rose-500' : 'text-navy-900'}`} />
        </motion.button>
        <span className="absolute bottom-3 left-3 rounded-full bg-navy-950/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{x(catLabel(p.cat))}</span>
      </div>
      <div className="flex flex-1 items-end justify-between gap-3 p-5">
        <div className="min-w-0">
          <h3 className="font-semibold leading-snug text-ink">{x(p.name)}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-ink/60">{x(p.desc)}</p>
          <p className="mt-2 font-display text-xl font-black text-royal-500">{p.price == null ? t('Uliza bei', 'Ask for price') : <>{tsh(p.price)} <span className="font-sans text-xs font-normal text-ink/45">/ {x(p.unit)}</span></>}</p>
        </div>
        {p.price == null ? (
          <a href={waLink(t(`Habari Desc Point! Naomba bei ya ${x(p.name)}.`, `Hello Desc Point! What is the price of the ${x(p.name)}?`))} target="_blank" rel="noreferrer"
            aria-label={`${t('Uliza bei ya', 'Ask price of')} ${x(p.name)}`} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#25D366] text-white transition hover:scale-105">
            <MessageCircle className="h-5 w-5" />
          </a>
        ) : (
        <button onClick={click} aria-label={`${t('Ongeza', 'Add')} ${x(p.name)}`}
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-full transition ${added ? 'bg-emerald-500 text-white' : 'bg-navy-900 text-gold-300 hover:bg-gold-400 hover:text-navy-950'}`}>
          <AnimatePresence mode="wait">
            <motion.span key={added ? 'a' : 'b'} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
              {added ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            </motion.span>
          </AnimatePresence>
        </button>
        )}
      </div>
      {inCart > 0 && <div className="bg-gold-400/15 px-5 py-2 text-xs font-semibold text-gold-700 dark:text-gold-300">✓ {inCart} {t('kwenye cart yako', 'in your cart')}</div>}
    </motion.article>
  )
}

export default function Products() {
  const { t, x, wishlist } = useApp()
  const [cat, setCat] = useState('all')
  const [q, setQ] = useState('')
  const filters = [...CATEGORIES, { id: 'wish', label: { sw: `♥ Unavyovipenda (${wishlist.length})`, en: `♥ Wishlist (${wishlist.length})` } }]
  const needle = q.toLowerCase()
  const list = PRODUCTS.filter((p) => {
    const okCat = cat === 'all' || (cat === 'wish' ? wishlist.includes(p.id) : p.cat === cat)
    const okQ = !needle || [p.name.sw, p.name.en, p.desc.sw, p.desc.en].some((s) => s.toLowerCase().includes(needle))
    return okCat && okQ
  })

  return (
    <section id="bidhaa" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <SectionTitle eyebrow={t('Duka letu', 'Our shop')} title={t('Bidhaa bora,', 'Quality products,')} accent={t('bei rafiki.', 'friendly prices.')}
          sub={t('Ongeza bidhaa kwenye cart, hifadhi unazozipenda kwa ♥, kisha tuma oda nzima kwa WhatsApp. Cart yako inabaki hata ukifunga ukurasa.', 'Add items to your cart, save favourites with ♥, then send the whole order on WhatsApp. Your cart stays even if you close the page.')} />

        <div className="mb-10 flex flex-col items-center justify-between gap-4 lg:flex-row">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((c) => (
              <button key={c.id} onClick={() => setCat(c.id)} aria-pressed={cat === c.id}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition ${cat === c.id ? 'text-navy-950' : 'bg-surface text-ink/70 ring-1 ring-ink/10 hover:text-ink'}`}>
                {cat === c.id && <motion.span layoutId="cat-pill" className={`absolute inset-0 rounded-full ${c.id === 'wish' ? 'bg-rose-300' : 'bg-gold-400'}`} />}
                <span className="relative">{x(c.label)}</span>
              </button>
            ))}
          </div>
          <label className="flex w-full items-center gap-2 rounded-full bg-surface px-4 py-2.5 ring-1 ring-ink/10 focus-within:ring-2 focus-within:ring-gold-400 lg:w-72">
            <Search className="h-4 w-4 text-ink/40" />
            <input id="product-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Tafuta bidhaa...', 'Search products…')} className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40" />
          </label>
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => <Card key={p.id} i={i} p={p} />)}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && (
          <p className="py-16 text-center text-ink/50">
            {cat === 'wish' ? t('Bado hujahifadhi bidhaa. Bonyeza ♥ kwenye bidhaa unayoipenda.', 'No saved items yet. Tap ♥ on a product you like.')
              : t('Hatujapata bidhaa hiyo — tuulize kwa WhatsApp, huenda tunayo!', 'No match — ask us on WhatsApp, we may still have it!')}
          </p>
        )}
      </div>
    </section>
  )
}
