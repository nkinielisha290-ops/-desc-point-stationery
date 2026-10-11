import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Printer, Layers, PenTool, Shirt, Globe, Briefcase, Check, ArrowUpRight } from 'lucide-react'
import { SERVICE_GROUPS, waLink } from '../data/site'
import { SectionTitle, Stagger, rise } from './ui'

const ICONS = { Printer, Layers, PenTool, Shirt, Globe, Briefcase }

export default function Services() {
  const [active, setActive] = useState(SERVICE_GROUPS[0].id)
  const g = SERVICE_GROUPS.find((s) => s.id === active)
  const Icon = ICONS[g.icon]

  return (
    <section id="huduma" className="paper-grain relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <SectionTitle eyebrow="Huduma zetu" title="Kila kitu cha stationery," accent="sehemu moja." sub="Zaidi ya huduma 40 zinazohitajika kila siku Tanzania — kwa wanafunzi, walimu, wafanyabiashara, ofisi na maharusi." />

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* Tabs */}
          <Stagger className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {SERVICE_GROUPS.map((s) => {
              const I = ICONS[s.icon]
              const on = s.id === active
              return (
                <motion.button key={s.id} variants={rise} onClick={() => setActive(s.id)}
                  className={`relative flex shrink-0 items-center gap-3 rounded-2xl px-5 py-4 text-left font-semibold transition ${on ? 'text-white' : 'bg-white text-navy-900 hover:bg-navy-900/5'}`}>
                  {on && <motion.span layoutId="svc-pill" className="absolute inset-0 -z-0 rounded-2xl bg-navy-900 shadow-xl shadow-navy-900/30" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />}
                  <I className={`relative h-5 w-5 ${on ? 'text-gold-400' : 'text-royal-600'}`} />
                  <span className="relative">{s.title}</span>
                </motion.button>
              )
            })}
          </Stagger>

          {/* Panel */}
          <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-900 via-navy-800 to-royal-600 p-8 text-white shadow-2xl sm:p-12">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[28px] border-gold-400/10" />
            <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-gold-400/10 blur-2xl" />
            <AnimatePresence mode="wait">
              <motion.div key={g.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.45 }} className="relative">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gold-400 text-navy-950 shadow-lg shadow-gold-500/30"><Icon className="h-8 w-8" /></span>
                  <div>
                    <h3 className="font-display text-3xl font-black sm:text-4xl">{g.title}</h3>
                    <p className="font-script text-2xl text-gold-300">{g.blurb}</p>
                  </div>
                </div>
                <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                  {g.items.map((it, k) => (
                    <motion.li key={it} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * k }}
                      className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10 backdrop-blur transition hover:bg-white/10 hover:ring-gold-400/40">
                      <Check className="h-5 w-5 shrink-0 text-gold-400" /> {it}
                    </motion.li>
                  ))}
                </ul>
                <a href={waLink(`Habari, naomba maelezo/bei ya huduma: ${g.title}`)} target="_blank" rel="noreferrer" className="btn-gold mt-10">
                  Omba bei ya {g.title} <ArrowUpRight className="h-4 w-4" />
                </a>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
