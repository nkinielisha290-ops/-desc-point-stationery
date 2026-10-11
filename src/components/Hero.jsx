import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MessageCircle, Sparkles, Star, Printer, PenTool, Clock, Upload } from 'lucide-react'
import { BUSINESS, IMAGES, waLink } from '../data/site'
import { useOpenStatus } from './useOpenStatus'
import { useApp } from '../lib/store'


function Floater({ className, children, delay = 0, r = '0deg' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 + delay, duration: 0.8, type: 'spring' }}
      className={`absolute hidden md:block ${className}`}
    >
      <div className="animate-floaty" style={{ '--r': r, animationDelay: `${delay}s` }}>{children}</div>
    </motion.div>
  )
}

export default function Hero() {
  const { t, x } = useApp()
  const WORDS = t(['Printing', 'Design', 'Branding', 'Vifaa vya Shule', 'Kadi za Harusi', 'Banners'], ['Printing', 'Design', 'Branding', 'School Supplies', 'Wedding Cards', 'Banners'])
  const [i, setI] = useState(0)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, 220])
  const fade = useTransform(scrollY, [0, 500], [1, 0])
  const status = useOpenStatus()

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % 6), 2600)
    return () => clearInterval(id)
  }, [])

  const title = t('Kila Wazo Lako,', 'Every Idea You Have,').split(' ')

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-950 pb-20 pt-32">
      {/* Picha kubwa yenye Ken Burns + parallax */}
      <motion.div style={{ y }} className="absolute inset-0 -z-20">
        <img src={IMAGES.hero} alt={t("Meza ya kazi ya ubunifu yenye laptop, kalamu na michoro", "A creative desk with a laptop, pens and sketches")} className="h-full w-full animate-kenburns object-cover object-[50%_62%] brightness-110 saturate-[1.15]" fetchpriority="high" onError={(e) => (e.currentTarget.style.visibility = "hidden")} />
      </motion.div>
      {/* Kivuli chepesi: kinalinda maandishi tu, picha inang'aa */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/90 via-navy-950/55 to-navy-950/25 lg:bg-[linear-gradient(95deg,rgba(3,12,51,.86)_0%,rgba(6,20,77,.62)_34%,rgba(6,20,77,.14)_60%,transparent_78%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_35%,rgba(255,226,122,.18),transparent_55%)] mix-blend-screen" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-navy-950/80 to-transparent" />

      {/* Pete za dhahabu zinazozunguka (kama logo) */}
      <div className="absolute -right-40 top-1/2 -z-10 hidden h-[640px] w-[640px] -translate-y-1/2 animate-spinslow rounded-full border-2 border-dashed border-gold-400/25 lg:block" />
      <div className="absolute -right-24 top-1/2 -z-10 hidden h-[480px] w-[480px] -translate-y-1/2 rounded-full border border-gold-300/20 lg:block" />

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.25fr_.9fr]">
        <motion.div style={{ opacity: fade }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-white/5 px-4 py-2 text-sm text-gold-300 backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${status.open ? 'bg-emerald-400' : 'bg-rose-400'} opacity-75`} />
              <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${status.open ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            </span>
            <span className="text-white/90">{status.open ? t('Tuko wazi sasa', 'Open now') : t('Tumefunga kwa sasa', 'Closed now')}</span>
            <span className="text-white/40">·</span>
            <span className="text-gold-300">Kibaha, Pwani</span>
          </motion.div>

          <h1 className="font-display text-5xl font-black leading-[0.98] tracking-tight text-white [text-shadow:0_4px_30px_rgba(3,12,51,.55)] sm:text-6xl lg:text-[5.4rem]">
            {title.map((w, k) => (
              <motion.span key={title.join() + k} className="mr-4 inline-block"
                initial={{ opacity: 0, y: 60, rotate: 6 }} animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.15 + k * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>{w}<span className="sr-only"> </span></motion.span>
            ))}
            <br />
            <motion.span key={t('a', 'b')} className="gold-text inline-block italic"
              initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9 }}>
              {t('Tunalichora.', 'We Design It.')}
            </motion.span>
          </h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            className="mt-7 flex flex-wrap items-center gap-3 text-lg font-medium text-white sm:text-2xl">
            <span className="drop-shadow">{t('Tunaongoza kwa', 'Leaders in')}</span>
            <motion.span layout transition={{ layout: { type: 'spring', stiffness: 300, damping: 30 } }}
              className="relative inline-flex items-center overflow-hidden rounded-2xl bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 px-4 py-1.5 shadow-[0_10px_30px_-8px_rgba(245,184,0,.7)] ring-1 ring-white/40 sm:px-5 sm:py-2">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={WORDS[i]} className="flex whitespace-nowrap font-display text-xl font-black italic leading-none text-navy-950 sm:text-3xl"
                  initial="hidden" animate="show" exit="out"
                  variants={{ show: { transition: { staggerChildren: 0.035 } }, out: { transition: { staggerChildren: 0.02 } } }}>
                  {WORDS[i].split('').map((ch, k) => (
                    <motion.span key={k} className="inline-block"
                      variants={{ hidden: { y: '110%', opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 22 } }, out: { y: '-110%', opacity: 0, transition: { duration: 0.18 } } }}>
                      {ch === ' ' ? '\u00A0' : ch}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
              <span className="pointer-events-none absolute inset-0 -translate-x-full animate-[sweep_2.2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </motion.span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-white/90 [text-shadow:0_2px_14px_rgba(3,12,51,.7)]">
            {t('Printing, photocopy, graphic design, branding, vifaa vya shule na ofisi, na huduma zote za mtandaoni — sehemu moja, kwa ubora wa dhahabu.', 'Printing, photocopying, graphic design, branding, school and office supplies, and every online service — in one place, with gold-standard quality.')}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="mt-9 flex flex-wrap gap-3">
            <a href={waLink(t(`Habari ${BUSINESS.name}! Nataka kuweka oda.`, `Hello ${BUSINESS.name}! I'd like to place an order.`))} target="_blank" rel="noreferrer" className="btn-gold group text-base">
              <MessageCircle className="h-5 w-5" /> {t('Agiza kwa WhatsApp', 'Order on WhatsApp')}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a href="#printing" className="btn-ghost text-base"><Upload className="h-5 w-5" /> {t('Pakia faili uprint', 'Upload a file to print')}</a>
          </motion.div>

          <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {[['40+', t('Huduma', 'Services')], ['2', t('Matawi Kibaha', 'Kibaha branches')], ['6', t('Siku kwa wiki', 'Days a week')]].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl font-black text-gold-300">{n}</dt>
                <dd className="text-sm text-white/85 [text-shadow:0_1px_8px_rgba(3,12,51,.8)]">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Upande wa kulia: logo kama medali + kadi zinazoelea */}
        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <motion.div initial={{ opacity: 0, scale: 0.5, rotate: -30 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 1.2, type: 'spring', bounce: 0.35 }} className="absolute inset-[8%]">
            <div className="absolute inset-0 rounded-full bg-gold-400/30 blur-3xl" />
            <motion.img src="/logo.png" alt="Desc Point Stationery – Quality arts and designing"
              className="relative h-full w-full rounded-full shadow-[0_40px_80px_-20px_rgba(0,0,0,.7)] ring-4 ring-gold-400/50"
              animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
          </motion.div>

          <Floater className="-left-10 top-8" delay={0} r="-6deg">
            <div className="flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-2xl">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-900 text-gold-300"><Printer className="h-5 w-5" /></span>
              <span className="text-sm leading-tight"><b className="block text-navy-900">{t('Printing ya haraka', 'Fast printing')}</b><span className="text-navy-900/60">{t('Rangi & B/W', 'Colour & B/W')}</span></span>
            </div>
          </Floater>
          <Floater className="-right-6 bottom-16" delay={0.6} r="5deg">
            <div className="flex items-center gap-3 rounded-2xl bg-gold-400 px-4 py-3 shadow-2xl">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-950 text-gold-300"><PenTool className="h-5 w-5" /></span>
              <span className="text-sm leading-tight text-navy-950"><b className="block">{t('Design ya kisanii', 'Artistic design')}</b>{t('Logo · Kadi · Banners', 'Logos · Cards · Banners')}</span>
            </div>
          </Floater>
          <Floater className="-left-4 bottom-0" delay={1.1} r="-3deg">
            <div className="rounded-2xl bg-navy-900/90 px-4 py-3 text-white shadow-2xl ring-1 ring-gold-400/30 backdrop-blur">
              <div className="flex gap-0.5 text-gold-400">{[...Array(5)].map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div>
              <p className="mt-1 text-xs text-white/70">{t('“Kazi safi, kwa wakati!”', '“Clean work, on time!”')}</p>
            </div>
          </Floater>
          <Floater className="right-2 top-0" delay={1.5} r="8deg">
            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-navy-900 shadow-xl">
              <Clock className="h-4 w-4 text-gold-600" /> {x({ sw: '2:00 asubuhi – 2:00 usiku', en: '8 AM – 8 PM' })}
            </div>
          </Floater>
        </div>
      </div>

      <motion.a href="#huduma" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[.3em] text-white/50 sm:flex">
        <Sparkles className="h-4 w-4 text-gold-400" /> {t('Shuka chini', 'Scroll down')}
        <span className="h-10 w-px bg-gradient-to-b from-gold-400 to-transparent" />
      </motion.a>
    </section>
  )
}
