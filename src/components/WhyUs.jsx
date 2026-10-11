import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import { Zap, Gem, Wallet, Palette, ShieldCheck, Truck } from 'lucide-react'
import { IMAGES } from '../data/site'
import { Reveal, SafeImg, SectionTitle, Stagger, rise } from './ui'

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2, ease: 'easeOut', onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>
}

const REASONS = [
  [Zap, 'Kasi ya ajabu', 'Kazi nyingi zinakamilika ukisubiri.'],
  [Gem, 'Ubora wa dhahabu', 'Mashine za kisasa na karatasi bora.'],
  [Palette, 'Ubunifu wa kisanii', 'Wabunifu wanaoelewa ladha yako.'],
  [Wallet, 'Bei rafiki', 'Bei wazi, punguzo kwa bulk.'],
  [ShieldCheck, 'Siri zako salama', 'Documents zako zinalindwa.'],
  [Truck, 'Delivery Kibaha', 'Tunakuletea oda kubwa.'],
]

export default function WhyUs() {
  return (
    <section id="kuhusu" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative">
          <SafeImg src={IMAGES.about} alt="Vifaa vya ofisi" className="aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-2xl" />
          <div className="absolute -right-4 bottom-10 w-56 rounded-3xl bg-gold-400 p-6 text-navy-950 shadow-2xl sm:-right-10">
            <p className="font-display text-5xl font-black"><Counter to={5000} suffix="+" /></p>
            <p className="text-sm font-semibold">Wateja walioridhika</p>
          </div>
          <img src="/logo.png" alt="" className="absolute -left-6 -top-6 h-28 w-28 animate-spinslow rounded-full shadow-xl ring-4 ring-paper" />
        </Reveal>

        <div>
          <SectionTitle center={false} eyebrow="Kuhusu Desc Point" title="Hatuchapi tu karatasi —" accent="tunajenga taswira." sub="Desc Point Stationery ni nyumba ya ubunifu Kibaha. Tunaamini kila document, kila kadi na kila logo inabeba ndoto ya mtu. Ndiyo maana tunaifanya kila kazi kwa umakini wa msanii: Quality arts and designing." />
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {REASONS.map(([I, t, d], i) => (
              <motion.div key={t} variants={rise} className="group flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-navy-900/5 transition hover:-translate-y-1 hover:shadow-xl">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-gold-400 transition group-hover:rotate-12 group-hover:bg-gold-400 group-hover:text-navy-950"><I className="h-6 w-6" /></span>
                <span><b className="block text-navy-900">{t}</b><span className="text-sm text-navy-900/60">{d}</span></span>
              </motion.div>
            ))}
          </Stagger>
          <div className="mt-10 grid grid-cols-3 gap-4 rounded-3xl bg-navy-900 p-6 text-center text-white">
            {[[40, '+', 'Huduma'], [12, 'h', 'Kwa siku'], [100, '%', 'Kujituma']].map(([n, s, l]) => (
              <div key={l}><p className="font-display text-3xl font-black text-gold-300"><Counter to={n} suffix={s} /></p><p className="text-xs text-white/60">{l}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
