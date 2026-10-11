import { motion } from 'framer-motion'
import { Send, Wand2, PackageCheck } from 'lucide-react'
import { SectionTitle } from './ui'

const STEPS = [
  [Send, 'Tuma kazi yako', 'Tuma faili, wazo au orodha ya bidhaa kwa WhatsApp, email, au fika dukani.'],
  [Wand2, 'Tunaifanyia kazi', 'Tunadesign, tunachapa au tunaandaa oda yako kwa umakini — unapata preview kwanza.'],
  [PackageCheck, 'Chukua au tukuletee', 'Lipa kwa simu au taslimu, kisha chukua dukani au tukuletee Kibaha.'],
]

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 text-white sm:py-28">
      <div className="paper-grain absolute inset-0 opacity-20" />
      <div className="container-x relative">
        <SectionTitle light eyebrow="Rahisi kama 1, 2, 3" title="Jinsi ya" accent="kuagiza." />
        <div className="relative grid gap-10 md:grid-cols-3">
          <svg className="absolute left-0 right-0 top-10 hidden h-4 w-full md:block" preserveAspectRatio="none" viewBox="0 0 100 4">
            <motion.path d="M5 2 Q 30 -2, 50 2 T 95 2" fill="none" stroke="#f5b800" strokeWidth=".5" strokeDasharray="1.5 1.5"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} />
          </svg>
          {STEPS.map(([I, t, d], i) => (
            <motion.div key={t} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.25, duration: 0.7 }} className="relative text-center">
              <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold-400 text-navy-950 shadow-[0_0_0_10px_rgba(245,184,0,.15)]">
                <I className="h-9 w-9" />
                <span className="absolute -right-2 -top-2 grid h-8 w-8 place-items-center rounded-full bg-white font-display font-black text-navy-900">{i + 1}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold">{t}</h3>
              <p className="mx-auto mt-2 max-w-xs text-white/65">{d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
