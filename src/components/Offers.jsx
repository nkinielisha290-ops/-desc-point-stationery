import { motion } from 'framer-motion'
import { ShoppingBag, Timer, Tag } from 'lucide-react'
import { ALL_ITEMS, OFFERS } from '../data/site'
import { useApp } from '../lib/store'
import { useCountdown } from '../lib/countdown'
import { SafeImg, SectionTitle, Stagger, rise, tsh } from './ui'

function Unit({ v, l }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative grid h-16 w-14 place-items-center overflow-hidden rounded-xl bg-navy-950 font-display text-3xl font-black tabular-nums text-gold-300 shadow-inner ring-1 ring-gold-400/30 sm:h-20 sm:w-20 sm:text-4xl">
        <motion.span key={v} initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
          {String(v).padStart(2, '0')}
        </motion.span>
        <span className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
      </div>
      <span className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">{l}</span>
    </div>
  )
}

export default function Offers() {
  const { t, x, add, notify } = useApp()
  const { d, h, m, s } = useCountdown(OFFERS[0]?.endsAt)
  if (!OFFERS.length) return null

  return (
    <section id="ofa" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-rose-950 py-24 text-white sm:py-28">
      <div className="container-x relative">
        <div className="mb-12 flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle light center={false} eyebrow={t('Ofa za wiki hii 🔥', 'This week’s deals 🔥')} title={t('Bei za kushtua,', 'Prices that shock,')} accent={t('muda unakwisha.', 'time is running out.')}
            sub={t('Ofa mpya kila wiki. Zikiisha, zimeisha — agiza kabla ya Jumamosi saa 2 usiku.', 'New deals every week. When they’re gone, they’re gone — order before Saturday 8 PM.')} />
          <div className="shrink-0" role="timer" aria-label={t('Muda uliobaki', 'Time left')}>
            <p className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-gold-300 lg:justify-start"><Timer className="h-4 w-4" /> {t('Zinaisha baada ya', 'Ending in')}</p>
            <div className="flex items-start gap-2 sm:gap-3">
              <Unit v={d} l={t('Siku', 'Days')} /><span className="pt-4 text-2xl font-black text-white/30 sm:pt-6">:</span>
              <Unit v={h} l={t('Saa', 'Hrs')} /><span className="pt-4 text-2xl font-black text-white/30 sm:pt-6">:</span>
              <Unit v={m} l={t('Dak', 'Min')} /><span className="pt-4 text-2xl font-black text-white/30 sm:pt-6">:</span>
              <Unit v={s} l={t('Sek', 'Sec')} />
            </div>
          </div>
        </div>

        <Stagger className="grid gap-6 md:grid-cols-3">
          {OFFERS.map((o) => {
            const item = ALL_ITEMS.find((i) => i.id === o.itemId)
            const save = o.oldPrice - o.price
            return (
              <motion.article key={o.id} variants={rise} whileHover={{ y: -8 }} className="group relative overflow-hidden rounded-[36px] bg-white/[.06] ring-1 ring-white/10">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SafeImg src={item?.img} alt={x(o.title)} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
                  <motion.span initial={{ rotate: -12, scale: 0 }} whileInView={{ rotate: -8, scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', delay: 0.3 }}
                    className="absolute left-4 top-4 rounded-xl bg-rose-500 px-3 py-1.5 font-display text-lg font-black shadow-lg">{x(o.badge)}</motion.span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-black">{x(o.title)}</h3>
                  <p className="mt-1 text-sm text-white/60">{x(o.note)}</p>
                  <div className="mt-4 flex flex-wrap items-baseline gap-x-3">
                    <span className="gold-text font-display text-3xl font-black tabular-nums">{tsh(o.price)}</span>
                    <span className="text-white/40 line-through tabular-nums">{tsh(o.oldPrice)}</span>
                  </div>
                  <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-300"><Tag className="h-3 w-3" /> {t('Unaokoa', 'You save')} {tsh(save)}</p>
                  <button onClick={() => { add({ ...item, id: `offer-${o.id}`, price: o.price, name: o.title, kind: item?.id?.startsWith('s') ? 'service' : 'product' }); notify(t('Ofa imeongezwa kwenye cart', 'Deal added to cart')) }}
                    className="btn-gold mt-5 w-full"><ShoppingBag className="h-4 w-4" /> {t('Chukua ofa', 'Grab the deal')}</button>
                </div>
              </motion.article>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
