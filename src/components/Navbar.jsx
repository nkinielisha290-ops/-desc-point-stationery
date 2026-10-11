import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ShoppingBag, MessageCircle, Moon, Sun, Heart, Download } from 'lucide-react'
import { BUSINESS, waLink } from '../data/site'
import { useApp } from '../lib/store'
import { asset } from '../lib/asset'

export default function Navbar() {
  const { t, lang, setLang, theme, toggleTheme, count, setCartOpen, wishlist, canInstall, install } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const LINKS = [
    [t('Gundua', 'Explore'), '#gundua'],
    [t('Pakia faili', 'Upload'), '#printing'],
    [t('Design', 'Design'), '#design'],
    [t('Kazi zetu', 'Portfolio'), '#portfolio'],
    [t('Ofa', 'Offers'), '#ofa'],
    [t('Fuatilia oda', 'Track order'), '#fuatilia'],
    [t('Mawasiliano', 'Contact'), '#mawasiliano'],
  ]

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  const iconBtn = 'relative grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400'

  const LangSwitch = ({ big = false }) => (
    <div role="group" aria-label={t('Lugha', 'Language')} className={`flex rounded-full bg-white/10 p-1 text-xs font-bold ${big ? 'text-sm' : ''}`}>
      {['sw', 'en'].map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
          className={`relative rounded-full px-2.5 py-1.5 uppercase transition ${lang === l ? 'text-navy-950' : 'text-white/70 hover:text-white'}`}>
          {lang === l && <motion.span layoutId={big ? 'lang-big' : 'lang'} className="absolute inset-0 rounded-full bg-gold-400" />}
          <span className="relative">{l}</span>
        </button>
      ))}
    </div>
  )

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-navy-950/85 py-2 shadow-2xl shadow-navy-950/30 backdrop-blur-xl' : 'py-3 sm:py-4'}`}
>
      <nav className="container-x flex items-center justify-between gap-3">
        <a href="#" className="group flex shrink-0 items-center gap-3">
          <motion.img src={asset('logo.png')} alt="Desc Point Stationery logo"
            className={`rounded-full ring-2 ring-gold-400/70 transition-all duration-500 ${scrolled ? 'h-10 w-10' : 'h-12 w-12 sm:h-14 sm:w-14'}`}
            whileHover={{ rotate: 360 }} transition={{ duration: 0.9 }} />
          <span className="hidden leading-none min-[380px]:block">
            <span className="block font-display text-lg font-black text-white sm:text-xl">Desc Point</span>
            <span className="font-script text-lg text-gold-300">Stationery</span>
          </span>
        </a>

        <ul className="hidden items-center xl:flex">
          {LINKS.map(([l, h]) => (
            <li key={h}>
              <a href={h} className="group relative whitespace-nowrap px-2.5 py-2 text-sm font-medium text-white/85 transition hover:text-white">
                {l}
                <span className="absolute inset-x-2.5 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded bg-gold-400 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="hidden sm:block"><LangSwitch /></div>
          <button onClick={toggleTheme} aria-label={theme === 'dark' ? t('Mwanga', 'Light mode') : t('Giza', 'Dark mode')} className={iconBtn}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={theme} initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }} transition={{ duration: 0.25 }}>
                {theme === 'dark' ? <Sun className="h-[18px] w-[18px] text-gold-300" /> : <Moon className="h-[18px] w-[18px]" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <a href="#bidhaa" aria-label={t('Ninavyovipenda', 'Wishlist')} className={`${iconBtn} hidden sm:grid`}>
            <Heart className={`h-[18px] w-[18px] ${wishlist.length ? 'fill-rose-400 text-rose-400' : ''}`} />
            {wishlist.length > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">{wishlist.length}</span>}
          </a>
          <button onClick={() => setCartOpen(true)} aria-label={t('Cart yangu', 'My cart')} className={iconBtn}>
            <ShoppingBag className="h-[18px] w-[18px]" />
            {count > 0 && (
              <motion.span key={count} initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold-400 px-1 text-[10px] font-bold text-navy-950">{count}</motion.span>
            )}
          </button>
          {canInstall && (
            <button onClick={install} className="hidden items-center gap-1.5 rounded-full border border-gold-400/60 px-3 py-2 text-xs font-semibold text-gold-300 transition hover:bg-gold-400 hover:text-navy-950 lg:flex">
              <Download className="h-4 w-4" /> {t('Weka App', 'Install app')}
            </button>
          )}
          <a href={waLink(t(`Habari ${BUSINESS.name}, naomba msaada.`, `Hello ${BUSINESS.name}, I need help.`))} target="_blank" rel="noreferrer" className="btn-gold hidden !px-4 !py-2.5 text-sm md:inline-flex">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <button onClick={() => setOpen(true)} aria-label={t('Fungua menyu', 'Open menu')} className={`${iconBtn} xl:hidden`}>
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[70] overflow-y-auto bg-navy-950/97 backdrop-blur-xl xl:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="container-x flex items-center justify-between py-4">
              <img src={asset('logo.png')} alt="" className="h-12 w-12 rounded-full" />
              <div className="flex items-center gap-2">
                <LangSwitch big />
                <button onClick={() => setOpen(false)} aria-label={t('Funga', 'Close')} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white"><X /></button>
              </div>
            </div>
            <ul className="container-x mt-4 space-y-1">
              {LINKS.map(([l, h], i) => (
                <motion.li key={h} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <a href={h} onClick={() => setOpen(false)} className="block border-b border-white/10 py-3.5 font-display text-2xl font-bold text-white hover:text-gold-300 sm:text-3xl">{l}</a>
                </motion.li>
              ))}
            </ul>
            <div className="container-x mt-8 grid gap-3 pb-10">
              {canInstall && (
                <button onClick={() => { install(); setOpen(false) }} className="flex w-full items-center justify-center gap-2 rounded-full border border-gold-400 px-6 py-3 font-semibold text-gold-300">
                  <Download className="h-5 w-5" /> {t('Weka kama App kwenye simu', 'Install as a phone app')}
                </button>
              )}
              <a href={waLink(t('Habari, naomba msaada.', 'Hello, I need help.'))} target="_blank" rel="noreferrer" className="btn-gold w-full"><MessageCircle className="h-5 w-5" /> {t('Ongea nasi WhatsApp', 'Chat with us on WhatsApp')}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
