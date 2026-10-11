import { motion } from 'framer-motion'
import { Check, GraduationCap, MessageCircle } from 'lucide-react'
import { IMAGES, SCHOOL_PACKS, waLink } from '../data/site'
import { Reveal, SafeImg, SectionTitle, Stagger, TiltCard, rise, tsh } from './ui'

export default function School() {
  return (
    <section id="shule" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-white to-paper py-24 sm:py-32">
      <div className="container-x">
        <div className="mb-16 grid items-center gap-10 lg:grid-cols-2">
          <SectionTitle center={false} eyebrow="Back to school 🎒" title="Vifurushi vya shule," accent="tayari kwenye mfuko." sub="Mzazi, usizunguke madukani. Chagua kifurushi kinachoendana na darasa la mtoto wako — tunakuandalia kila kitu, hata kuandika majina kwenye madaftari." />
          <Reveal delay={0.15} className="relative">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] border-2 border-dashed border-gold-500" />
            <SafeImg src={IMAGES.school} alt="Vifaa vya shule" className="relative aspect-[16/10] w-full rounded-[2rem] object-cover shadow-2xl" />
            <div className="absolute -bottom-6 right-6 flex items-center gap-3 rounded-2xl bg-navy-900 px-5 py-4 text-white shadow-xl">
              <GraduationCap className="h-8 w-8 text-gold-400" />
              <span className="text-sm leading-tight"><b className="block font-display text-lg">Shule & taasisi</b>Bei maalum kwa bulk</span>
            </div>
          </Reveal>
        </div>

        <Stagger className="grid gap-6 lg:grid-cols-3">
          {SCHOOL_PACKS.map((p, i) => (
            <TiltCard key={p.name} variants={rise} className="h-full rounded-[2rem]">
              <motion.div whileHover={{ y: -8 }}
                className={`relative flex h-full flex-col rounded-[2rem] p-8 ${p.featured ? 'bg-navy-900 text-white shadow-2xl shadow-navy-900/40 ring-2 ring-gold-400' : 'card'}`}>
                {p.featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gold-400 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-navy-950">Kinachopendwa zaidi</span>}
                <p className={`font-script text-2xl ${p.featured ? 'text-gold-300' : 'text-gold-600'}`}>{p.level}</p>
                <h3 className="font-display text-3xl font-black">{p.name}</h3>
                <p className="mt-4 font-display text-4xl font-black">
                  <span className={p.featured ? 'gold-text' : 'text-royal-600'}>{tsh(p.price)}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-3 text-sm"><Check className={`h-5 w-5 shrink-0 ${p.featured ? 'text-gold-400' : 'text-royal-600'}`} />{it}</li>
                  ))}
                </ul>
                <a href={waLink(`Habari, nataka ${p.name} (${p.level}) - ${tsh(p.price)}.`)} target="_blank" rel="noreferrer"
                  className={`mt-8 ${p.featured ? 'btn-gold' : 'inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-3 font-semibold text-white transition hover:bg-gold-400 hover:text-navy-950'}`}>
                  <MessageCircle className="h-4 w-4" /> Agiza kifurushi
                </a>
              </motion.div>
            </TiltCard>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
