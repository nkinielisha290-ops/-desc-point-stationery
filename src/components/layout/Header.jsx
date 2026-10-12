import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, animate, motion, useMotionValue } from 'framer-motion'
import { Search, ShoppingBag, Heart, X, ChevronDown, Moon, Sun, MessageCircle, MapPin, PackageSearch, Info, ArrowRight, Download, Home, LayoutGrid, Store, Menu, Phone } from 'lucide-react'
import { BUSINESS, NAV, waLink } from '../../data/site'
import { useApp } from '../../lib/store'
import { href, useRoute } from '../../lib/router'
import { buildIndex, search, POPULAR } from '../../lib/search'
import { asset } from '../../lib/asset'
import { SafeImg, tsh } from '../ui'
import { useOpenStatus } from '../useOpenStatus'

export function SearchBox({ onDone, autoFocus = false, big = false }) {
  const { t, x, lang } = useApp()
  const index = useMemo(buildIndex, [])
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const results = useMemo(() => search(index, q, lang), [index, q, lang])
  const box = useRef(null)

  useEffect(() => {
    const f = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false) }
    document.addEventListener('pointerdown', f)
    return () => document.removeEventListener('pointerdown', f)
  }, [])

  const go = (to) => { window.location.hash = to; setQ(''); setOpen(false); onDone?.() }

  return (
    <div ref={box} className="relative w-full">
      <label className={`flex items-center gap-2 rounded-full bg-ink/5 px-4 ring-1 ring-transparent transition focus-within:bg-surface focus-within:ring-gold-400 ${big ? 'py-3' : 'py-2.5'}`}>
        <Search className="h-4 w-4 shrink-0 text-ink/45" />
        <span className="sr-only">{t('Tafuta', 'Search')}</span>
        <input id={big ? 'search-mobile' : 'search-desktop'} value={q} autoFocus={autoFocus} autoComplete="off"
          onFocus={() => setOpen(true)} onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(0) }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)) }
            if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
            if (e.key === 'Enter' && results[active]) go(results[active].to)
            if (e.key === 'Escape') setOpen(false)
          }}
          placeholder={t('Tafuta huduma au bidhaa…', 'Search services or products…')}
          className="w-full min-w-0 bg-transparent text-sm text-ink outline-none placeholder:text-ink/45" />
        {q && <button type="button" onClick={() => setQ('')} aria-label={t('Futa', 'Clear')}><X className="h-4 w-4 text-ink/40" /></button>}
      </label>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl bg-surface shadow-2xl ring-1 ring-ink/10">
            {q.trim().length < 2 ? (
              <div className="p-4">
                <p className="text-xs font-semibold text-ink/45">{t('Zinazotafutwa sana', 'Popular searches')}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {POPULAR.map((p) => (
                    <button key={p.sw} type="button" onClick={() => setQ(x(p))} className="rounded-full bg-ink/5 px-3 py-1.5 text-sm font-medium text-ink/75 transition hover:bg-gold-400 hover:text-navy-950">{x(p)}</button>
                  ))}
                </div>
              </div>
            ) : results.length ? (
              <ul role="listbox" className="max-h-[60vh] overflow-y-auto py-2">
                {results.map((r, i) => (
                  <li key={r.key} role="option" aria-selected={i === active}>
                    <button type="button" onMouseEnter={() => setActive(i)} onClick={() => go(r.to)}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left ${i === active ? 'bg-gold-400/15' : ''}`}>
                      {r.img ? <SafeImg src={r.img} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                        : <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-royal-500/10 text-royal-500"><ArrowRight className="h-4 w-4" /></span>}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-ink">{x(r.title)}</span>
                        <span className="block truncate text-xs text-ink/50">{x(r.sub)}</span>
                      </span>
                      {r.price != null && <span className="text-xs font-bold tabular-nums text-royal-500">{tsh(r.price)}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-sm text-ink/60">
                {t('Hatujapata', 'No results for')} “{q}”.{' '}
                <a href={waLink(t(`Habari Desc Point! Natafuta: ${q}`, `Hello Desc Point! I'm looking for: ${q}`))} target="_blank" rel="noreferrer" className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400">{t('Tuulize WhatsApp', 'Ask us on WhatsApp')}</a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


function Logo({ light }) {
  return (
    <a href={href('/')} className="flex shrink-0 items-center gap-2.5" aria-label="Desc Point Stationery – home">
      <img src={asset('logo.png')} alt="" className="h-10 w-10 rounded-full ring-2 ring-gold-400" />
      <span className={`font-display text-[15px] font-bold leading-[1.05] ${light ? 'text-white' : 'text-ink'}`}>Desc Point<span className={`block text-[11px] font-medium tracking-normal ${light ? 'text-gold-300' : 'text-gold-600 dark:text-gold-300'}`}>Stationery</span></span>
    </a>
  )
}

function LangSwitch({ light }) {
  const { lang, setLang, t } = useApp()
  return (
    <div role="group" aria-label={t('Lugha', 'Language')} className={`flex rounded-full p-0.5 text-[11px] font-bold ${light ? 'bg-white/15' : 'bg-ink/[.06]'}`}>
      {['sw', 'en'].map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1.5 uppercase transition ${lang === l ? 'bg-gold-400 text-navy-950' : light ? 'text-white/80' : 'text-ink/60'}`}>{l}</button>
      ))}
    </div>
  )
}

/* Utafutaji wa skrini nzima (kama app) */
function SearchOverlay({ open, onClose }) {
  const { t } = useApp()
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] bg-navy-950/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div role="dialog" aria-modal="true" aria-label={t('Tafuta', 'Search')} onClick={(e) => e.stopPropagation()}
            initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -24, opacity: 0 }} transition={{ duration: 0.2 }}
            className="mx-auto min-h-[60vh] w-full max-w-2xl rounded-b-[32px] bg-surface p-4 pb-8 shadow-2xl sm:mt-20 sm:min-h-0 sm:rounded-[32px] sm:p-6" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top, 0px))' }}>
            <div className="flex items-center justify-between pb-3">
              <p className="font-display text-lg font-bold">{t('Unatafuta nini?', 'What are you looking for?')}</p>
              <button onClick={onClose} aria-label={t('Funga', 'Close')} className="grid h-10 w-10 place-items-center rounded-full bg-ink/[.06]"><X className="h-5 w-5" /></button>
            </div>
            <SearchBox big autoFocus onDone={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* Menyu ya "Zaidi" — sheet ya chini kwenye simu */
function MoreSheet({ open, onClose }) {
  const { t, x, theme, toggleTheme, canInstall, install } = useApp()
  const status = useOpenStatus()
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-[80] bg-navy-950/55" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div role="dialog" aria-modal="true" aria-label={t('Menyu', 'Menu')}
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.6 }} onDragEnd={(_, i) => { if (i.offset.y > 120) onClose() }}
            className="fixed inset-x-0 bottom-0 z-[81] flex max-h-[88svh] flex-col rounded-t-[32px] bg-surface shadow-2xl">
            <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-ink/15" />
            <div className="flex items-center justify-between px-5 pb-3 pt-4">
              <span className="flex items-center gap-2 text-sm font-semibold text-ink/70"><span className={`h-2.5 w-2.5 rounded-full ${status.open ? 'bg-emerald-500' : 'bg-rose-500'}`} />{status.open ? t('Tuko wazi sasa', 'Open now') : t('Tumefunga sasa', 'Closed now')}</span>
              <div className="flex items-center gap-2">
                <LangSwitch />
                <button onClick={toggleTheme} aria-label={t('Badilisha mandhari', 'Toggle theme')} className="grid h-9 w-9 place-items-center rounded-full bg-ink/[.06]">{theme === 'dark' ? <Sun className="h-4 w-4 text-gold-300" /> : <Moon className="h-4 w-4" />}</button>
              </div>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 pb-4">
              {NAV.map((n) => (
                <div key={n.id} className="border-t border-ink/[.07] py-4">
                  {n.columns ? <>
                    <p className="font-display text-[15px] font-bold">{x(n.label)}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {n.columns.flatMap((c) => c.links).map(([l, to]) => <a key={l.sw} href={href(to)} onClick={onClose} className="rounded-full bg-ink/[.05] px-3.5 py-2 text-sm font-medium text-ink/80">{x(l)}</a>)}
                    </div>
                  </> : <a href={href(n.to)} onClick={onClose} className="flex items-center justify-between font-display text-[15px] font-bold">{x(n.label)} <ArrowRight className="h-4 w-4 text-ink/40" /></a>}
                </div>
              ))}
              <div className="grid grid-cols-2 gap-2 border-t border-ink/[.07] pt-4">
                {[[Info, t('Kuhusu sisi', 'About us'), '/kuhusu'], [PackageSearch, t('Fuatilia oda', 'Track order'), '/fuatilia'], [MapPin, t('Maduka yetu', 'Our shops'), '/kuhusu#maduka'], [Heart, t('Unavyovipenda', 'Wishlist'), '/duka']].map(([I, l, to]) => (
                  <a key={l} href={href(to)} onClick={onClose} className="flex items-center gap-2.5 rounded-[18px] bg-canvas px-3.5 py-3 text-sm font-semibold"><I className="h-4 w-4 text-royal-500 dark:text-gold-300" /> {l}</a>
                ))}
              </div>
            </nav>
            <div className="grid gap-2 border-t border-ink/[.07] p-4" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))' }}>
              {canInstall && <button onClick={install} className="btn-ink w-full"><Download className="h-4 w-4" /> {t('Weka App kwenye simu', 'Install the app')}</button>}
              <a href={waLink(t('Habari Desc Point, naomba msaada.', 'Hello Desc Point, I need help.'))} target="_blank" rel="noreferrer" className="btn-gold w-full"><MessageCircle className="h-4 w-4" /> {t('Ongea nasi WhatsApp', 'Chat on WhatsApp')}</a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* Tab bar ya chini (simu) — juu yake ni kama maji: ukihama tab, mawimbi yanasambaa
   kutoka tab mpya na kutulia; kilima kinateleza kufuata tab inayowaka. */
const SPRING = { type: 'spring', stiffness: 420, damping: 26, mass: 0.9 }
const LIFT = 28 // nafasi ya mawimbi juu ya bar

function useWaterEdge(navRef, ulRef, activeIdx) {
  const pathRef = useRef(null), lineRef = useRef(null)
  const cx = useMotionValue(-1), hill = useMotionValue(0)
  const st = useRef({ w: 0, h: 0, t0: -10, raf: 0 })
  const calm = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const draw = useCallback(() => {
    const { w, h, t0 } = st.current
    if (!w || !pathRef.current) return false
    const t = (performance.now() - t0) / 1000
    const amp = calm ? 0 : 10 * Math.exp(-t / 0.7) // mawimbi yanapungua taratibu
    const c = cx.get(), H = hill.get()
    let top = ''
    for (let x = 0; x <= w + 4; x += 4) {
      const d = Math.abs(x - c)
      const k = (x - c) / 40, bump = H * Math.exp(-k * k)
      const wave = amp * Math.sin(d / 15 - t * 13) * Math.exp(-d / 170) * Math.min(1, d / 30)
      top += `${x ? 'L' : 'M'}${Math.min(x, w)} ${(LIFT - bump - wave).toFixed(2)}`
    }
    pathRef.current.setAttribute('d', `${top}L${w} ${h}L0 ${h}Z`)
    lineRef.current.setAttribute('d', top)
    return amp > 0.05
  }, [cx, hill, calm])

  const loop = useCallback(() => {
    cancelAnimationFrame(st.current.raf)
    const tick = () => { const moving = draw(); if (moving || cx.isAnimating() || hill.isAnimating()) st.current.raf = requestAnimationFrame(tick) }
    st.current.raf = requestAnimationFrame(tick)
  }, [draw, cx, hill])

  // vipimo vya bar (na kila inapobadilika ukubwa)
  useEffect(() => {
    const nav = navRef.current
    const ro = new ResizeObserver(() => { st.current.w = nav.offsetWidth; st.current.h = nav.offsetHeight + LIFT; place(false); draw() })
    ro.observe(nav)
    return () => { ro.disconnect(); cancelAnimationFrame(st.current.raf) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const place = (animated) => {
    const ul = ulRef.current
    if (!ul) return
    const target = activeIdx < 0 ? cx.get() : ul.offsetLeft + ((activeIdx + 0.5) * ul.offsetWidth) / 5
    if (!animated || cx.get() < 0 || calm) { cx.set(target); hill.set(activeIdx < 0 ? 0 : 10); return }
    animate(cx, target, SPRING)
    animate(hill, activeIdx < 0 ? 0 : 10, { duration: 0.4 })
    st.current.t0 = performance.now()
    loop()
  }
  useEffect(() => { place(true); draw() }, [activeIdx]) // eslint-disable-line react-hooks/exhaustive-deps

  return { pathRef, lineRef }
}

function BottomBar({ onMore, moreOpen }) {
  const { t, count, cartOpen, setCartOpen } = useApp()
  const { page } = useRoute()
  const navRef = useRef(null), ulRef = useRef(null)
  const tabs = [
    { id: 'home', icon: Home, label: t('Mwanzo', 'Home'), to: '/', match: ['home'] },
    { id: 'huduma', icon: LayoutGrid, label: t('Huduma', 'Services'), to: '/huduma', match: ['huduma', 'printing', 'design', 'mtandaoni', 'kozi', 'kazi-zetu'] },
    { id: 'duka', icon: Store, label: t('Duka', 'Shop'), to: '/duka', match: ['duka', 'ofa'] },
    { id: 'oda', icon: ShoppingBag, label: t('Oda', 'Order'), action: () => setCartOpen(true), badge: count },
    { id: 'more', icon: Menu, label: t('Zaidi', 'More'), action: onMore },
  ]
  // tab inayowaka: sheet iliyofunguka kwanza, kisha ukurasa
  const active = moreOpen ? 'more' : cartOpen ? 'oda' : (tabs.find((x) => x.match?.includes(page))?.id ?? null)
  const activeIdx = tabs.findIndex((x) => x.id === active)
  const { pathRef, lineRef } = useWaterEdge(navRef, ulRef, activeIdx)

  return (
    <MotionConfig reducedMotion="user">
      <nav ref={navRef} aria-label={t('Menyu ya chini', 'Bottom menu')} className="fixed inset-x-0 bottom-0 z-[60] xl:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <svg aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 w-full overflow-visible drop-shadow-[0_-6px_14px_rgba(6,20,77,.08)]" style={{ top: -LIFT, height: `calc(100% + ${LIFT}px)` }}>
          <path ref={pathRef} style={{ fill: 'rgb(var(--surface))' }} />
          <path ref={lineRef} fill="none" strokeWidth="1" style={{ stroke: 'rgb(var(--ink) / .08)' }} />
        </svg>
        <ul ref={ulRef} className="relative mx-auto grid h-[66px] max-w-md grid-cols-5">
          {tabs.map(({ id, icon: I, label, to, action, badge }) => {
            const on = active === id
            const inner = <>
              <motion.span className="relative grid h-8 w-14 place-items-center" animate={{ y: on ? -5 : 0 }} transition={SPRING}>
                {on && <>
                  <motion.span layoutId="tab-pill" transition={SPRING} className="absolute inset-0 rounded-full bg-gold-400 shadow-[0_6px_16px_-6px_rgba(245,184,0,.9)]" />
                  {/* pete za mawimbi kutoka kwenye icon */}
                  {[0, 0.14].map((d) => (
                    <motion.span key={d} className="absolute inset-0 rounded-full border-2 border-gold-400" initial={{ scale: 0.7, opacity: 0.7 }} animate={{ scale: 2.1, opacity: 0 }} transition={{ duration: 0.9, delay: d, ease: 'easeOut' }} />
                  ))}
                </>}
                <motion.span key={on ? 'on' : 'off'} className={`relative ${on ? 'text-navy-950' : 'text-ink/55'}`}
                  initial={false} animate={on ? { y: [0, -7, 0], rotate: [0, -12, 8, 0], scale: [1, 1.18, 1] } : { y: 0, rotate: 0, scale: 1 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
                  <I className="h-[21px] w-[21px]" strokeWidth={on ? 2.4 : 2} />
                </motion.span>
                <AnimatePresence>
                  {badge > 0 && (
                    <motion.span key={badge} initial={{ scale: 0 }} animate={{ scale: [0, 1.35, 1] }} exit={{ scale: 0 }} transition={{ duration: 0.35 }}
                      className="absolute -right-0.5 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-royal-500 px-1 text-[10px] font-bold text-white">{badge}</motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
              <span className={`text-[11px] transition-colors ${on ? 'font-bold text-ink' : 'font-medium text-ink/55'}`}>{label}</span>
            </>
            const props = { whileTap: { scale: 0.86 }, transition: { type: 'spring', stiffness: 600, damping: 20 }, className: 'flex h-full w-full flex-col items-center justify-center gap-1' }
            return <li key={id}>{to
              ? <motion.a href={href(to)} aria-current={on ? 'page' : undefined} {...props}>{inner}</motion.a>
              : <motion.button onClick={action} aria-expanded={on} {...props}>{inner}</motion.button>}</li>
          })}
        </ul>
      </nav>
    </MotionConfig>
  )
}

export default function Header() {
  const { t, x, theme, toggleTheme, count, setCartOpen, wishlist } = useApp()
  const { page } = useRoute()
  const [drop, setDrop] = useState(null)
  const [more, setMore] = useState(false)
  const [find, setFind] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const timer = useRef(null)
  const overHero = page === 'home' && !scrolled

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => { setDrop(null); setMore(false); setFind(false) }, [page])
  useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') { setDrop(null); setFind(false); setMore(false) }
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !/input|textarea|select/i.test(document.activeElement?.tagName))) { e.preventDefault(); setFind(true) }
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])

  const open = (id) => { clearTimeout(timer.current); setDrop(id) }
  const close = () => { timer.current = setTimeout(() => setDrop(null), 160) }
  const iconBtn = `grid h-10 w-10 place-items-center rounded-full transition ${overHero ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-ink/[.05] text-ink hover:bg-ink/10'}`

  return (
    <>
      <header className={`${page === 'home' ? 'fixed' : 'sticky'} inset-x-0 top-0 z-50 transition-colors duration-300 ${overHero ? 'bg-gradient-to-b from-navy-950/70 to-transparent' : 'border-b border-ink/[.07] bg-surface'}`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <div className="container-x flex h-16 items-center gap-3 lg:h-[76px]">
          <Logo light={overHero} />

          {/* Menyu ya kompyuta: kidonge katikati */}
          <nav aria-label={t('Menyu kuu', 'Main menu')} onMouseLeave={close}
            className={`relative mx-auto hidden items-center gap-0.5 rounded-full p-1 xl:flex ${overHero ? 'bg-white/10 ring-1 ring-white/20' : 'bg-ink/[.04] ring-1 ring-ink/[.06]'}`}>
            {NAV.map((n) => {
              const cls = `flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition 2xl:px-4 ${drop === n.id ? (overHero ? 'bg-white text-navy-950' : 'bg-surface text-ink shadow-sm') : overHero ? 'text-white/90 hover:text-white' : 'text-ink/75 hover:text-ink'}`
              return n.columns ? (
                <div key={n.id} className="relative" onMouseEnter={() => open(n.id)}>
                  <button onClick={() => setDrop(drop === n.id ? null : n.id)} onFocus={() => open(n.id)} aria-expanded={drop === n.id} className={cls}>
                    {x(n.label)} <ChevronDown className={`h-3.5 w-3.5 transition ${drop === n.id ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {drop === n.id && (
                      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.15 }}
                        onMouseEnter={() => open(n.id)} className="absolute left-1/2 top-full z-50 w-[520px] -translate-x-1/2 pt-3">
                        <div className="grid grid-cols-2 gap-6 rounded-[28px] bg-surface p-6 text-ink shadow-[0_30px_80px_-30px_rgba(6,20,77,.5)] ring-1 ring-ink/[.07]">
                          {n.columns.map((c) => (
                            <div key={c.title.sw}>
                              <p className="text-xs font-semibold text-ink/45">{x(c.title)}</p>
                              <ul className="mt-2 space-y-0.5">
                                {c.links.map(([l, to]) => <li key={l.sw}><a href={href(to)} onClick={() => setDrop(null)} className="block rounded-[14px] px-3 py-2.5 text-[15px] font-medium text-ink/85 transition hover:bg-canvas hover:text-ink">{x(l)}</a></li>)}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : <a key={n.id} href={href(n.to)} onMouseEnter={close} className={`${cls} ${page === n.to.slice(1) ? (overHero ? '!bg-white !text-navy-950' : '!bg-surface shadow-sm') : ''}`}>{x(n.label)}</a>
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1.5 xl:ml-0">
            <button onClick={() => setFind(true)} aria-label={t('Tafuta', 'Search')} className={iconBtn}><Search className="h-[18px] w-[18px]" /></button>
            <div className="hidden sm:block"><LangSwitch light={overHero} /></div>
            <button onClick={toggleTheme} aria-label={theme === 'dark' ? t('Mwanga', 'Light mode') : t('Giza', 'Dark mode')} className={`${iconBtn} hidden sm:grid`}>{theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
            <a href={href('/duka')} aria-label={t('Unavyovipenda', 'Wishlist')} className={`${iconBtn} relative hidden 2xl:grid`}>
              <Heart className={`h-[18px] w-[18px] ${wishlist.length ? 'fill-rose-500 text-rose-500' : ''}`} />
            </a>
            <button onClick={() => setCartOpen(true)} aria-label={t('Oda yangu', 'My order')} className={`${iconBtn} relative hidden xl:grid`}>
              <ShoppingBag className="h-[18px] w-[18px]" />
              {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold-400 px-1 text-[11px] font-bold text-navy-950">{count}</span>}
            </button>
            <a href={waLink(t('Habari Desc Point, naomba msaada.', 'Hello Desc Point, I need help.'))} target="_blank" rel="noreferrer" className="ml-1 hidden items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-bold text-navy-950 transition hover:bg-gold-300 2xl:flex">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} aria-label={t('Piga simu', 'Call us')} className={`${iconBtn} xl:hidden`}><Phone className="h-[18px] w-[18px]" /></a>
          </div>
        </div>
      </header>
      <SearchOverlay open={find} onClose={() => setFind(false)} />
      <MoreSheet open={more} onClose={() => setMore(false)} />
      <BottomBar onMore={() => setMore(true)} moreOpen={more} />
    </>
  )
}
