import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ShoppingBag, MessageCircle, Minus, Plus, Pause, Play, Package, Sparkles, Heart } from 'lucide-react'
import { PRODUCTS, SERVICE_ITEMS, waLink, catLabel } from '../data/site'
import { useApp } from '../lib/store'
import { SafeImg, tsh } from './ui'

const TABS = [
  { id: 'bidhaa', label: { sw: 'Bidhaa', en: 'Products' }, icon: Package, list: PRODUCTS },
  { id: 'huduma', label: { sw: 'Huduma', en: 'Services' }, icon: Sparkles, list: SERVICE_ITEMS },
]
const AUTOPLAY_MS = 5500

const slide = {
  enter: (d) => ({ x: d > 0 ? '60%' : '-60%', opacity: 0, scale: 0.92 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (d) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0, scale: 0.92 }),
}

export default function Showcase() {
  const { t, x, cart, add: onAdd, setQty, wishlist, toggleWish } = useApp()
  const [tab, setTab] = useState('bidhaa')
  const [[index, dir], setPage] = useState([0, 0])
  const [paused, setPaused] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const thumbs = useRef(null)

  const list = TABS.find((t) => t.id === tab).list
  const item = list[index]
  const qty = cart[item.id]?.qty || 0
  const kind = tab === 'bidhaa' ? t('Bidhaa', 'Product') : t('Huduma', 'Service')
  const ask = item.price == null
  const priceText = (p) => (p == null ? t('Uliza bei', 'Ask for price') : tsh(p))

  const go = useCallback((d) => setPage(([i]) => [(i + d + list.length) % list.length, d]), [list.length])
  const jump = (i) => setPage(([cur]) => [i, i > cur ? 1 : -1])
  const switchTab = (t) => { setTab(t); setPage([0, 0]) }

  // Autoplay
  useEffect(() => {
    if (paused || userPaused) return
    const t = setTimeout(() => go(1), AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [index, tab, paused, userPaused, go])

  // Keyboard
  useEffect(() => {
    const k = (e) => {
      if (e.target.closest?.('input, textarea, select')) return
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [go])

  // Weka thumbnail iliyochaguliwa katikati (bila kusogeza ukurasa)
  useEffect(() => {
    const box = thumbs.current
    const el = box?.children[index]
    if (box && el) box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' })
  }, [index, tab])

  const orderNow = waLink(t(
    `Habari Desc Point! Nataka ${kind.toLowerCase()} hii:\n\n• ${x(item.name)}\n${ask ? '' : `• Bei: ${tsh(item.price)} / ${x(item.unit)}\n• Idadi: ${qty || 1}\n`}\nNaomba maelezo zaidi${ask ? ' na bei' : ''}.`,
    `Hello Desc Point! I'd like this ${kind.toLowerCase()}:\n\n• ${x(item.name)}\n${ask ? '' : `• Price: ${tsh(item.price)} / ${x(item.unit)}\n• Quantity: ${qty || 1}\n`}\nPlease share more details${ask ? ' and the price' : ''}.`,
  ))

  return (
    <section id="gundua" className="relative scroll-mt-20 overflow-hidden bg-navy-950 py-24 text-white sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(31,85,255,.35),transparent_45%),radial-gradient(circle_at_85%_90%,rgba(245,184,0,.16),transparent_40%)]" />
      <div className="container-x relative">
        {/* Kichwa + tabs */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-gold-300">{t('Gundua na uagize', 'Explore and order')}</p>
            <h2 className="mt-1 font-display text-4xl font-black leading-[1.05] sm:text-5xl">
              {t('Bidhaa & huduma,', 'Products & services,')} <em className="gold-text ">{t('na bei zake.', 'with prices.')}</em>
            </h2>
            <p className="mt-3 max-w-xl text-white/65">{t('Telezesha kuona zaidi. Ongeza kwenye cart, au agiza moja kwa moja kwa WhatsApp.', 'Swipe to see more. Add to cart, or order straight on WhatsApp.')}</p>
          </div>
          <div role="tablist" aria-label={t('Chagua aina', 'Choose type')} className="flex rounded-full bg-white/5 p-1.5 ring-1 ring-white/10">
            {TABS.map(({ id, label, icon: I, list: l }) => (
              <button key={id} role="tab" aria-selected={tab === id} onClick={() => switchTab(id)}
                className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${tab === id ? 'text-navy-950' : 'text-white/70 hover:text-white'}`}>
                {tab === id && <motion.span layoutId="show-tab" className="absolute inset-0 rounded-full bg-gold-400" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />}
                <I className="relative h-4 w-4" />
                <span className="relative">{x(label)}</span>
                <span className={`relative rounded-full px-1.5 text-xs ${tab === id ? 'bg-navy-950/15' : 'bg-white/10'}`}>{l.length}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stage */}
        <div
          className="grid overflow-hidden rounded-[36px] bg-white/[.04] ring-1 ring-white/10 lg:grid-cols-[1.35fr_1fr]"
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)} onTouchEnd={() => setTimeout(() => setPaused(false), 2500)}
        >
          {/* Picha */}
          <div className="relative aspect-[4/3] overflow-hidden bg-navy-900 sm:aspect-[16/11] lg:aspect-auto lg:min-h-[520px]">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div key={tab + item.id} custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
                transition={{ x: { type: 'spring', stiffness: 260, damping: 32 }, opacity: { duration: 0.3 }, scale: { duration: 0.4 } }}
                drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.6}
                onDragEnd={(_, i) => { if (i.offset.x < -70 || i.velocity.x < -400) go(1); else if (i.offset.x > 70 || i.velocity.x > 400) go(-1) }}
                className="absolute inset-0 cursor-grab active:cursor-grabbing">
                <SafeImg src={item.img} alt={x(item.name)} className={`pointer-events-none relative h-full w-full select-none ${item.fit === 'contain' ? 'object-contain p-4 pb-16 drop-shadow-2xl' : 'object-cover'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Juu ya picha */}
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-navy-950/70 px-3 py-1 text-xs font-semibold">{x(catLabel(item.cat))}</span>
                {item.tag && <span className="rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-navy-950">{x(item.tag)}</span>}
              </div>
              <span className="pointer-events-auto flex items-center gap-2">
                <button onClick={() => toggleWish(item.id)} aria-pressed={wishlist.includes(item.id)} aria-label={t('Hifadhi', 'Save')} className="grid h-9 w-9 place-items-center rounded-full bg-navy-950/70 transition hover:scale-110">
                  <Heart className={`h-4 w-4 ${wishlist.includes(item.id) ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                </button>
              <span className="rounded-full bg-navy-950/70 px-3 py-1 font-display text-sm font-bold tabular-nums">
                {String(index + 1).padStart(2, '0')} <span className="text-white/40">/ {String(list.length).padStart(2, '0')}</span>
              </span>
              </span>
            </div>

            {/* Bei juu ya picha (simu) */}
            <div className="pointer-events-none absolute bottom-4 left-4 lg:hidden">
              <p className="font-display text-3xl font-black text-gold-300 drop-shadow">{priceText(item.price)}</p>
              {!ask && <p className="text-xs text-white/80">{t('kwa', 'per')} {x(item.unit)}</p>}
            </div>

            {/* Mishale */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button onClick={() => go(-1)} aria-label={t('Iliyopita', 'Previous')} className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-navy-900 shadow-lg transition hover:bg-gold-400"><ChevronLeft className="h-5 w-5" /></button>
              <button onClick={() => go(1)} aria-label={t('Inayofuata', 'Next')} className="grid h-11 w-11 place-items-center rounded-full bg-gold-400 text-navy-950 shadow-lg transition hover:bg-white"><ChevronRight className="h-5 w-5" /></button>
            </div>

            {/* Progress ya autoplay */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
              {!(paused || userPaused) && (
                <motion.div key={tab + index} className="h-full bg-gold-400" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }} />
              )}
            </div>
          </div>

          {/* Maelezo */}
          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <AnimatePresence mode="wait">
              <motion.div key={tab + item.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }} className="flex-1">
                <p className="text-xs font-bold sm:text-sm text-gold-300">{kind}</p>
                <h3 className="font-display text-3xl font-black leading-tight sm:text-4xl" style={{ textWrap: 'balance' }}>{x(item.name)}</h3>
                <p className="mt-4 leading-relaxed text-white/70">{x(item.desc)}</p>
                <div className="mt-6 hidden items-baseline gap-2 lg:flex">
                  <span className={`gold-text font-display font-black tabular-nums ${ask ? 'text-4xl' : 'text-5xl'}`}>{priceText(item.price)}</span>
                  {!ask && <span className="text-white/50">/ {x(item.unit)}</span>}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Cart controls */}
            <div className="mt-8 space-y-3">
              {ask ? (
                <p className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-white/70 ring-1 ring-white/10">{t('Bei inategemea mahitaji yako. Tuulize WhatsApp tukupe bei na maelekezo.', 'Price depends on your needs. Ask us on WhatsApp for the price and requirements.')}</p>
              ) : qty === 0 ? (
                <button onClick={() => onAdd(item)} className="btn-gold w-full text-base">
                  <ShoppingBag className="h-5 w-5" /> {t('Ongeza kwenye cart', 'Add to cart')}
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 rounded-full bg-white/10 p-1.5 ring-1 ring-gold-400/40">
                    <button onClick={() => setQty(item.id, qty - 1)} aria-label={t('Punguza', 'Decrease')} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"><Minus className="h-4 w-4" /></button>
                    <motion.span key={qty} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className="w-8 text-center font-display text-lg font-black tabular-nums">{qty}</motion.span>
                    <button onClick={() => onAdd(item)} aria-label={t('Ongeza', 'Increase')} className="grid h-10 w-10 place-items-center rounded-full bg-gold-400 text-navy-950 hover:bg-gold-300"><Plus className="h-4 w-4" /></button>
                  </div>
                  <p className="text-sm text-white/70">{t('Kwenye cart', 'In cart')} · <b className="text-gold-300">{tsh(qty * item.price)}</b></p>
                </div>
              )}
              <a href={orderNow} target="_blank" rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110">
                <MessageCircle className="h-5 w-5" /> {ask ? t('Uliza bei WhatsApp', 'Ask price on WhatsApp') : t('Agiza sasa kwa WhatsApp', 'Order now on WhatsApp')}
              </a>
            </div>

            <button onClick={() => setUserPaused((v) => !v)} className="mt-5 flex items-center gap-2 self-start text-xs text-white/45 hover:text-white">
              {userPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              {userPaused ? t('Endelea kuonyesha', 'Resume slideshow') : t('Simamisha kuonyesha', 'Pause slideshow')}
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        <div ref={thumbs} className="relative mt-5 flex snap-x gap-3 overflow-x-auto pb-3 [scrollbar-width:thin]">
          {list.map((p, i) => (
            <button key={p.id} onClick={() => jump(i)} aria-label={x(p.name)}
              className={`group relative w-36 shrink-0 snap-start overflow-hidden rounded-2xl text-left transition sm:w-44 ${i === index ? 'ring-2 ring-gold-400' : 'opacity-60 ring-1 ring-white/10 hover:opacity-100'}`}>
              <SafeImg src={p.img.replace('w=1000', 'w=300')} alt="" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-2.5">
                <p className="truncate text-xs font-semibold">{x(p.name)}</p>
                <p className="text-xs font-bold text-gold-300">{priceText(p.price)}</p>
              </div>
              {cart[p.id] && <span className="absolute right-2 top-2 grid h-5 min-w-5 place-items-center rounded-full bg-gold-400 px-1 text-[10px] font-black text-navy-950">{cart[p.id].qty}</span>}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
