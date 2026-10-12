import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Printer, GraduationCap, IdCard, Heart, Calculator, Monitor, Send, Wand2, PackageCheck, Minus, Plus, Upload, MessageCircle, Check, Info, MapPin, Clock, Phone, ChevronRight, Timer } from 'lucide-react'
import { ALL_ITEMS, BUSINESS, ONLINE_SERVICES, PORTFOLIO, PRINT_RATES, PRODUCTS, OFFERS, SERVICE_GROUPS, waLink } from '../data/site'
import { useApp } from '../lib/store'
import { href } from '../lib/router'
import { asset } from '../lib/asset'
import { useCountdown } from '../lib/countdown'
import { SafeImg, tsh } from '../components/ui'
import { Card } from '../components/Products'
import Faq from '../components/Faq'
import { useOpenStatus } from '../components/useOpenStatus'

function Head({ title, sub, action, light = false }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div className="max-w-2xl">
        <h2 className={`text-[clamp(1.9rem,4vw,2.75rem)] font-extrabold leading-[1.05] ${light ? 'text-white' : 'text-ink'}`} style={{ textWrap: 'balance' }}>{title}</h2>
        {sub && <p className={`mt-3 text-[17px] leading-relaxed ${light ? 'text-white/70' : 'text-ink/60'}`}>{sub}</p>}
      </div>
      {action}
    </div>
  )
}

/* 1. Kaunta: "Leo unahitaji nini?" */
function Counter() {
  const { t } = useApp()
  const status = useOpenStatus()
  const TASKS = [
    { icon: Printer, title: t('Kuprint au kunakili', 'Print or copy'), hint: t('A4 nyeusi TSh 200 kwa ukurasa', 'A4 B/W TSh 200 a page'), to: '/printing' },
    { icon: GraduationCap, title: t('Maombi ya HESLB', 'HESLB application'), hint: t('Tunajaza na kutuma bila makosa', 'Filled and sent without mistakes'), to: '/mtandaoni#heslb' },
    { icon: IdCard, title: t('NIDA, RITA au passport', 'NIDA, RITA or passport'), hint: t('Ona viambata vya kuleta', 'See what to bring'), to: '/mtandaoni#nida' },
    { icon: Heart, title: t('Kadi za harusi na design', 'Wedding cards and design'), hint: t('Makadirio ya bei papo hapo', 'Instant price estimate'), to: '/design' },
    { icon: Calculator, title: t('Calculator na vifaa vya shule', 'Calculators and school supplies'), hint: t('Casio fx-991ES PLUS TSh 35,000', 'Casio fx-991ES PLUS TSh 35,000'), to: '/duka/Shule' },
    { icon: Monitor, title: t('Kujifunza kompyuta', 'Learn computers'), hint: t('Word, Excel, PowerPoint na typing', 'Word, Excel, PowerPoint and typing'), to: '/kozi' },
  ]
  return (
    <section className="relative overflow-hidden">
      <div className="container-x grid gap-10 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-14 lg:pb-24">
        <div>
          <p className="text-[17px] font-medium text-ink/60">{t('Karibu Desc Point Stationery, Kibaha', 'Welcome to Desc Point Stationery, Kibaha')}</p>
          <h1 className="mt-2 text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold leading-[.95] text-ink">
            {t('Leo unahitaji nini?', 'What do you need today?')}
          </h1>
          <ul className="mt-9 grid grid-cols-1 gap-3 min-[460px]:grid-cols-2 xl:grid-cols-3">
            {TASKS.map((task, i) => (
              <motion.li key={task.to} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}>
                <a href={href(task.to)}
                  className="group flex h-full items-start gap-3 rounded-[26px] bg-surface p-4 ring-1 ring-ink/[.08] transition-colors duration-200 hover:bg-navy-900 hover:ring-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 dark:hover:bg-royal-600">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-royal-500/10 text-royal-500 transition-colors group-hover:bg-gold-400 group-hover:text-navy-950">
                    <task.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-bold leading-snug text-ink group-hover:text-white">{task.title}</span>
                    <span className="mt-0.5 block text-sm text-ink/55 group-hover:text-white/70">{task.hint}</span>
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
          <p className="mt-6 text-ink/60">
            {t('Hujaona unachotafuta?', 'Can’t see what you need?')}{' '}
            <a href={waLink(t('Habari Desc Point! Naomba msaada kuhusu: ', 'Hello Desc Point! I need help with: '))} target="_blank" rel="noreferrer" className="font-semibold text-emerald-600 underline decoration-2 underline-offset-4 dark:text-emerald-400">{t('Tuulize kwa WhatsApp', 'Ask us on WhatsApp')}</a>
          </p>
        </div>

        {/* Picha halisi ya duka + kibandiko cha hali */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="overflow-hidden rounded-[40px] shadow-[0_40px_80px_-40px_rgba(10,26,92,.55)]">
            <SafeImg src={asset('images/shop-open-sign.jpg')} alt={t('Kibao cha Desc Point Stationery: Karibu, tuko wazi', 'Desc Point Stationery sign: Welcome, we’re open')} className="aspect-[4/5] w-full object-cover" />
          </div>
          <motion.div initial={{ opacity: 0, y: 16, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: -3 }} transition={{ delay: 0.45, type: 'spring', damping: 14 }}
            className="absolute -bottom-5 left-4 w-[min(86%,300px)] rounded-[24px] bg-gold-400 p-5 text-navy-950 shadow-xl sm:-left-6">
            <p className="flex items-center gap-2 font-bold">
              <span className={`h-2.5 w-2.5 rounded-full ${status.open ? 'bg-emerald-600' : 'bg-rose-600'}`} />
              {status.open ? t('Tuko wazi sasa', 'Open now') : t('Tumefunga kwa sasa', 'Closed now')}
            </p>
            <p className="mt-1 text-sm">{t('Jumatatu hadi Jumamosi, saa 2:00 asubuhi hadi saa 2:00 usiku', 'Monday to Saturday, 8 AM to 8 PM')}</p>
            <p className="mt-2 text-sm font-semibold">{t('Madafu na Zegereni, Kibaha', 'Madafu and Zegereni, Kibaha')}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* 2. Inavyofanya kazi (mfuatano halisi wa hatua) */
function Steps() {
  const { t } = useApp()
  const S = [
    [Send, t('Tuma kazi yako', 'Send your job'), t('Pakia faili hapa, au tutumie kwa WhatsApp. Unaweza pia kufika dukani.', 'Upload it here or send it on WhatsApp. You can also walk in.')],
    [Wand2, t('Tunaiandaa', 'We prepare it'), t('Tunachapa, tunadesign au tunajaza maombi yako, kisha tunakujulisha.', 'We print, design or fill in your application, then let you know.')],
    [PackageCheck, t('Chukua au tukuletee', 'Collect or get it delivered'), t('Lipa kwa simu au taslimu. Fuatilia oda kwa namba yake.', 'Pay by mobile money or cash. Track it with your order number.')],
  ]
  return (
    <section className="bg-navy-900 py-14 text-white sm:py-16">
      <div className="container-x">
        <h2 className="text-2xl font-extrabold sm:text-3xl">{t('Inavyofanya kazi', 'How it works')}</h2>
        <ol className="mt-8 grid gap-8 md:grid-cols-3 md:gap-6">
          {S.map(([I, title, d], i) => (
            <li key={title} className="relative flex gap-4 md:block">
              <div className="flex items-center gap-3 md:mb-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-400 text-lg font-extrabold text-navy-950">{i + 1}</span>
                {i < S.length - 1 && <span aria-hidden className="hidden h-0.5 flex-1 rounded bg-white/15 md:block" />}
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-lg font-bold"><I className="h-5 w-5 text-gold-300" /> {title}</h3>
                <p className="mt-1.5 max-w-sm text-white/65">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* 3. Kikokotoo kidogo cha printing */
function Step({ label, value, set, min = 1, id, t }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-ink/65">{label}</label>
      <div className="mt-2 flex items-center rounded-full bg-ink/5 p-1">
        <button type="button" onClick={() => set(Math.max(min, value - 1))} aria-label={t('Punguza', 'Decrease')} className="grid h-10 w-10 place-items-center rounded-full bg-surface shadow-sm"><Minus className="h-4 w-4" /></button>
        <input id={id} type="number" inputMode="numeric" min={min} value={value} onChange={(e) => set(Math.max(min, Math.min(9999, +e.target.value || min)))}
          className="min-w-0 flex-1 bg-transparent text-center text-xl font-extrabold tabular-nums text-ink outline-none" />
        <button type="button" onClick={() => set(value + 1)} aria-label={t('Ongeza', 'Increase')} className="grid h-10 w-10 place-items-center rounded-full bg-surface shadow-sm"><Plus className="h-4 w-4" /></button>
      </div>
    </div>
  
  )
}


function PrintCounter() {
  const { t } = useApp()
  const [pages, setPages] = useState(10)
  const [color, setColor] = useState('bw')
  const [copies, setCopies] = useState(1)
  const total = PRINT_RATES.A4[color] * pages * copies
  return (
    <section className="container-x py-16 sm:py-24">
      <div className="grid gap-8 overflow-hidden rounded-[40px] bg-surface p-6 ring-1 ring-ink/[.07] sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
        <div>
          <h2 className="text-[clamp(1.9rem,4vw,2.75rem)] font-extrabold leading-[1.05] text-ink" style={{ textWrap: 'balance' }}>{t('Kuprint bila kupanga foleni', 'Printing without the queue')}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink/60">{t('Pakia faili kutoka kwenye simu yako, chagua chaguo zako, na tutaichapa kabla hujafika. Kurasa za PDF tunazihesabu zenyewe.', 'Upload from your phone, pick your options, and it’s printed before you arrive. We count PDF pages for you.')}</p>
          <dl className="mt-8 grid grid-cols-3 gap-3">
            {[[t('Photocopy', 'Photocopy'), 100], [t('A4 nyeusi', 'A4 B/W'), 200], [t('A4 rangi', 'A4 colour'), 500]].map(([l, p]) => (
              <div key={l} className="rounded-[22px] bg-canvas p-3 sm:p-4">
                <dt className="text-xs text-ink/55 sm:text-sm">{l}</dt>
                <dd className="mt-1 whitespace-nowrap text-[15px] font-extrabold tabular-nums text-ink sm:text-lg">{tsh(p)}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm text-ink/50">{t('Bei kwa ukurasa. Kurasa 100 au zaidi zinapata punguzo la 10%.', 'Per page. 100 pages or more get 10% off.')}</p>
        </div>

        <div className="rounded-[32px] bg-canvas p-5 sm:p-7">
          <p className="font-bold text-ink">{t('Kadiria bei yako', 'Estimate your price')}</p>
          <div className="mt-4 grid grid-cols-2 gap-1 rounded-full bg-ink/5 p-1" role="radiogroup" aria-label={t('Rangi', 'Colour')}>
            {[['bw', t('Nyeusi na nyeupe', 'Black and white')], ['color', t('Rangi', 'Colour')]].map(([v, l]) => (
              <button key={v} type="button" role="radio" aria-checked={color === v} onClick={() => setColor(v)}
                className={`rounded-full py-2.5 text-sm font-semibold transition-colors ${color === v ? 'bg-navy-900 text-white dark:bg-gold-400 dark:text-navy-950' : 'text-ink/60'}`}>{l}</button>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <Step t={t} id="mini-pages" label={t('Kurasa', 'Pages')} value={pages} set={setPages} />
            <Step t={t} id="mini-copies" label={t('Nakala', 'Copies')} value={copies} set={setCopies} />
          </div>
          <div className="mt-6 flex items-end justify-between border-t border-ink/10 pt-5">
            <span className="text-ink/60">{t('Jumla, A4', 'Total, A4')}</span>
            <span className="text-4xl font-extrabold tabular-nums text-ink">{tsh(total)}</span>
          </div>
          <a href={href('/printing')} className="btn-gold mt-6 w-full"><Upload className="h-4 w-4" /> {t('Pakia faili lako', 'Upload your file')}</a>
        </div>
      </div>
    </section>
  )
}

/* 4. Huduma za mtandaoni: "Leta nini?" */
function OnlineChecklist() {
  const { t, x } = useApp()
  const [id, setId] = useState('heslb')
  const s = ONLINE_SERVICES.find((o) => o.id === id)
  const item = ALL_ITEMS.find((i) => i.id === s.itemId)
  const short = (o) => x(o.name).split('—')[0].trim()
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="container-x">
        <Head title={t('Huduma za mtandaoni: ujue cha kuleta kabla hujaja', 'Online services: know what to bring before you come')}
          sub={t('Chagua huduma uone viambata vinavyohitajika. Tunajaza, tunascan na kutuma, na unaondoka na nakala.', 'Pick a service to see the documents needed. We fill in, scan and submit, and you leave with a copy.')} />
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <div role="tablist" aria-label={t('Huduma', 'Services')} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {ONLINE_SERVICES.map((o) => (
              <button key={o.id} role="tab" aria-selected={id === o.id} onClick={() => setId(o.id)}
                className={`shrink-0 rounded-full px-5 py-3 text-left font-semibold transition-colors lg:rounded-[20px] ${id === o.id ? 'bg-navy-900 text-white dark:bg-gold-400 dark:text-navy-950' : 'bg-canvas text-ink/70 hover:text-ink'}`}>
                {short(o)}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={id} role="tabpanel" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}
              className="grid gap-6 rounded-[36px] bg-canvas p-5 sm:p-8 md:grid-cols-[1fr_200px]">
              <div>
                <h3 className="text-2xl font-extrabold text-ink">{x(s.name)}</h3>
                <p className="mt-2 text-ink/60">{x(item?.desc)}</p>
                {s.requirements ? (
                  <>
                    {s.note && <p className="mt-5 font-semibold text-ink">{x(s.note)}</p>}
                    <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {s.requirements.map((r) => (
                        <li key={r.sw} className="flex gap-2.5 text-[15px] text-ink/80"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-emerald-500 text-white"><Check className="h-3.5 w-3.5" /></span>{x(r)}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="mt-5 flex gap-2 rounded-2xl bg-surface p-4 text-ink/70"><Info className="mt-0.5 h-5 w-5 shrink-0 text-royal-500" /> {t('Tuandikie WhatsApp tukutumie orodha kamili ya viambata kabla hujaja.', 'Message us on WhatsApp for the full document list before you come.')}</p>
                )}
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={waLink(t(`Habari Desc Point! Nataka huduma ya ${x(s.name)}.`, `Hello Desc Point! I need help with ${x(s.name)}.`))} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white"><MessageCircle className="h-5 w-5" /> {t('Anza kwa WhatsApp', 'Start on WhatsApp')}</a>
                  <a href={href(`/mtandaoni#${s.id}`)} className="inline-flex items-center gap-1 rounded-full px-5 py-3 font-semibold text-royal-500 ring-1 ring-royal-500/25">{t('Maelezo zaidi', 'More details')} <ChevronRight className="h-4 w-4" /></a>
                </div>
              </div>
              <div className="hidden overflow-hidden rounded-[24px] bg-navy-900 md:block">
                <SafeImg src={item?.img} alt="" className={`h-full w-full ${item?.fit === 'contain' ? 'object-contain' : 'object-cover'}`} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* 5. Rafu ya duka + ofa */
const isReal = (p) => String(p.img).includes('/images/') || String(p.img).startsWith('data:')
function Shelf() {
  const { t, x } = useApp()
  const { d, h, m } = useCountdown(OFFERS[0]?.endsAt)
  const list = useMemo(() => [...PRODUCTS.filter(isReal), ...PRODUCTS.filter((p) => !isReal(p))], [])
  return (
    <section className="py-16 sm:py-24">
      <div className="container-x">
        <Head title={t('Dukani sasa', 'In store now')} sub={t('Bei halisi. Ongeza kwenye oda na tuma kwa WhatsApp.', 'Real prices. Add to your order and send on WhatsApp.')}
          action={<a href={href('/duka')} className="inline-flex items-center gap-1 rounded-full bg-surface px-5 py-2.5 font-semibold text-ink ring-1 ring-ink/10">{t('Duka lote', 'Whole shop')} <ChevronRight className="h-4 w-4" /></a>} />
        {OFFERS[0] && (
          <a href={href('/ofa')} className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[24px] bg-rose-600 px-5 py-4 text-white">
            <Timer className="h-5 w-5" />
            <span className="font-semibold">{t('Ofa ya wiki', 'Deal of the week')}: {x(OFFERS[0].title)} {tsh(OFFERS[0].price)} <s className="font-normal text-white/60">{tsh(OFFERS[0].oldPrice)}</s></span>
            <span className="ml-auto rounded-full bg-black/20 px-3 py-1 text-sm font-semibold tabular-nums">{t('Inaisha baada ya', 'Ends in')} {d > 0 ? `${d} ${t('siku', 'd')} ` : ''}{h} {t('saa', 'h')} {m} {t('dak', 'min')}</span>
          </a>
        )}
      </div>
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 sm:gap-5 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] [scrollbar-width:thin]">
        {list.map((p, i) => (
          <div key={p.id} className="w-[46vw] max-w-[260px] shrink-0 snap-start sm:w-[240px]"><Card p={p} i={i} /></div>
        ))}
      </div>
    </section>
  )
}

/* 6. Ukuta wa kazi halisi */
function WorkWall() {
  const { t, x } = useApp()
  const w = PORTFOLIO.slice(0, 5)
  return (
    <section className="bg-navy-950 py-16 text-white sm:py-24">
      <div className="container-x">
        <Head light title={t('Tunadesign na kuchapa kazi kama hizi', 'We design and print work like this')}
          sub={t('Kazi halisi zilizotoka Desc Point: diaries za shule, posters, flyers na business cards.', 'Real jobs from Desc Point: school diaries, posters, flyers and business cards.')}
          action={<a href={href('/design')} className="btn-gold">{t('Omba design yako', 'Request your design')}</a>} />
        <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:gap-4 lg:grid-cols-4">
          {w.map((p, i) => (
            <a key={p.id} href={href('/kazi-zetu')} className={`group relative overflow-hidden rounded-[28px] bg-navy-900 ${i === 0 ? 'row-span-2' : ''} ${i === 1 ? 'lg:col-span-2' : ''}`}>
              <SafeImg src={p.img} alt={x(p.title)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <span className="absolute inset-x-2 bottom-2 rounded-2xl bg-navy-950/85 px-3 py-2 text-sm font-semibold">{x(p.title)}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 7. Kozi ya kompyuta */
function CourseBand() {
  const { t, x } = useApp()
  const course = SERVICE_GROUPS.find((g) => g.id === 'course')
  return (
    <section className="container-x py-16 sm:py-24">
      <div className="grid items-center gap-8 rounded-[40px] bg-royal-600 p-7 text-white sm:p-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="text-[clamp(1.9rem,4vw,2.75rem)] font-extrabold leading-[1.05]">{t('Jifunze kompyuta, ujiamini kazini', 'Learn computers and work with confidence')}</h2>
          <p className="mt-4 text-[17px] text-white/75">{t('Mafunzo ya vitendo kwa wanafunzi, wanaotafuta kazi na wafanyabiashara. Chagua muda unaokufaa.', 'Hands-on training for students, job seekers and business owners. Pick a time that suits you.')}</p>
          <a href={href('/kozi')} className="btn-gold mt-7">{t('Jisajili kozi', 'Join the course')}</a>
        </div>
        <ul className="flex flex-wrap gap-2.5">
          {course.items.map((it) => <li key={it.sw} className="rounded-full bg-white/10 px-4 py-2.5 font-semibold ring-1 ring-white/20">{x(it)}</li>)}
        </ul>
      </div>
    </section>
  )
}

/* 8. Tembelea duka */
function Visit() {
  const { t, x } = useApp()
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="container-x">
        <Head title={t('Tutembelee Kibaha', 'Visit us in Kibaha')} />
        <div className="grid gap-4 md:grid-cols-3">
          {BUSINESS.branches.map((b) => (
            <a key={b.map} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.map)}`} target="_blank" rel="noreferrer"
              className="group rounded-[30px] bg-canvas p-6 transition-colors hover:bg-navy-900 hover:text-white">
              <MapPin className="h-7 w-7 text-royal-500 group-hover:text-gold-300" />
              <h3 className="mt-4 text-xl font-extrabold">{x(b.name)}</h3>
              <p className="mt-1 text-ink/60 group-hover:text-white/70">{b.area}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-royal-500 group-hover:text-gold-300">{t('Fungua ramani', 'Open in Maps')} <ChevronRight className="h-4 w-4" /></span>
            </a>
          ))}
          <div className="rounded-[30px] bg-navy-900 p-6 text-white">
            <Clock className="h-7 w-7 text-gold-300" />
            <h3 className="mt-4 text-xl font-extrabold">{x(BUSINESS.hours.label)}</h3>
            <p className="mt-1 text-white/70">{x(BUSINESS.hours.time)}</p>
            <p className="mt-4 flex items-center gap-2 font-semibold"><Phone className="h-4 w-4 text-gold-300" /> <span className="select-all">{BUSINESS.phoneLocal}</span></p>
            <p className="mt-1 flex items-center gap-2 font-semibold"><Phone className="h-4 w-4 text-gold-300" /> <span className="select-all">{BUSINESS.phone2Local}</span></p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Counter />
      <Steps />
      <PrintCounter />
      <OnlineChecklist />
      <Shelf />
      <WorkWall />
      <CourseBand />
      <div id="faq" className="scroll-mt-28"><Faq /></div>
      <Visit />
    </>
  )
}
