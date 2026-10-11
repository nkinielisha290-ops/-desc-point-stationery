import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import { TESTIMONIALS, waLink } from '../data/site'
import { Reveal, SectionTitle } from './ui'

const Stars = ({ className = 'h-4 w-4' }) => (
  <div className="flex gap-0.5 text-gold-500">{[...Array(5)].map((_, k) => <Star key={k} className={`${className} fill-current`} />)}</div>
)

function WallCard({ t }) {
  return (
    <figure className="w-[300px] shrink-0 rounded-3xl bg-white p-6 shadow-[0_20px_40px_-24px_rgba(6,20,77,.35)] ring-1 ring-navy-900/5 transition duration-300 hover:-translate-y-1 hover:ring-gold-400 sm:w-[340px]">
      <div className="flex items-center justify-between">
        <Stars />
        <span className="rounded-full bg-navy-900/5 px-2.5 py-1 text-[11px] font-semibold text-navy-900/60">{t.service}</span>
      </div>
      <blockquote className="mt-4 text-[15px] leading-relaxed text-navy-900/80">“{t.text}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-navy-800 to-royal-600 font-display font-black text-gold-300">{t.name[0]}</span>
        <span className="leading-tight"><b className="block text-sm text-navy-900">{t.name}</b><span className="text-xs text-navy-900/55">{t.role}</span></span>
      </figcaption>
    </figure>
  )
}

export default function Testimonials() {
  const [i, setI] = useState(0)
  const n = TESTIMONIALS.length
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % n), 6500); return () => clearInterval(t) }, [n])
  const t = TESTIMONIALS[i]
  const half = Math.ceil(n / 2)
  const rowA = TESTIMONIALS.slice(0, half), rowB = TESTIMONIALS.slice(half)

  return (
    <section id="ushuhuda" className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <SectionTitle eyebrow="Wanachosema wateja" title="Sauti za" accent="wateja wetu." sub="Walimu, wazazi, wanafunzi, maharusi na wafanyabiashara wa Kibaha wanatuamini kila siku." />

        {/* Muhtasari wa ukadiriaji */}
        <Reveal className="mx-auto mb-12 flex max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-full bg-white px-8 py-4 shadow-lg ring-1 ring-navy-900/5">
          <div className="flex items-center gap-3">
            <span className="font-display text-4xl font-black text-navy-900">4.9</span>
            <div><Stars /><p className="text-xs text-navy-900/55">wastani wa ukadiriaji</p></div>
          </div>
          <span className="hidden h-10 w-px bg-navy-900/10 sm:block" />
          <div className="text-center"><p className="font-display text-2xl font-black text-royal-600">5,000+</p><p className="text-xs text-navy-900/55">wateja walioridhika</p></div>
        </Reveal>

        {/* Ushuhuda mkubwa */}
        <Reveal className="relative mx-auto max-w-4xl">
          <motion.div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-r from-gold-400 to-gold-600"
            initial={{ rotate: 0 }} whileInView={{ rotate: -1.2 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} />
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 sm:p-14">
            <Quote className="absolute right-8 top-8 h-24 w-24 text-gold-400/20" />
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -30, filter: 'blur(6px)' }} transition={{ duration: 0.5 }}>
                <div className="flex flex-wrap items-center gap-3"><Stars className="h-5 w-5" /><span className="rounded-full bg-gold-400/20 px-3 py-1 text-xs font-semibold text-gold-700">{t.service}</span></div>
                <p className="mt-6 font-display text-2xl font-medium italic leading-snug text-navy-900 sm:text-3xl">“{t.text}”</p>
                <div className="mt-8 flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-navy-900 font-display text-xl font-black text-gold-300">{t.name[0]}</span>
                  <span><b className="block text-lg">{t.name}</b><span className="text-navy-900/60">{t.role}</span></span>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {TESTIMONIALS.map((_, k) => (
                  <button key={k} onClick={() => setI(k)} aria-label={`Ushuhuda ${k + 1}`} className={`h-2 rounded-full transition-all ${k === i ? 'w-10 bg-gold-500' : 'w-2 bg-navy-900/15'}`} />
                ))}
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => setI((i - 1 + n) % n)} aria-label="Iliyopita" className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-navy-900/15 hover:bg-navy-900 hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
                <button onClick={() => setI((i + 1) % n)} aria-label="Inayofuata" className="grid h-11 w-11 place-items-center rounded-full bg-navy-900 text-white hover:bg-gold-400 hover:text-navy-950"><ChevronRight className="h-5 w-5" /></button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Ukuta wa ushuhuda unaotembea */}
      <div className="relative mt-16 space-y-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee-slow gap-5 hover:[animation-play-state:paused]">
          {[...rowA, ...rowA].map((t, k) => <WallCard key={k} t={t} />)}
        </div>
        <div className="flex w-max animate-marquee-rev gap-5 hover:[animation-play-state:paused]">
          {[...rowB, ...rowB, ...rowB, ...rowB].map((t, k) => <WallCard key={k} t={t} />)}
        </div>
      </div>

      <Reveal className="container-x mt-12 text-center">
        <a href={waLink('Habari Desc Point! Nataka kutoa maoni kuhusu huduma yenu: ')} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gold-400 hover:text-navy-950">
          <MessageCircle className="h-4 w-4" /> Tuachie maoni yako
        </a>
      </Reveal>
    </section>
  )
}
