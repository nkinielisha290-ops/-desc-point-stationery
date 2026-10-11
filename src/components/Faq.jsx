import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FAQS } from '../data/site'
import { Reveal, SectionTitle } from './ui'

export default function Faq() {
  const [o, setO] = useState(0)
  return (
    <section className="py-24 sm:py-28">
      <div className="container-x max-w-3xl">
        <SectionTitle eyebrow="Maswali ya mara kwa mara" title="Una" accent="swali?" />
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <div className={`overflow-hidden rounded-2xl transition ${o === i ? 'bg-navy-900 text-white' : 'bg-white ring-1 ring-navy-900/10'}`}>
                <button onClick={() => setO(o === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold sm:p-6">
                  {f.q}
                  <motion.span animate={{ rotate: o === i ? 45 : 0 }} className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${o === i ? 'bg-gold-400 text-navy-950' : 'bg-navy-900/5'}`}><Plus className="h-4 w-4" /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {o === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.35 }}>
                      <p className="px-5 pb-6 text-white/75 sm:px-6">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
