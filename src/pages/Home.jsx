import { motion } from 'framer-motion'
import { MessageCircle, ArrowRight, MapPin, Phone, Clock, Monitor, Plus, Check } from 'lucide-react'
import { useState } from 'react'
import { BUSINESS, PORTFOLIO, PRODUCTS, waLink } from '../data/site'
import { useApp } from '../lib/store'
import { href } from '../lib/router'
import { asset } from '../lib/asset'
import { SafeImg, tsh } from '../components/ui'
import { useOpenStatus } from '../components/useOpenStatus'
import { TOOLS } from './Tools'

/* 1. Hero: picha kubwa ya duka. Simu: picha juu, maandishi chini. Kompyuta: maandishi kushoto, picha nusu ya kulia hadi ukingoni. */
function Hero() {
  const { t } = useApp()
  const status = useOpenStatus()
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 -z-10 lg:left-1/2">
        <img src={asset('images/shop-open-sign.jpg')} alt={t('Kibao cha Desc Point Stationery: Karibu, tuko wazi', 'Desc Point Stationery sign: Welcome, we’re open')}
          className="h-full w-full object-cover object-[50%_20%]" fetchpriority="high" decoding="async" />
        {/* simu: rangi imara chini ili maandishi yasomeke; kompyuta: kufifia kidogo ukingoni mwa kushoto */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#030c33_0%,#030c33_52%,rgba(3,12,51,.7)_64%,rgba(3,12,51,0)_78%)] lg:bg-[linear-gradient(to_right,#030c33_0%,rgba(3,12,51,0)_22%)]" />
      </div>

      <div className="container-x grid min-h-[calc(100svh-64px)] items-end lg:min-h-[640px] lg:grid-cols-2 lg:items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl pb-20 pt-[40svh] lg:py-24 lg:pr-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium ring-1 ring-white/20">
            <span className={`h-2 w-2 rounded-full ${status.open ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            {status.open ? t('Tuko wazi sasa, hadi saa 2:00 usiku', 'Open now until 8 PM') : t('Tumefunga kwa sasa', 'Closed now')}
          </span>
          <h1 className="mt-4 text-[clamp(2.15rem,8vw,4.5rem)] font-extrabold leading-[1] lg:mt-5" style={{ textWrap: 'balance' }}>
            {t('Printing, design na huduma za mtandaoni, Kibaha.', 'Printing, design and online services in Kibaha.')}
          </h1>
          <p className="mt-3 max-w-md text-base leading-relaxed text-white/75 sm:text-[17px] lg:mt-4">
            {t('Tuma kazi yako kwa WhatsApp au fika dukani Madafu na Zegereni.', 'Send your job on WhatsApp or visit us in Madafu and Zegereni.')}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:flex lg:mt-8">
            <a href="#huduma-zetu" onClick={(e) => { e.preventDefault(); document.getElementById('huduma-zetu')?.scrollIntoView({ behavior: 'smooth' }) }} className="btn-gold justify-center !px-5 text-base sm:!px-6">{t('Huduma', 'Services')}</a>
            <a href={waLink(t('Habari Desc Point!', 'Hello Desc Point!'))} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-base font-semibold text-navy-950 sm:px-6">
              <MessageCircle className="h-5 w-5 text-emerald-600" /> WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* 2. Huduma: kadi kubwa za picha (zinateleza kwenye simu) */
function Services() {
  const { t } = useApp()
  const S = [
    { title: t('Printing na photocopy', 'Printing and photocopy'), sub: t('Pakia faili, chukua ikiwa tayari', 'Upload now, collect when ready'), img: asset('hero.jpg'), to: '/printing' },
    { title: t('Huduma za mtandaoni', 'Online services'), sub: t('HESLB, NIDA, RITA, passport, BRELA', 'HESLB, NIDA, RITA, passport, BRELA'), img: asset('images/poster-heslb-requirements.jpg'), to: '/mtandaoni' },
    { title: t('Design na branding', 'Design and branding'), sub: t('Business cards, kadi, flyers, banners', 'Business cards, invitations, flyers, banners'), img: asset('images/work-business-cards.jpg'), to: '/design' },
    { title: t('Printing ya shule', 'School printing'), sub: t('Diaries, mitihani na vitabu', 'Diaries, exams and booklets'), img: asset('images/work-school-diaries.jpg'), to: '/design' },
    { title: t('Vifaa vya shule na ofisi', 'School and office supplies'), sub: t('Calculators za Casio na zaidi', 'Casio calculators and more'), img: asset('images/casio-fx991es-plus.jpg'), to: '/duka' },
  ]
  return (
    <section id="huduma-zetu" className="scroll-mt-20 py-16 sm:py-24">
      <div className="container-x">
        <h2 className="text-[clamp(2rem,6vw,3rem)] font-extrabold leading-tight text-ink">{t('Huduma zetu', 'Our services')}</h2>
        <p className="mt-2 max-w-lg text-[17px] text-ink/60">{t('Chagua unachohitaji. Tunakuongoza hatua kwa hatua.', 'Pick what you need. We guide you step by step.')}</p>
      </div>
      <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {S.map((s) => (
          <a key={s.title} href={href(s.to)}
            className="group relative w-[78vw] max-w-[340px] shrink-0 snap-start overflow-hidden rounded-[32px] bg-navy-900 lg:w-auto lg:max-w-none">
            <SafeImg src={s.img} alt="" className="aspect-[4/5] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6 text-white">
              <div>
                <h3 className="text-2xl font-extrabold leading-tight">{s.title}</h3>
                <p className="mt-1 text-white/75">{s.sub}</p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-400 text-navy-950"><ArrowRight className="h-5 w-5" /></span>
            </div>
          </a>
        ))}
        <a href={href('/kozi')} className="group flex aspect-[4/5] w-[78vw] max-w-[340px] shrink-0 snap-start flex-col justify-between rounded-[32px] bg-royal-600 p-6 text-white lg:w-auto lg:max-w-none">
          <Monitor className="h-10 w-10 text-gold-300" />
          <div>
            <h3 className="text-2xl font-extrabold leading-tight">{t('Kozi ya kompyuta', 'Computer course')}</h3>
            <p className="mt-1 text-white/75">{t('Word, Excel, PowerPoint na internet', 'Word, Excel, PowerPoint and internet')}</p>
          </div>
        </a>
      </div>
    </section>
  )
}

/* Zana mpya: miadi, CV, mwaliko, nukuu */
function Tools() {
  const { t, lang } = useApp()
  return (
    <section className="pb-16 sm:pb-24">
      <div className="container-x">
        <div className="rounded-[36px] bg-navy-950 p-6 text-white sm:p-10">
          <span className="inline-flex rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-navy-950">{t('Mpya', 'New')}</span>
          <h2 className="mt-3 text-[clamp(1.9rem,6vw,2.75rem)] font-extrabold leading-tight">{t('Zana za bure, kwenye simu yako', 'Free tools, right on your phone')}</h2>
          <p className="mt-2 max-w-lg text-white/65">{t('Andaa kazi yako kabla ya kufika dukani.', 'Get your job ready before you visit.')}</p>
          <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {TOOLS.map(({ to, icon: I, sw, en, d }) => (
              <a key={to} href={href(to)} className="group flex min-h-[150px] flex-col justify-between rounded-[26px] bg-white/[.07] p-4 ring-1 ring-white/10 transition hover:bg-white/[.12] sm:p-5">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold-400 text-navy-950"><I className="h-5 w-5" /></span>
                <span>
                  <b className="block text-[17px] leading-tight">{t(sw, en)}</b>
                  <span className="mt-1 block text-sm text-white/60">{t(d.sw, d.en)}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* 3. Bidhaa iliyoangaziwa: calculators halisi */
function Featured() {
  const { t, x, add, notify } = useApp()
  const items = PRODUCTS.filter((p) => ['p13', 'p14'].includes(p.id))
  const [added, setAdded] = useState(null)
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-[clamp(2rem,6vw,3rem)] font-extrabold leading-tight text-ink">{t('Dukani sasa', 'In store now')}</h2>
            <p className="mt-2 text-[17px] text-ink/60">{t('Calculators halisi za Casio kwa wanafunzi.', 'Genuine Casio calculators for students.')}</p>
          </div>
          <a href={href('/duka')} className="inline-flex items-center gap-1.5 font-semibold text-royal-500">{t('Duka lote', 'Whole shop')} <ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {items.map((p) => (
            <div key={p.id} className="grid grid-cols-[40%_1fr] items-center gap-4 overflow-hidden rounded-[32px] bg-canvas p-3 sm:p-4">
              <div className="overflow-hidden rounded-[24px] bg-white">
                <SafeImg src={p.img} alt={x(p.name)} className="aspect-square w-full object-contain p-2" />
              </div>
              <div className="py-2 pr-2">
                <h3 className="text-lg font-extrabold leading-snug text-ink">{x(p.name)}</h3>
                <p className="mt-1 text-2xl font-extrabold tabular-nums text-royal-500">{tsh(p.price)}</p>
                <button onClick={() => { add(p); setAdded(p.id); notify(t('Imeongezwa kwenye oda', 'Added to your order')); setTimeout(() => setAdded(null), 1200) }}
                  className={`mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${added === p.id ? 'bg-emerald-500 text-white' : 'bg-navy-900 text-white dark:bg-gold-400 dark:text-navy-950'}`}>
                  {added === p.id ? <><Check className="h-4 w-4" /> {t('Imeongezwa', 'Added')}</> : <><Plus className="h-4 w-4" /> {t('Ongeza', 'Add')}</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 4. Kazi zetu (picha halisi tu) */
function Work() {
  const { t, x } = useApp()
  const w = PORTFOLIO.filter((p) => ['w1', 'w2', 'w3', 'w5'].includes(p.id))
  return (
    <section className="py-16 sm:py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-[clamp(2rem,6vw,3rem)] font-extrabold leading-tight text-ink">{t('Kazi zetu', 'Our work')}</h2>
            <p className="mt-2 max-w-lg text-[17px] text-ink/60">{t('Baadhi ya kazi tulizodesign na kuchapa hapa Desc Point.', 'Some of the work we designed and printed here at Desc Point.')}</p>
          </div>
          <a href={href('/design')} className="btn-gold">{t('Omba design', 'Request a design')}</a>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {w.map((p) => (
            <a key={p.id} href={href('/kazi-zetu')} className="group overflow-hidden rounded-[28px] bg-navy-900">
              <SafeImg src={p.img} alt={x(p.title)} className="aspect-[3/4] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 5. Mawasiliano */
function Visit() {
  const { t, x } = useApp()
  return (
    <section className="bg-navy-950 py-16 text-white sm:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <h2 className="text-[clamp(2rem,6vw,3rem)] font-extrabold leading-tight">{t('Karibu dukani', 'Visit the shop')}</h2>
          <p className="mt-3 flex items-center gap-2 text-white/75"><Clock className="h-5 w-5 text-gold-300" /> {x(BUSINESS.hours.label)}, {x(BUSINESS.hours.time)}</p>
          <div className="mt-6 space-y-2 text-lg font-semibold">
            <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-gold-300" /> <span className="select-all">{BUSINESS.phoneLocal}</span></p>
            <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-gold-300" /> <span className="select-all">{BUSINESS.phone2Local}</span></p>
          </div>
          <a href={waLink(t('Habari Desc Point!', 'Hello Desc Point!'))} target="_blank" rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white"><MessageCircle className="h-5 w-5" /> {t('Tuandikie WhatsApp', 'Message us on WhatsApp')}</a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {BUSINESS.branches.map((b) => (
            <a key={b.map} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.map)}`} target="_blank" rel="noreferrer"
              className="rounded-[30px] bg-white/[.07] p-6 ring-1 ring-white/10 transition-colors hover:bg-white/[.12]">
              <MapPin className="h-7 w-7 text-gold-300" />
              <h3 className="mt-5 text-xl font-extrabold">{x(b.name)}</h3>
              <p className="mt-1 text-white/65">{b.area}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300">{t('Fungua ramani', 'Open in Maps')} <ArrowRight className="h-4 w-4" /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Tools />
      <Featured />
      <Work />
      <Visit />
    </>
  )
}
