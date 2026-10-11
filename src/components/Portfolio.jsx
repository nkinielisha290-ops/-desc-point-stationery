import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, MessageCircle, X } from 'lucide-react'
import { PORTFOLIO, PORTFOLIO_CATS, waLink } from '../data/site'
import { useApp } from '../lib/store'
import { SafeImg, SectionTitle } from './ui'

export default function Portfolio() {
  const { t, x } = useApp()
  const [cat, setCat] = useState('all')
  const [open, setOpen] = useState(-1)
  const list = PORTFOLIO.filter((p) => cat === 'all' || p.cat === cat)
  const cur = list[open]

  const go = useCallback((d) => setOpen((i) => (i + d + list.length) % list.length), [list.length])
  useEffect(() => {
    if (open < 0) return
    const k = (e) => { if (e.key === 'Escape') setOpen(-1); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [open, go])

  return (
    <section id="portfolio" className="relative scroll-mt-20 bg-navy-950 py-24 text-white sm:py-32">
      <div className="container-x">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionTitle light center={false} eyebrow={t('Kazi zetu', 'Our work')} title={t('Ushahidi uko', 'The proof is in')} accent={t('kwenye kazi.', 'the work.')}
            sub={t('Baadhi ya kazi tulizowafanyia wateja wa Kibaha na Pwani. Bonyeza picha kuiona kubwa.', 'A few jobs we’ve done for customers in Kibaha and Pwani. Tap an image to view it larger.')} />
          <div className="flex flex-wrap gap-2 lg:mb-12">
            {PORTFOLIO_CATS.map((c) => (
              <button key={c.id} onClick={() => setCat(c.id)} aria-pressed={cat === c.id}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${cat === c.id ? 'text-navy-950' : 'text-white/70 ring-1 ring-white/15 hover:text-white'}`}>
                {cat === c.id && <motion.span layoutId="pf-pill" className="absolute inset-0 rounded-full bg-gold-400" />}
                <span className="relative">{x(c.label)}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.button layout key={p.id} onClick={() => setOpen(i)}
                initial={{ opacity: 0, y: 30, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-3xl text-left ring-1 ring-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400"
                aria-label={`${t('Tazama', 'View')}: ${x(p.title)}`}>
                <SafeImg src={p.img} alt={x(p.title)} className="h-auto w-full transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/20 to-transparent opacity-80 transition group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 transition duration-300 group-hover:translate-y-0">
                  <span className="text-[11px] font-bold uppercase tracking-[.2em] text-gold-300">{x(PORTFOLIO_CATS.find((c) => c.id === p.cat)?.label)}</span>
                  <h3 className="mt-1 font-display text-xl font-bold leading-snug">{x(p.title)}</h3>
                  <p className="mt-1 max-h-0 overflow-hidden text-sm text-white/70 opacity-0 transition-all duration-300 group-hover:max-h-12 group-hover:opacity-100">{x(p.detail)}</p>
                </div>
                <span className="absolute right-4 top-4 grid h-10 w-10 scale-0 place-items-center rounded-full bg-gold-400 text-navy-950 transition group-hover:scale-100"><Expand className="h-4 w-4" /></span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {cur && (
          <motion.div role="dialog" aria-modal="true" aria-label={x(cur.title)} className="fixed inset-0 z-[100] flex flex-col bg-navy-950/95 backdrop-blur-xl"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center justify-between p-4" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top, 0px))' }}>
              <span className="font-display text-sm tabular-nums text-white/60">{open + 1} / {list.length}</span>
              <button onClick={() => setOpen(-1)} aria-label={t('Funga', 'Close')} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"><X /></button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4" onClick={() => setOpen(-1)}>
              <AnimatePresence mode="wait">
                <motion.div key={cur.id} onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.3 }}
                  drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.5}
                  onDragEnd={(_, i) => { if (i.offset.x < -80) go(1); else if (i.offset.x > 80) go(-1) }}
                  className="max-h-full max-w-5xl">
                  <SafeImg src={cur.img} alt={x(cur.title)} className="pointer-events-none mx-auto max-h-[65vh] w-auto rounded-2xl object-contain shadow-2xl" />
                </motion.div>
              </AnimatePresence>
              <button onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label={t('Iliyopita', 'Previous')} className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-gold-400 hover:text-navy-950 sm:left-6"><ChevronLeft /></button>
              <button onClick={(e) => { e.stopPropagation(); go(1) }} aria-label={t('Inayofuata', 'Next')} className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-gold-400 hover:text-navy-950 sm:right-6"><ChevronRight /></button>
            </div>
            <div className="container-x flex flex-col items-center gap-3 py-6 text-center" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom, 0px))' }}>
              <h3 className="font-display text-2xl font-black">{x(cur.title)}</h3>
              <p className="text-white/65">{x(cur.detail)}</p>
              <a href={waLink(t(`Habari Desc Point! Nimeona kazi yenu "${x(cur.title)}". Nataka kitu kama hiki.`, `Hello Desc Point! I saw your work "${x(cur.title)}". I'd like something similar.`))}
                target="_blank" rel="noreferrer" className="btn-gold mt-1"><MessageCircle className="h-4 w-4" /> {t('Nataka kama hii', 'I want one like this')}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
