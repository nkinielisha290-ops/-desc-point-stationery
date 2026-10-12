import { motion } from 'framer-motion'
import { PRICES } from '../data/site'
import { Reveal, SectionTitle, tsh } from './ui'
import { useApp } from '../lib/store'

export default function Prices() {
  const { t, x } = useApp()
  return (
    <section id="bei" className="relative scroll-mt-20 overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(31,85,255,.35),transparent_45%),radial-gradient(circle_at_90%_80%,rgba(245,184,0,.18),transparent_40%)]" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionTitle light center={false} eyebrow={t('Bei wazi, hakuna kujificha', 'Clear prices, nothing hidden')} title={t('Bei zetu', 'Our prices')} accent={t('zinaeleweka.', 'make sense.')} sub={t('Hizi ni baadhi ya bei zetu za kila siku. Oda za bulk kwa shule, ofisi na makampuni zinapata punguzo maalum.', 'Some of our everyday prices. Bulk orders for schools, offices and companies get special discounts.')} />
          <Reveal delay={0.2} className="flex flex-wrap gap-3 text-sm">
            {['M-Pesa', 'Mixx by Yas', 'Airtel Money', 'HaloPesa', t('Taslimu', 'Cash')].map((m) => (
              <span key={m} className="rounded-full border border-gold-400/30 px-4 py-2 text-gold-300">{m}</span>
            ))}
          </Reveal>
        </div>

        <motion.div initial={{ opacity: 0, rotate: 6, y: 60 }} whileInView={{ opacity: 1, rotate: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="relative">
          <div className="absolute -inset-3 rotate-2 rounded-[36px] bg-gold-400" />
          <div className="ruled relative rounded-[36px] bg-paper p-6 text-navy-900 shadow-2xl sm:p-10">
            <div className="absolute bottom-0 left-12 top-0 w-px bg-rose-400/50" />
            <p className="pl-10 text-xs font-bold sm:text-sm text-royal-600">{t('Orodha ya Bei ✍︎', 'Price List ✍︎')}</p>
            <ul className="mt-4 pl-10">
              {PRICES.map((p, i) => (
                <motion.li key={p.item.sw} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="flex items-end gap-2 py-[7px] leading-[18px]">
                  <span className="font-medium">{x(p.item)}</span>
                  <span className="mb-1 flex-1 border-b-2 border-dotted border-navy-900/20" />
                  <span className="whitespace-nowrap font-display font-black text-navy-900">{tsh(p.price)}</span>
                  <span className="hidden whitespace-nowrap text-xs text-navy-900/50 sm:inline">/ {x(p.unit)}</span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-4 pl-10 text-xs text-navy-900/50">{t('* Bei zinaweza kubadilika kulingana na idadi na aina ya karatasi.', '* Prices may vary with quantity and paper type.')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
