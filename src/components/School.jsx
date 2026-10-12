import { motion } from 'framer-motion'
import { Check, GraduationCap, ShoppingBag, MessageCircle } from 'lucide-react'
import { IMAGES, SCHOOL_PACKS, waLink } from '../data/site'
import { useApp } from '../lib/store'
import { Reveal, SafeImg, SectionTitle, Stagger, TiltCard, rise, tsh } from './ui'

export default function School() {
  const { t, x, add, notify } = useApp()
  return (
    <section id="shule" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-surface to-canvas py-24 sm:py-32">
      <div className="container-x">
        <div className="mb-16 grid items-center gap-10 lg:grid-cols-2">
          <SectionTitle center={false} eyebrow={t('Back to school 🎒', 'Back to school 🎒')} title={t('Vifurushi vya shule,', 'School packs,')} accent={t('tayari kwenye mfuko.', 'ready in the bag.')}
            sub={t('Mzazi, usizunguke madukani. Chagua kifurushi kinachoendana na darasa la mtoto wako — tunakuandalia kila kitu, hata kuandika majina kwenye madaftari.', 'Parents, skip the shop-hopping. Pick the pack for your child’s grade — we prepare everything, even writing names on the books.')} />
          <Reveal delay={0.15} className="relative">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-[36px] border-2 border-dashed border-gold-500" />
            <SafeImg src={IMAGES.school} alt={t('Vifaa vya shule', 'School supplies')} className="relative aspect-[4/3] w-full rounded-[36px] object-cover object-[50%_30%] shadow-2xl" />
            <div className="absolute -bottom-6 right-6 flex items-center gap-3 rounded-2xl bg-navy-900 px-5 py-4 text-white shadow-xl">
              <GraduationCap className="h-8 w-8 text-gold-400" />
              <span className="text-sm leading-tight"><b className="block font-display text-lg">{t('Shule & taasisi', 'Schools & institutions')}</b>{t('Bei maalum kwa bulk', 'Special bulk pricing')}</span>
            </div>
          </Reveal>
        </div>

        <Stagger className="grid gap-6 lg:grid-cols-3">
          {SCHOOL_PACKS.map((p) => (
            <TiltCard key={p.id} variants={rise} className="h-full rounded-[36px]">
              <motion.div whileHover={{ y: -8 }}
                className={`relative flex h-full flex-col rounded-[36px] p-8 ${p.featured ? 'bg-navy-900 text-white shadow-2xl shadow-navy-900/40 ring-2 ring-gold-400' : 'card'}`}>
                {p.featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold-400 px-4 py-1.5 text-xs font-black text-navy-950">{t('Kinachopendwa zaidi', 'Most popular')}</span>}
                <p className={`text-xs font-bold sm:text-sm ${p.featured ? 'text-gold-300' : 'text-gold-600'}`}>{x(p.level)}</p>
                <h3 className="font-display text-3xl font-black">{x(p.name)}</h3>
                <p className="mt-4 font-display text-4xl font-black tabular-nums">
                  <span className={p.featured ? 'gold-text' : 'text-royal-500'}>{tsh(p.price)}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.items.map((it) => (
                    <li key={it.sw} className="flex gap-3 text-sm"><Check className={`h-5 w-5 shrink-0 ${p.featured ? 'text-gold-400' : 'text-royal-500'}`} />{x(it)}</li>
                  ))}
                </ul>
                <div className="mt-8 grid gap-2">
                  <button onClick={() => { add({ ...p, unit: { sw: 'kifurushi', en: 'pack' }, img: IMAGES.school }); notify(t('Kifurushi kimeongezwa kwenye cart', 'Pack added to cart')) }}
                    className={p.featured ? 'btn-gold' : 'inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-3 font-semibold text-white transition hover:bg-gold-400 hover:text-navy-950 dark:bg-gold-400 dark:text-navy-950'}>
                    <ShoppingBag className="h-4 w-4" /> {t('Ongeza kwenye cart', 'Add to cart')}
                  </button>
                  <a href={waLink(t(`Habari, nataka ${x(p.name)} (${x(p.level)}) - ${tsh(p.price)}.`, `Hello, I'd like the ${x(p.name)} (${x(p.level)}) - ${tsh(p.price)}.`))} target="_blank" rel="noreferrer"
                    className={`flex items-center justify-center gap-2 py-2 text-sm font-semibold ${p.featured ? 'text-gold-300' : 'text-ink/70'} hover:underline`}>
                    <MessageCircle className="h-4 w-4" /> {t('Uliza kwa WhatsApp', 'Ask on WhatsApp')}
                  </a>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
