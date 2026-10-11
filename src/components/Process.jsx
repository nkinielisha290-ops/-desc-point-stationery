import { motion } from 'framer-motion'
import { Send, Wand2, PackageCheck } from 'lucide-react'
import { SectionTitle } from './ui'
import { useApp } from '../lib/store'

export default function Process() {
  const { t } = useApp()
  const STEPS = [
    [Send, t('Tuma kazi yako', 'Send your job'), t('Pakia faili hapa, tuma wazo au orodha kwa WhatsApp, au fika dukani.', 'Upload a file here, send an idea or list on WhatsApp, or visit the shop.')],
    [Wand2, t('Tunaifanyia kazi', 'We get to work'), t('Tunadesign, tunachapa au tunaandaa oda yako kwa umakini — unapata preview kwanza.', 'We design, print or prepare your order with care — you see a preview first.')],
    [PackageCheck, t('Fuatilia & chukua', 'Track & collect'), t('Fuatilia oda kwa namba yako, lipa kwa simu au taslimu, kisha chukua au tukuletee.', 'Track with your order number, pay by mobile or cash, then collect or get it delivered.')],
  ]
  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 text-white sm:py-28">
      <div className="paper-grain absolute inset-0 opacity-20" />
      <div className="container-x relative">
        <SectionTitle light eyebrow={t('Rahisi kama 1, 2, 3', 'Easy as 1, 2, 3')} title={t('Jinsi ya', 'How to')} accent={t('kuagiza.', 'order.')} />
        <div className="relative grid gap-10 md:grid-cols-3">
          <svg className="absolute left-0 right-0 top-10 hidden h-4 w-full md:block" preserveAspectRatio="none" viewBox="0 0 100 4">
            <motion.path d="M5 2 Q 30 -2, 50 2 T 95 2" fill="none" stroke="#f5b800" strokeWidth=".5" strokeDasharray="1.5 1.5"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} />
          </svg>
          {STEPS.map(([I, title, d], i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.25, duration: 0.7 }} className="relative text-center">
              <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold-400 text-navy-950 shadow-[0_0_0_10px_rgba(245,184,0,.15)]">
                <I className="h-9 w-9" />
                <span className="absolute -right-2 -top-2 grid h-8 w-8 place-items-center rounded-full bg-white font-display font-black text-navy-900">{i + 1}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold">{title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-white/65">{d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
