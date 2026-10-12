import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown, Phone, Moon, Sun, MessageCircle, MapPin, PackageSearch, HelpCircle, Info, ArrowRight, Flame, Download } from 'lucide-react'
import { BUSINESS, NAV, waLink } from '../../data/site'
import { useApp } from '../../lib/store'
import { href, useRoute } from '../../lib/router'
import { buildIndex, search, POPULAR } from '../../lib/search'
import { asset } from '../../lib/asset'
import { SafeImg, tsh } from '../ui'

function SearchBox({ onDone, autoFocus = false, big = false }) {
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
                <p className="text-xs font-semibold uppercase tracking-wider text-ink/45">{t('Zinazotafutwa sana', 'Popular searches')}</p>
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

export default function Header() {
  const { t, x, lang, setLang, theme, toggleTheme, count, setCartOpen, wishlist, canInstall, install } = useApp()
  const { page } = useRoute()
  const [mega, setMega] = useState(null)
  const [mobile, setMobile] = useState(false)
  const [acc, setAcc] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef(null)

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 10)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => { setMega(null); setMobile(false) }, [page])
  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : ''
    const k = (e) => { if (e.key === 'Escape') { setMega(null); setMobile(false) } }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [mobile])

  const openMega = (id) => { clearTimeout(closeTimer.current); setMega(id) }
  const closeMega = () => { closeTimer.current = setTimeout(() => setMega(null), 140) }
  const cur = NAV.find((n) => n.id === mega)

  const LangSwitch = () => (
    <div role="group" aria-label={t('Lugha', 'Language')} className="flex rounded-full bg-white/10 p-0.5 text-[11px] font-bold">
      {['sw', 'en'].map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 uppercase transition ${lang === l ? 'bg-gold-400 text-navy-950' : 'text-white/70 hover:text-white'}`}>{l}</button>
      ))}
    </div>
  )

  const utility = [
    [Info, t('Kuhusu sisi', 'About us'), '/kuhusu'],
    [PackageSearch, t('Fuatilia oda', 'Track order'), '/fuatilia'],
    [MapPin, t('Pata duka', 'Find a store'), '/kuhusu#maduka'],
    [HelpCircle, t('Msaada', 'Help'), '/#msaada'],
  ]

  return (
    <header className="sticky top-0 z-50" style={{ top: 'env(safe-area-inset-top, 0px)' }}>
      {/* Utepe wa juu (kama Yas) */}
      <div className={`hidden bg-navy-950 text-white transition-all duration-300 lg:block ${scrolled ? 'h-0 overflow-hidden' : 'h-10'}`}>
        <div className="container-x flex h-10 items-center justify-between text-xs">
          <nav aria-label={t('Viungo vya haraka', 'Quick links')} className="flex items-center gap-5">
            {utility.map(([I, l, to]) => (
              <a key={to} href={href(to)} className="flex items-center gap-1.5 text-white/75 transition hover:text-gold-300"><I className="h-3.5 w-3.5" /> {l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-white/75"><Phone className="h-3.5 w-3.5 text-gold-400" /> <span className="select-all">{BUSINESS.phoneLocal}</span> · <span className="select-all">{BUSINESS.phone2Local}</span></span>
            <LangSwitch />
            <button onClick={toggleTheme} aria-label={theme === 'dark' ? t('Mwanga', 'Light mode') : t('Giza', 'Dark mode')} className="grid h-7 w-7 place-items-center rounded-full bg-white/10 hover:bg-white/20">
              {theme === 'dark' ? <Sun className="h-3.5 w-3.5 text-gold-300" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Header kuu */}
      <div className={`relative border-b border-ink/5 bg-surface/95 backdrop-blur-xl transition-shadow ${scrolled || mega ? 'shadow-[0_10px_30px_-20px_rgba(6,20,77,.35)]' : ''}`} onMouseLeave={closeMega}>
        <div className="container-x flex h-16 items-center gap-3 lg:h-[72px] lg:gap-6">
          <a href={href('/')} className="flex shrink-0 items-center gap-2.5" aria-label="Desc Point Stationery – home">
            <img src={asset('logo.png')} alt="" className="h-10 w-10 rounded-full ring-2 ring-gold-400/60 lg:h-11 lg:w-11" />
            <span className="leading-none">
              <span className="block font-display text-lg font-black text-ink">Desc Point</span>
              <span className="text-[11px] font-semibold uppercase tracking-[.2em] text-gold-600">Stationery</span>
            </span>
          </a>

          <nav aria-label={t('Menyu kuu', 'Main menu')} className="hidden h-full items-stretch xl:flex">
            {NAV.map((n) => (
              n.columns ? (
                <button key={n.id} onMouseEnter={() => openMega(n.id)} onFocus={() => openMega(n.id)} onClick={() => setMega(mega === n.id ? null : n.id)} aria-expanded={mega === n.id}
                  className={`relative flex items-center gap-1 whitespace-nowrap px-2.5 text-sm font-semibold transition 2xl:px-3 ${mega === n.id ? 'text-royal-500' : 'text-ink/80 hover:text-ink'}`}>
                  {x(n.label)} <ChevronDown className={`h-4 w-4 transition ${mega === n.id ? 'rotate-180' : ''}`} />
                  {mega === n.id && <motion.span layoutId="mega-bar" className="absolute inset-x-2.5 bottom-0 h-[3px] rounded-t bg-gold-400" />}
                </button>
              ) : (
                <a key={n.id} href={href(n.to)} onMouseEnter={closeMega}
                  className={`relative flex items-center gap-1.5 whitespace-nowrap px-2.5 text-sm font-semibold transition 2xl:px-3 ${page === n.to.slice(1) ? 'text-royal-500' : 'text-ink/80 hover:text-ink'}`}>
                  {n.hot && <Flame className="h-4 w-4 text-rose-500" />}{x(n.label)}
                </a>
              )
            ))}
          </nav>

          <div className="ml-auto hidden w-full max-w-xs lg:block xl:max-w-[220px] 2xl:max-w-[300px]"><SearchBox /></div>

          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <a href={href('/duka')} aria-label={t('Unavyovipenda', 'Wishlist')} className="relative hidden h-10 w-10 place-items-center rounded-full text-ink/75 hover:bg-ink/5 sm:grid">
              <Heart className={`h-5 w-5 ${wishlist.length ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlist.length > 0 && <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">{wishlist.length}</span>}
            </a>
            <button onClick={() => setCartOpen(true)} aria-label={t('Cart yangu', 'My cart')} className="relative grid h-10 w-10 place-items-center rounded-full text-ink/75 hover:bg-ink/5">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && <motion.span key={count} initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold-400 px-1 text-[10px] font-bold text-navy-950">{count}</motion.span>}
            </button>
            <a href={waLink(t('Habari Desc Point, naomba msaada.', 'Hello Desc Point, I need help.'))} target="_blank" rel="noreferrer"
              className="ml-1 hidden items-center gap-2 rounded-full bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gold-400 hover:text-navy-950 md:flex dark:bg-gold-400 dark:text-navy-950">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <button onClick={() => setMobile(true)} aria-label={t('Fungua menyu', 'Open menu')} className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-ink/5 xl:hidden"><Menu className="h-5 w-5" /></button>
          </div>
        </div>

        {/* Search ya simu */}
        <div className="container-x pb-3 lg:hidden"><SearchBox big /></div>

        {/* Mega-menu */}
        <AnimatePresence>
          {cur && (
            <motion.div key={cur.id} onMouseEnter={() => openMega(cur.id)} onMouseLeave={closeMega}
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}
              className="absolute inset-x-0 top-full hidden border-t border-ink/5 bg-surface shadow-2xl xl:block">
              <div className="container-x grid grid-cols-[1fr_1fr_340px] gap-10 py-8">
                {cur.columns.map((c) => (
                  <div key={c.title.sw}>
                    <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-600">{x(c.title)}</p>
                    <ul className="mt-4 space-y-1">
                      {c.links.map(([l, to]) => (
                        <li key={l.sw}><a href={href(to)} onClick={() => setMega(null)} className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-[15px] font-medium text-ink/80 transition hover:bg-ink/5 hover:text-ink">
                          {x(l)} <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                        </a></li>
                      ))}
                    </ul>
                  </div>
                ))}
                <MegaPromo id={cur.id} close={() => setMega(null)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Menyu ya simu */}
      <AnimatePresence>
        {mobile && (
          <>
            <motion.div className="fixed inset-0 z-[70] bg-navy-950/50 backdrop-blur-sm xl:hidden" onClick={() => setMobile(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.aside role="dialog" aria-modal="true" aria-label={t('Menyu', 'Menu')} className="fixed inset-y-0 right-0 z-[71] flex w-[88%] max-w-sm flex-col bg-surface shadow-2xl xl:hidden"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 280 }}>
              <div className="flex items-center justify-between bg-navy-950 px-5 py-4 text-white" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top, 0px))' }}>
                <LangSwitch />
                <div className="flex items-center gap-2">
                  <button onClick={toggleTheme} aria-label={t('Badilisha mandhari', 'Toggle theme')} className="grid h-10 w-10 place-items-center rounded-full bg-white/10">{theme === 'dark' ? <Sun className="h-4 w-4 text-gold-300" /> : <Moon className="h-4 w-4" />}</button>
                  <button onClick={() => setMobile(false)} aria-label={t('Funga', 'Close')} className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><X className="h-5 w-5" /></button>
                </div>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-3">
                <a href={href('/')} className="block rounded-xl px-3 py-3 font-semibold text-ink hover:bg-ink/5">{t('Mwanzo', 'Home')}</a>
                {NAV.map((n) => n.columns ? (
                  <div key={n.id} className="border-b border-ink/5">
                    <button onClick={() => setAcc(acc === n.id ? null : n.id)} aria-expanded={acc === n.id} className="flex w-full items-center justify-between rounded-xl px-3 py-3 font-semibold text-ink">
                      {x(n.label)} <ChevronDown className={`h-4 w-4 transition ${acc === n.id ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {acc === n.id && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                          {n.columns.map((c) => (
                            <div key={c.title.sw} className="pb-3 pl-3">
                              <p className="px-3 pt-1 text-[11px] font-bold uppercase tracking-[.2em] text-gold-600">{x(c.title)}</p>
                              {c.links.map(([l, to]) => <a key={l.sw} href={href(to)} onClick={() => setMobile(false)} className="block rounded-lg px-3 py-2 text-sm text-ink/75 hover:bg-ink/5">{x(l)}</a>)}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a key={n.id} href={href(n.to)} className="flex items-center gap-2 border-b border-ink/5 px-3 py-3 font-semibold text-ink">{n.hot && <Flame className="h-4 w-4 text-rose-500" />}{x(n.label)}</a>
                ))}
                <div className="mt-3 grid gap-1">
                  {utility.map(([I, l, to]) => <a key={to} href={href(to)} onClick={() => setMobile(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink/70 hover:bg-ink/5"><I className="h-4 w-4 text-gold-600" /> {l}</a>)}
                </div>
              </nav>
              <div className="grid gap-2 border-t border-ink/5 p-4" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))' }}>
                {canInstall && <button onClick={install} className="flex items-center justify-center gap-2 rounded-full border border-gold-400 px-5 py-3 text-sm font-semibold text-ink"><Download className="h-4 w-4" /> {t('Weka App kwenye simu', 'Install the app')}</button>}
                <a href={waLink(t('Habari Desc Point, naomba msaada.', 'Hello Desc Point, I need help.'))} target="_blank" rel="noreferrer" className="btn-gold w-full"><MessageCircle className="h-4 w-4" /> {t('Ongea nasi WhatsApp', 'Chat on WhatsApp')}</a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

function MegaPromo({ id, close }) {
  const { t } = useApp()
  const promo = {
    print: { img: asset('images/work-business-cards.jpg'), title: t('Pakia faili, chukua ikiwa tayari', 'Upload now, collect when ready'), to: '/printing', cta: t('Anza printing', 'Start printing') },
    online: { img: asset('images/poster-heslb-requirements.jpg'), title: t('Msimu wa HESLB: tuma maombi bila makosa', 'HESLB season: apply without mistakes'), to: '/mtandaoni#heslb', cta: t('Ona viambata', 'See requirements') },
    shop: { img: asset('images/casio-fx991es-plus.jpg'), title: t('Casio fx-991ES PLUS — TSh 35,000', 'Casio fx-991ES PLUS — TSh 35,000'), to: '/duka/Shule', cta: t('Nunua sasa', 'Shop now') },
  }[id]
  if (!promo) return null
  return (
    <a href={href(promo.to)} onClick={close} className="group relative block overflow-hidden rounded-2xl bg-navy-900 text-white">
      <SafeImg src={promo.img} alt="" className="h-48 w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-display text-lg font-black leading-snug">{promo.title}</p>
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-gold-300">{promo.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
      </div>
    </a>
  )
}
