import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, MapPin, Phone, Clock, Plus, Check, Navigation, Printer, IdCard, GraduationCap, Calculator, FileText, Heart as HeartIcon } from 'lucide-react'
import { BUSINESS, PORTFOLIO, PRODUCTS, waLink } from '../data/site'
import { useApp } from '../lib/store'
import { href } from '../lib/router'
import { asset } from '../lib/asset'
import { SafeImg, tsh } from '../components/ui'
import { useOpenStatus } from '../components/useOpenStatus'
import { SearchBox } from '../components/layout/Header'
import Faq from '../components/Faq'
import { TOOLS } from './Tools'

const EASE = [0.22, 1, 0.36, 1]

/* 1. Picha ya duka (inang'aa, bila maandishi juu yake) + "sheet" inayopanda juu yake */
function Hero() {
  const { t } = useApp()
  const status = useOpenStatus()
  const quick = [
    [Printer, t('Printing', 'Printing'), '/printing'],
    [GraduationCap, 'HESLB', '/mtandaoni#heslb'],
    [IdCard, 'NIDA', '/mtandaoni#nida'],
    [FileText, t('Tengeneza CV', 'Make a CV'), '/cv'],
    [HeartIcon, t('Kadi za mwaliko', 'Invitations'), '/mwaliko'],
    [Calculator, 'Calculator', '/duka/Shule'],
  ]
  return (
    <section className="relative">
      <div className="relative h-[54svh] min-h-[360px] overflow-hidden bg-navy-950 sm:h-[62svh] lg:h-[74vh] lg:max-h-[720px]">
        <motion.img initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: EASE }}
          src={asset('images/shop-open-sign.jpg')} alt={t('Kibao cha Desc Point Stationery: Karibu, tuko wazi', 'Desc Point Stationery sign: Welcome, we’re open')}
          className="h-full w-full object-cover object-[50%_22%]" fetchpriority="high" decoding="async" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy-950/60 to-transparent" />
      </div>

      <div className="container-x relative z-10 -mt-14 sm:-mt-20 lg:-mt-36">
        <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="rounded-[36px] bg-surface p-5 pb-6 shadow-[0_30px_70px_-35px_rgba(6,20,77,.55)] ring-1 ring-ink/[.05] sm:p-8 lg:max-w-[660px] lg:p-10">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-ink/65">
            <span className={`h-2.5 w-2.5 rounded-full ${status.open ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            {status.open ? t('Tuko wazi sasa, hadi saa 2:00 usiku', 'Open now, until 8 PM') : t('Tumefunga. Tunafungua saa 2:00 asubuhi', 'Closed. We open at 8 AM')}
          </p>
          <h1 className="mt-3 font-display text-[clamp(1.75rem,7.4vw,3rem)] font-bold leading-[1.04] text-ink" style={{ textWrap: 'balance' }}>
            {t('Printing, design na huduma za mtandaoni Kibaha', 'Printing, design and online services in Kibaha')}
          </h1>
          <p className="mt-3 max-w-md text-[16px] leading-relaxed text-ink/60 sm:text-[17px]">
            {t('Madafu na Zegereni. Tuma kazi kwa WhatsApp, chukua ikiwa tayari.', 'Madafu and Zegereni. Send your job on WhatsApp, collect when ready.')}
          </p>
          <div className="relative z-20 mt-5"><SearchBox big /></div>
          <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0">
            {quick.map(([I, l, to]) => (
              <a key={to} href={href(to)} className="chip !py-2"><I className="h-4 w-4 text-royal-500 dark:text-gold-300" />{l}</a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* 2. Huduma kwa bento — ukubwa wa kadi unaonyesha umuhimu */
function Tile({ to, img, title, sub, className = '', pos = 'object-center' }) {
  return (
    <a href={href(to)} className={`group relative isolate overflow-hidden rounded-[28px] bg-navy-900 ${className}`}>
      <SafeImg src={img} alt="" className={`absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] ${pos}`} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent" />
      <div className="flex h-full flex-col justify-end p-4 text-white sm:p-6">
        <h3 className="font-display text-[17px] font-bold leading-tight sm:text-2xl">{title}</h3>
        {sub && <p className="mt-1 text-[13px] leading-snug text-white/75 sm:text-[15px]">{sub}</p>}
      </div>
    </a>
  )
}

function Bento() {
  const { t } = useApp()
  return (
    <section id="huduma-zetu" className="container-x scroll-mt-20 pt-14 sm:pt-20">
      <div className="flex items-end justify-between gap-4">
        <h2 className="h-sec">{t('Tunachofanya', 'What we do')}</h2>
        <a href={href('/huduma')} className="shrink-0 text-sm font-bold text-royal-500 underline-offset-4 hover:underline dark:text-gold-300">{t('Huduma zote', 'All services')}</a>
      </div>
      <div className="mt-6 grid auto-rows-[176px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[230px]">
        <Tile to="/printing" img={asset('hero.jpg')} className="col-span-2 lg:row-span-2" title={t('Printing na photocopy', 'Printing and photocopy')} sub={t('Pakia faili, ona bei papo hapo', 'Upload a file, see the price instantly')} />
        <Tile to="/mtandaoni" img={asset('images/poster-heslb-requirements.jpg')} pos="object-top" className="row-span-2" title={t('Huduma za mtandaoni', 'Online services')} sub="HESLB, NIDA, RITA, passport, BRELA" />
        <Tile to="/design" img={asset('images/work-business-cards.jpg')} title={t('Design', 'Design')} sub={t('Kadi, logo, banners', 'Cards, logos, banners')} />
        <Tile to="/kazi-zetu" img={asset('images/work-school-diaries.jpg')} title={t('Printing ya shule', 'School printing')} sub={t('Diaries na mitihani', 'Diaries and exams')} />
        <a href={href('/duka')} className="group relative overflow-hidden rounded-[28px] bg-white p-4 ring-1 ring-ink/[.07] sm:p-6 lg:col-span-2">
          <SafeImg src={asset('images/casio-fx991es-plus.jpg')} alt="" className="absolute -bottom-2 right-0 h-[62%] w-auto object-contain transition-transform duration-500 group-hover:-rotate-3 lg:right-6 lg:h-[92%]" />
          <h3 className="relative font-display text-[17px] font-bold leading-tight text-navy-950 sm:text-2xl">{t('Duka', 'Shop')}</h3>
          <p className="relative mt-1 max-w-[60%] text-[13px] text-navy-950/60 sm:text-[15px]">Casio TSh 35,000</p>
        </a>
        <a href={href('/kozi')} className="flex flex-col justify-between rounded-[28px] bg-royal-600 p-4 text-white sm:p-6 lg:col-span-2">
          <span className="flex flex-wrap gap-1.5">
            {['Word', 'Excel', 'PowerPoint'].map((m) => <span key={m} className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold sm:text-xs">{m}</span>)}
          </span>
          <span>
            <h3 className="font-display text-[17px] font-bold leading-tight sm:text-2xl">{t('Kozi ya kompyuta', 'Computer course')}</h3>
            <p className="mt-1 text-[13px] text-white/75 sm:text-[15px]">{t('Jisajili kwa WhatsApp', 'Register on WhatsApp')}</p>
          </span>
        </a>
      </div>
    </section>
  )
}

/* 3. Zana za bure — kadi za tiketi (kitu cha kukumbukwa cha ukurasa huu) */
const TICKET = [
  'bg-gold-400 text-navy-950',
  'bg-surface text-ink',
  'bg-royal-600 text-white',
  'bg-navy-900 text-white dark:bg-navy-800',
]
function Tickets() {
  const { t } = useApp()
  return (
    <section className="pt-14 sm:pt-20">
      <div className="container-x">
        <h2 className="h-sec">{t('Zana za bure', 'Free tools')}</h2>
        <p className="mt-2 max-w-md text-ink/60">{t('Andaa kazi yako kwenye simu kabla ya kufika dukani.', 'Get your job ready on your phone before you visit.')}</p>
      </div>
      <div className="no-scrollbar mt-6 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:px-8">
        {TOOLS.map(({ to, icon: I, sw, en, d }, i) => (
          <a key={to} href={href(to)} style={{ '--cut': '148px' }} className={`ticket relative flex h-[216px] w-[60vw] max-w-[250px] shrink-0 snap-start flex-col rounded-[26px] transition-transform active:scale-[.98] lg:w-auto lg:max-w-none lg:hover:-translate-y-1 ${TICKET[i]}`}>
            <span className="flex h-[148px] flex-col justify-between p-5 pb-4">
              <I className="h-7 w-7" />
              <b className="font-display text-[19px] font-bold leading-tight">{t(sw, en)}</b>
            </span>
            <span className="ticket-line" />
            <span className="px-5 pt-4 text-sm leading-snug opacity-75">{t(d.sw, d.en)}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

/* 4. Bidhaa halisi */
function Featured() {
  const { t, x, add, notify } = useApp()
  const items = PRODUCTS.filter((p) => ['p13', 'p14'].includes(p.id))
  const [added, setAdded] = useState(null)
  return (
    <section className="container-x pt-14 sm:pt-20">
      <div className="flex items-end justify-between gap-4">
        <h2 className="h-sec">{t('Dukani sasa', 'In store now')}</h2>
        <a href={href('/duka')} className="shrink-0 text-sm font-bold text-royal-500 underline-offset-4 hover:underline dark:text-gold-300">{t('Duka lote', 'Whole shop')}</a>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map((p) => (
          <article key={p.id} className="card flex flex-col overflow-hidden p-2">
            <div className="rounded-[20px] bg-white"><SafeImg src={p.img} alt={x(p.name)} className="aspect-square w-full object-contain p-3" /></div>
            <div className="flex flex-1 flex-col p-2 pt-3">
              <p className="text-[15px] font-semibold leading-snug text-ink">{x(p.name)}</p>
              <p className="mt-1 font-display text-[17px] font-bold tabular-nums text-ink">{tsh(p.price)}</p>
              <button onClick={() => { add(p); setAdded(p.id); notify(t('Imeongezwa kwenye oda', 'Added to your order')); setTimeout(() => setAdded(null), 1200) }}
                className={`mt-auto inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-bold transition-colors ${added === p.id ? 'bg-emerald-500 text-white' : 'bg-gold-400 text-navy-950'}`} style={{ marginTop: 12 }}>
                {added === p.id ? <><Check className="h-4 w-4" /> {t('Imeongezwa', 'Added')}</> : <><Plus className="h-4 w-4" /> {t('Ongeza', 'Add')}</>}
              </button>
            </div>
          </article>
        ))}
        <a href={href('/duka/Shule')} className="col-span-2 flex flex-col justify-between rounded-[28px] bg-sky-100 p-5 text-navy-950 dark:bg-navy-800 dark:text-white sm:p-7">
          <span>
            <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">{t('Vifaa vya shule na ofisi', 'School and office supplies')}</h3>
            <p className="mt-2 max-w-sm text-sm opacity-70">{t('Madaftari, kalamu, mathematical sets, files na vifurushi vya shule.', 'Exercise books, pens, maths sets, files and school packs.')}</p>
          </span>
          <span className="mt-5 inline-flex w-fit rounded-full bg-navy-950 px-5 py-2.5 text-sm font-bold text-white dark:bg-gold-400 dark:text-navy-950">{t('Fungua duka', 'Open the shop')}</span>
        </a>
      </div>
    </section>
  )
}

/* 5. Jinsi ya kuagiza (mfuatano halisi, hivyo namba zina maana) */
function HowTo() {
  const { t } = useApp()
  const steps = [
    [t('Tuma kazi yako', 'Send your job'), t('Pakia faili hapa au tuma kwa WhatsApp. Eleza unachotaka.', 'Upload here or send it on WhatsApp. Tell us what you need.')],
    [t('Tunathibitisha', 'We confirm'), t('Tunakujibu na bei kamili na muda kazi itakapokuwa tayari.', 'We reply with the full price and when it will be ready.')],
    [t('Chukua au tukuletee', 'Collect or get it delivered'), t('Fika Madafu au Zegereni, au tukuletee ndani ya Kibaha.', 'Visit Madafu or Zegereni, or we deliver within Kibaha.')],
  ]
  return (
    <section className="container-x pt-14 sm:pt-20">
      <div className="grid gap-8 rounded-[36px] bg-navy-950 p-6 text-white sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14 lg:p-14">
        <div>
          <h2 className="font-display text-[clamp(1.6rem,5.4vw,2.6rem)] font-bold leading-[1.08]">{t('Jinsi ya kuagiza', 'How ordering works')}</h2>
          <p className="mt-3 text-white/60">{t('Huna haja ya kusubiri foleni.', 'No need to wait in a queue.')}</p>
          <a href={waLink(t('Habari Desc Point! Nina kazi ya kuprint / design.', 'Hello Desc Point! I have a print / design job.'))} target="_blank" rel="noreferrer" className="btn-gold mt-6"><MessageCircle className="h-5 w-5" /> {t('Tuma kazi WhatsApp', 'Send a job on WhatsApp')}</a>
        </div>
        <ol className="space-y-3">
          {steps.map(([h, d], i) => (
            <li key={h} className="flex gap-4 rounded-[24px] bg-white/[.06] p-4 sm:p-5">
              <span className="font-display text-3xl font-bold leading-none text-gold-400">{i + 1}</span>
              <span><b className="block text-[17px]">{h}</b><span className="mt-1 block text-sm text-white/60">{d}</span></span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* 6. Kazi zetu (picha halisi) */
function Work() {
  const { t, x } = useApp()
  const w = PORTFOLIO.filter((p) => ['w1', 'w2', 'w3', 'w5'].includes(p.id))
  return (
    <section className="container-x pt-14 sm:pt-20">
      <div className="flex items-end justify-between gap-4">
        <h2 className="h-sec">{t('Kazi zetu', 'Our work')}</h2>
        <a href={href('/kazi-zetu')} className="shrink-0 text-sm font-bold text-royal-500 underline-offset-4 hover:underline dark:text-gold-300">{t('Ona zote', 'See all')}</a>
      </div>
      <div className="mt-6 columns-2 gap-3 sm:gap-4 lg:columns-4">
        {w.map((p, i) => (
          <figure key={p.id} className="mb-3 break-inside-avoid sm:mb-4">
            <SafeImg src={p.img} alt={x(p.title)} className={`w-full rounded-[24px] bg-surface object-cover ${i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`} />
            <figcaption className="mt-2 px-1 text-sm font-semibold text-ink/75">{x(p.title)}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

/* 7. Maduka yetu */
function Branches() {
  const { t, x } = useApp()
  const tel = (n) => `tel:+255${n.replace(/\s/g, '').slice(1)}`
  return (
    <section id="maduka" className="container-x scroll-mt-20 pt-14 sm:pt-20">
      <h2 className="h-sec">{t('Tutembelee', 'Visit us')}</h2>
      <p className="mt-2 flex items-center gap-2 text-ink/60"><Clock className="h-4 w-4 shrink-0" /> {x(BUSINESS.hours.label)}, {x(BUSINESS.hours.time)}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
        {BUSINESS.branches.map((b, i) => (
          <article key={b.area} className="card p-5 sm:p-7">
            <span className="grid h-11 w-11 place-items-center rounded-[16px] bg-gold-400 text-navy-950"><MapPin className="h-5 w-5" /></span>
            <h3 className="mt-4 font-display text-xl font-bold">{x(b.name)}</h3>
            <p className="mt-1 text-ink/60">{b.area}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.map)}`} target="_blank" rel="noreferrer" className="btn-ink !px-5 !py-3 text-sm"><Navigation className="h-4 w-4" /> {t('Nielekeze', 'Directions')}</a>
              <a href={tel(i ? BUSINESS.phone2Local : BUSINESS.phoneLocal)} className="chip"><Phone className="h-4 w-4" /> {i ? BUSINESS.phone2Local : BUSINESS.phoneLocal}</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="pb-16 sm:pb-24">
      <Hero />
      <Bento />
      <Tickets />
      <Featured />
      <HowTo />
      <Work />
      <Branches />
      <div id="faq" className="scroll-mt-20"><Faq /></div>
    </div>
  )
}
