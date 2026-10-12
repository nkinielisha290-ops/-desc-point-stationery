import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Smartphone, Share, PlusSquare, X, Download } from 'lucide-react'
import { BUSINESS } from '../data/site'
import { useApp } from '../lib/store'
import { href } from '../lib/router'
import { asset } from '../lib/asset'

const svg = (d) => ({ className }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden><path d={d} /></svg>
const Instagram = svg('M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.6a5.2 5.2 0 100 10.4 5.2 5.2 0 000-10.4zm0 8.6a3.4 3.4 0 110-6.8 3.4 3.4 0 010 6.8zm5.4-9.9a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z')
const Facebook = svg('M14 13.5h2.5l1-4H14v-2c0-1 0-2 2-2h1.5V2.1C17.2 2.1 16 2 14.6 2 11.7 2 10 3.7 10 6.8v2.7H7v4h3V22h4v-8.5z')

export default function Footer() {
  const { t, x, canInstall, install } = useApp()
  const [howTo, setHowTo] = useState(false)
  const isIOS = typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent)

  const COLS = [
    { title: 'Desc Point', links: [[t('Kuhusu sisi', 'About us'), '/kuhusu'], [t('Kazi zetu', 'Our work'), '/kazi-zetu'], [t('Pata duka', 'Find a store'), '/kuhusu#maduka'], [t('Ushuhuda', 'Reviews'), '/#ushuhuda']] },
    { title: t('Huduma', 'Services'), links: [[t('Printing & photocopy', 'Printing & photocopy'), '/printing'], [t('Design studio', 'Design studio'), '/design'], [t('Huduma za mtandaoni', 'Online services'), '/mtandaoni'], [t('Kozi ya kompyuta', 'Computer course'), '/kozi'], [t('Huduma zote', 'All services'), '/huduma']] },
    { title: t('Taarifa muhimu', 'Useful info'), links: [[t('Duka', 'Shop'), '/duka'], [t('Ofa za wiki', 'Weekly offers'), '/ofa'], [t('Fuatilia oda', 'Track order'), '/fuatilia'], [t('Maswali (FAQ)', 'FAQs'), '/#faq'], [t('Orodha ya bei', 'Price list'), '/printing#bei']] },
  ]

  const onInstall = async () => {
    if (canInstall) { await install(); return }
    setHowTo(true)
  }

  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-x grid gap-10 py-14 lg:grid-cols-[1.3fr_2fr_1.2fr]">
        <div>
          <a href={href('/')} className="flex items-center gap-3">
            <img src={asset('logo.png')} alt="" className="h-14 w-14 rounded-full ring-2 ring-gold-400/60" />
            <span><b className="block font-display text-xl">{BUSINESS.name}</b><span className="text-sm text-gold-300">{BUSINESS.slogan}</span></span>
          </a>
          <p className="mt-5 max-w-xs text-sm text-white/55">Madafu & Zegereni, Kibaha – Pwani · {x(BUSINESS.hours.label)}, {x(BUSINESS.hours.time)}</p>
          <p className="mt-3 text-sm text-white/75"><span className="select-all">{BUSINESS.phoneLocal}</span> · <span className="select-all">{BUSINESS.phone2Local}</span><br /><span className="select-all">{BUSINESS.email}</span></p>
          <div className="mt-5 flex gap-2">
            {[[Instagram, BUSINESS.social.instagram, 'Instagram'], [Facebook, BUSINESS.social.facebook, 'Facebook']].filter(([, h]) => h).map(([I, h, l]) => (
              <a key={l} href={h} target="_blank" rel="noreferrer" aria-label={l} className="grid h-10 w-10 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition hover:bg-gold-400 hover:text-navy-950"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLS.map((c) => (
            <div key={c.title}>
              <p className="text-sm font-bold uppercase tracking-[.15em] text-gold-300">{c.title}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                {c.links.map(([l, to]) => <li key={to + l}><a href={href(to)} className="transition hover:text-white">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Pakua App (kama "Download Yas App") */}
        <div className="rounded-3xl bg-white/[.05] p-6 ring-1 ring-white/10">
          <p className="text-sm font-bold uppercase tracking-[.15em] text-gold-300">{t('Pakua App ya Desc Point', 'Get the Desc Point app')}</p>
          <p className="mt-2 text-sm text-white/60">{t('Agiza, pakia faili na fuatilia oda kutoka kwenye simu yako — hata mtandao ukiwa dhaifu.', 'Order, upload files and track orders from your phone — even on a weak connection.')}</p>
          <div className="mt-5 grid gap-2">
            <button onClick={onInstall} className="flex items-center gap-3 rounded-2xl bg-black px-4 py-2.5 text-left ring-1 ring-white/20 transition hover:ring-gold-400">
              <Smartphone className="h-7 w-7 text-gold-300" />
              <span className="leading-tight"><span className="block text-[10px] uppercase tracking-wider text-white/60">{t('Weka kwenye', 'Install on')}</span><b className="text-base">Android</b></span>
            </button>
            <button onClick={() => setHowTo(true)} className="flex items-center gap-3 rounded-2xl bg-black px-4 py-2.5 text-left ring-1 ring-white/20 transition hover:ring-gold-400">
              <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden><path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9s-2-.9-3.4-.9C5.8 6.8 4 7.9 3.1 9.6c-1.9 3.3-.5 8.2 1.4 10.9.9 1.3 2 2.8 3.4 2.8 1.4-.1 1.9-.9 3.5-.9s2.1.9 3.5.9 2.4-1.4 3.3-2.7c1-1.5 1.5-3 1.5-3.1-.1 0-2.9-1.1-3.3-4.9zM13.8 4.9c.7-.9 1.2-2.1 1.1-3.3-1 0-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.2 1.1.1 2.3-.6 3-1.5z" /></svg>
              <span className="leading-tight"><span className="block text-[10px] uppercase tracking-wider text-white/60">{t('Weka kwenye', 'Add to')}</span><b className="text-base">iPhone</b></span>
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-sm text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. {t('Haki zote zimehifadhiwa.', 'All rights reserved.')}</p>
          <p>{t('Website na', 'Website by')} <span className="text-gold-300">EllieTech Solutions</span></p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-1 hover:text-white">{t('Juu', 'Top')} <ArrowUp className="h-4 w-4" /></button>
        </div>
      </div>

      <AnimatePresence>
        {howTo && (
          <motion.div className="fixed inset-0 z-[100] grid place-items-end bg-navy-950/70 p-4 backdrop-blur-sm sm:place-items-center" onClick={() => setHowTo(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div role="dialog" aria-modal="true" aria-label={t('Jinsi ya kuweka App', 'How to install')} onClick={(e) => e.stopPropagation()}
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              className="w-full max-w-sm rounded-3xl bg-surface p-6 text-ink shadow-2xl" style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}>
              <div className="flex items-start justify-between">
                <img src={asset('logo.png')} alt="" className="h-12 w-12 rounded-xl" />
                <button onClick={() => setHowTo(false)} aria-label={t('Funga', 'Close')} className="grid h-9 w-9 place-items-center rounded-full bg-ink/5"><X className="h-4 w-4" /></button>
              </div>
              <h3 className="mt-4 text-xl font-bold">{t('Weka Desc Point kwenye simu', 'Add Desc Point to your phone')}</h3>
              <ol className="mt-4 space-y-3 text-sm text-ink/75">
                {isIOS ? (<>
                  <li className="flex gap-3"><Share className="h-5 w-5 shrink-0 text-royal-500" /> {t('Fungua website hii kwenye Safari, bonyeza kitufe cha Share (mraba wenye mshale).', 'Open this site in Safari and tap the Share button.')}</li>
                  <li className="flex gap-3"><PlusSquare className="h-5 w-5 shrink-0 text-royal-500" /> {t('Chagua "Add to Home Screen", kisha "Add".', 'Choose "Add to Home Screen", then "Add".')}</li>
                </>) : (<>
                  <li className="flex gap-3"><Download className="h-5 w-5 shrink-0 text-royal-500" /> {t('Fungua website hii kwenye Chrome, bonyeza ⋮ juu kulia.', 'Open this site in Chrome and tap ⋮ at the top right.')}</li>
                  <li className="flex gap-3"><PlusSquare className="h-5 w-5 shrink-0 text-royal-500" /> {t('Chagua "Install app" au "Add to Home screen".', 'Choose "Install app" or "Add to Home screen".')}</li>
                </>)}
              </ol>
              <p className="mt-4 text-xs text-ink/50">{t('App inaonekana kama icon ya Desc Point kwenye simu yako na inafunguka moja kwa moja.', 'The app appears as a Desc Point icon on your phone and opens directly.')}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}
