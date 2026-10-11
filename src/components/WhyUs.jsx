import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import { Zap, Gem, Wallet, Palette, ShieldCheck, Truck } from 'lucide-react'
import { IMAGES } from '../data/site'
import { useApp } from '../lib/store'
import { Reveal, SafeImg, SectionTitle, Stagger, rise } from './ui'
import { asset } from '../lib/asset'

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2, ease: 'easeOut', onUpdate: (n) => setV(Math.round(n)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref} className="tabular-nums">{v.toLocaleString()}{suffix}</span>
}

export default function WhyUs() {
  const { t } = useApp()
  const REASONS = [
    [Zap, t('Kasi ya ajabu', 'Lightning fast'), t('Kazi nyingi zinakamilika ukisubiri.', 'Most jobs are done while you wait.')],
    [Gem, t('Ubora wa dhahabu', 'Gold-standard quality'), t('Mashine za kisasa na karatasi bora.', 'Modern machines and quality paper.')],
    [Palette, t('Ubunifu wa kisanii', 'Artistic creativity'), t('Wabunifu wanaoelewa ladha yako.', 'Designers who get your taste.')],
    [Wallet, t('Bei rafiki', 'Friendly prices'), t('Bei wazi, punguzo kwa bulk.', 'Clear prices, bulk discounts.')],
    [ShieldCheck, t('Siri zako salama', 'Your files stay private'), t('Documents zako zinalindwa.', 'Your documents are protected.')],
    [Truck, t('Delivery Kibaha', 'Kibaha delivery'), t('Tunakuletea oda kubwa.', 'We deliver large orders.')],
  ]
  return (
    <section id="kuhusu" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative">
          <SafeImg src={IMAGES.about} alt={t('Vifaa vya ofisi', 'Office supplies')} className="aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-2xl" />
          <div className="absolute -right-2 bottom-10 w-56 rounded-3xl bg-gold-400 p-6 text-navy-950 shadow-2xl sm:-right-10">
            <p className="font-display text-5xl font-black"><Counter to={5000} suffix="+" /></p>
            <p className="text-sm font-semibold">{t('Wateja walioridhika', 'Happy customers')}</p>
          </div>
          <img src={asset('logo.png')} alt="" className="absolute -left-4 -top-6 h-28 w-28 animate-spinslow rounded-full shadow-xl ring-4 ring-canvas" />
        </Reveal>

        <div>
          <SectionTitle center={false} eyebrow={t('Kuhusu Desc Point', 'About Desc Point')} title={t('Hatuchapi tu karatasi —', 'We don’t just print paper —')} accent={t('tunajenga taswira.', 'we build image.')}
            sub={t('Desc Point Stationery ni nyumba ya ubunifu Kibaha. Tunaamini kila document, kila kadi na kila logo inabeba ndoto ya mtu. Ndiyo maana tunaifanya kila kazi kwa umakini wa msanii: Quality arts and designing.', 'Desc Point Stationery is Kibaha’s creative house. We believe every document, card and logo carries someone’s dream, so we treat each job with an artist’s care: Quality arts and designing.')} />
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {REASONS.map(([I, title, d]) => (
              <motion.div key={title} variants={rise} className="group flex gap-4 rounded-2xl bg-surface p-5 ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-xl">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-gold-400 transition group-hover:rotate-12 group-hover:bg-gold-400 group-hover:text-navy-950"><I className="h-6 w-6" /></span>
                <span><b className="block text-ink">{title}</b><span className="text-sm text-ink/60">{d}</span></span>
              </motion.div>
            ))}
          </Stagger>
          <div className="mt-10 grid grid-cols-3 gap-4 rounded-3xl bg-navy-900 p-6 text-center text-white ring-1 ring-white/5">
            {[[40, '+', t('Huduma', 'Services')], [12, 'h', t('Kwa siku', 'Per day')], [100, '%', t('Kujituma', 'Commitment')]].map(([n, s, l]) => (
              <div key={s}><p className="font-display text-3xl font-black text-gold-300"><Counter to={n} suffix={s} /></p><p className="text-xs text-white/60">{l}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
