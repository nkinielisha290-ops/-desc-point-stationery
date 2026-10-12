import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Check, Search, Heart, MessageCircle } from 'lucide-react'
import { CATEGORIES, PRODUCTS, catLabel, waLink } from '../data/site'
import { useApp } from '../lib/store'
import { SafeImg, SectionTitle, tsh } from './ui'

export function Card({ p, i = 0 }) {
  const { t, x, add, cart, wishlist, toggleWish, notify } = useApp()
  const [added, setAdded] = useState(false)
  const inCart = cart[p.id]?.qty || 0
  const loved = wishlist.includes(p.id)
  const real = String(p.img).includes('/images/') || String(p.img).startsWith('data:')
  const ask = p.price == null
  const click = () => {
    add(p); setAdded(true); notify(t('Imeongezwa kwenye cart', 'Added to cart'))
    setTimeout(() => setAdded(false), 1200)
  }
  return (
    <motion.article id={p.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
      className="group relative flex h-full scroll-mt-32 flex-col overflow-hidden rounded-[30px] bg-surface ring-1 ring-ink/[.07] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(6,20,77,.35)] hover:ring-gold-400/60">
      {/* Picha: bidhaa halisi zinaonekana nzima juu ya mandhari safi (kama gridi ya vifaa ya Yas) */}
      <div className={`relative overflow-hidden ${real ? 'aspect-square bg-gradient-to-b from-ink/[.02] to-ink/[.06]' : 'aspect-[4/3] bg-navy-900 sm:aspect-square'}`}>
        <SafeImg src={p.img} alt={x(p.name)} className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${real ? 'object-contain p-2 sm:p-4' : 'object-cover'}`} />
        <div className="absolute inset-x-3 top-3 flex items-start justify-between">
          {p.tag ? <span className="rounded-full bg-gold-400 px-2.5 py-1 text-[11px] font-bold text-navy-950">{x(p.tag)}</span> : <span />}
          <button onClick={() => { toggleWish(p.id); notify(loved ? t('Imeondolewa', 'Removed') : t('Imehifadhiwa kwenye unavyovipenda', 'Saved to wishlist')) }}
            aria-pressed={loved} aria-label={loved ? t('Ondoa kwenye unavyovipenda', 'Remove from wishlist') : t('Hifadhi', 'Save to wishlist')}
            className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy-900 shadow-sm ring-1 ring-black/5 transition active:scale-90">
            <Heart className={`h-[18px] w-[18px] ${loved ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <span className="text-[11px] font-bold text-gold-600">{x(catLabel(p.cat))}</span>
        <h3 className="mt-1 line-clamp-2 min-h-[2.75rem] text-[15px] font-bold leading-snug text-ink sm:text-base">{x(p.name)}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink/55">{x(p.desc)}</p>

        <div className="mt-auto pt-4">
          <div className="border-t border-ink/[.07] pt-3">
            {ask ? <span className="text-lg font-extrabold text-ink">{t('Uliza bei', 'Ask for price')}</span>
              : <span className="whitespace-nowrap text-lg font-extrabold tabular-nums text-ink sm:text-xl">{tsh(p.price)}</span>}
            {!ask && <span className="block text-xs text-ink/45">{t('kwa', 'per')} {x(p.unit)}</span>}
          </div>
          {ask ? (
            <a href={waLink(t(`Habari Desc Point! Naomba bei ya ${x(p.name)}.`, `Hello Desc Point! What is the price of the ${x(p.name)}?`))} target="_blank" rel="noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-2.5 text-sm font-bold text-white transition hover:brightness-105">
              <MessageCircle className="h-4 w-4" /> {t('Uliza bei', 'Ask for price')}
            </a>
          ) : (
            <button onClick={click}
              className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold transition ${added ? 'bg-emerald-500 text-white' : 'bg-navy-900 text-white hover:bg-gold-400 hover:text-navy-950 dark:bg-gold-400 dark:text-navy-950'}`}>
              {added ? <><Check className="h-4 w-4" /> {t('Imeongezwa', 'Added')}</> : <><Plus className="h-4 w-4 shrink-0" /> <span className="sm:hidden">{inCart ? `${t('Ongeza', 'Add')} (${inCart})` : t('Ongeza', 'Add')}</span><span className="hidden sm:inline">{inCart ? t(`Ongeza tena (${inCart})`, `Add again (${inCart})`) : t('Ongeza kwenye oda', 'Add to order')}</span></>}
            </button>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Products({ initialCat = 'all' }) {
  const { t, x, wishlist } = useApp()
  const [cat, setCat] = useState(initialCat || 'all')
  useEffect(() => { setCat(initialCat || 'all') }, [initialCat])
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

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p, i) => <Card key={p.id} i={i} p={p} />)}
        </div>
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
