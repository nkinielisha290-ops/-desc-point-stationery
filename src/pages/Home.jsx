import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Phone, MessageCircle, Mail, HelpCircle, MapPin, Clock, Star, Upload, Monitor, Bell, Check, Printer, Globe, PenTool, ShoppingBag } from 'lucide-react'
import { BUSINESS, PRODUCTS, TESTIMONIALS, waLink } from '../data/site'
import { useApp } from '../lib/store'
import { href } from '../lib/router'
import { asset } from '../lib/asset'
import { SafeImg, Stagger, rise, tsh } from '../components/ui'
import { Card } from '../components/Products'
import Faq from '../components/Faq'
import OfferBar from '../components/OfferBar'
import { useOpenStatus } from '../components/useOpenStatus'

const unsplash = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`

function SectionHead({ title, sub, link }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl" style={{ textWrap: 'balance' }}>{title}</motion.h2>
        {sub && <p className="mt-2 text-ink/60">{sub}</p>}
      </div>
      {link}
    </div>
  )
}

/* ---------------- 1. Hero inayozunguka ---------------- */
function HeroSlider() {
  const { t } = useApp()
  const SLIDES = [
    { tag: t('Printing mtandaoni', 'Online printing'), title: t('Pakia faili, chukua ikiwa tayari.', 'Upload now, collect it ready.'), sub: t('Printing ya rangi na nyeusi, binding na lamination — bei inaonekana papo hapo.', 'Colour and B/W printing, binding and lamination — see the price instantly.'), cta: t('Anza printing', 'Start printing'), to: '/printing', img: asset('hero.jpg'), tone: 'from-navy-950 via-navy-900/90' },
    { tag: 'HESLB 2026', title: t('Mkopo wa HESLB bila makosa.', 'Your HESLB loan, done right.'), sub: t('Tunajaza, tunascan na kutuma maombi yako. Leta viambata, uondoke na nakala.', 'We fill in, scan and submit your application. Bring your documents, leave with a copy.'), cta: t('Ona viambata', 'See requirements'), to: '/mtandaoni#heslb', img: asset('images/poster-heslb-requirements.jpg'), contain: true, tone: 'from-royal-600 via-royal-600/90' },
    { tag: t('Vifaa vya shule', 'School supplies'), title: t('Casio fx-991ES PLUS kwa TSh 35,000.', 'Casio fx-991ES PLUS for TSh 35,000.'), sub: t('Calculators halisi za Casio — nyeusi, bluu na pinki. Zipo dukani sasa.', 'Genuine Casio calculators in black, blue and pink. In store now.'), cta: t('Nunua sasa', 'Shop now'), to: '/duka/Shule', img: asset('images/casio-fx991es-plus.jpg'), contain: true, tone: 'from-navy-900 via-navy-800/90' },
    { tag: 'Design studio', title: t('Kadi, logo na banners za kisanii.', 'Artistic cards, logos and banners.'), sub: t('Eleza wazo lako, pata makadirio ya bei papo hapo. Quality arts and designing.', 'Describe your idea and get an instant estimate. Quality arts and designing.'), cta: t('Omba design', 'Request a design'), to: '/design', img: asset('images/work-business-cards.jpg'), contain: true, tone: 'from-navy-950 via-navy-900/90' },
  ]
  const [[i, dir], setI] = useState([0, 1])
  const [paused, setPaused] = useState(false)
  const go = useCallback((d) => setI(([c]) => [(c + d + SLIDES.length) % SLIDES.length, d]), [SLIDES.length])
  useEffect(() => { if (paused) return; const id = setTimeout(() => go(1), 6500); return () => clearTimeout(id) }, [i, paused, go])
  const s = SLIDES[i]

  return (
    <section aria-roledescription="carousel" aria-label={t('Matangazo', 'Highlights')} className="container-x pt-5 sm:pt-6"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative overflow-hidden rounded-[1.75rem] bg-navy-950 shadow-[0_30px_60px_-30px_rgba(6,20,77,.6)]">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div key={i} custom={dir}
            initial={{ opacity: 0, x: dir * 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -60 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.4} onDragEnd={(_, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1) }}
            className="relative grid min-h-[460px] grid-cols-1 md:min-h-[440px] md:grid-cols-[1.05fr_1fr]">
            {/* Picha */}
            <div className="absolute inset-0 md:relative md:order-2">
              <SafeImg src={s.img} alt="" className={`relative h-full w-full ${s.contain ? 'object-contain p-6 md:p-10' : ' object-cover'}`} />
            </div>
            {/* Maandishi */}
            <div className={`relative z-10 flex flex-col justify-end bg-gradient-to-t ${s.tone} to-transparent p-7 pt-40 text-white sm:p-10 md:justify-center md:bg-gradient-to-r md:pt-10 lg:p-14`}>
              <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="w-fit rounded-full bg-gold-400 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-950">{s.tag}</motion.span>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}
                className="mt-4 font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl" style={{ textWrap: 'balance' }}>{s.title}</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-4 max-w-md text-white/80 sm:text-lg">{s.sub}</motion.p>
              <motion.a initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} href={href(s.to)} className="btn-gold group mt-7 w-fit">
                {s.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Vidhibiti */}
        <div className="absolute bottom-5 right-5 z-20 flex items-center gap-3 sm:bottom-7 sm:right-7">
          <div className="flex gap-1.5">
            {SLIDES.map((_, k) => (
              <button key={k} onClick={() => setI([k, k > i ? 1 : -1])} aria-label={`${t('Tangazo', 'Slide')} ${k + 1}`} aria-current={k === i}
                className="relative h-2 overflow-hidden rounded-full bg-white/30 transition-all" style={{ width: k === i ? 32 : 8 }}>
                {k === i && !paused && <motion.span key={i} className="absolute inset-y-0 left-0 bg-gold-400" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 6.5, ease: 'linear' }} />}
                {k === i && paused && <span className="absolute inset-0 bg-gold-400" />}
              </button>
            ))}
          </div>
          <button onClick={() => go(-1)} aria-label={t('Iliyopita', 'Previous')} className="hidden h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white hover:text-navy-950 sm:grid"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={() => go(1)} aria-label={t('Inayofuata', 'Next')} className="hidden h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white hover:text-navy-950 sm:grid"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
    </section>
  )
}

/* ---------------- 2. Kadi 4 za huduma kuu ---------------- */
function PlanTiles() {
  const { t } = useApp()
  const TILES = [
    { icon: Printer, title: t('Printing & Photocopy', 'Printing & Photocopy'), sub: t('Rangi, nyeusi, binding na lamination — pakia faili mtandaoni.', 'Colour, B/W, binding and lamination — upload online.'), img: unsplash('photo-1503694978374-8a2fa686963a'), to: '/printing', from: t('Kuanzia TSh 100', 'From TSh 100') },
    { icon: Globe, title: t('Huduma za Mtandaoni', 'Online Services'), sub: t('NIDA, RITA, HESLB, passport, BRELA na Ajira Portal.', 'NIDA, RITA, HESLB, passport, BRELA and Ajira Portal.'), img: asset('images/flyer-online-services.jpg'), to: '/mtandaoni', top: true, from: t('Bila foleni', 'No queues') },
    { icon: PenTool, title: t('Graphic Design', 'Graphic Design'), sub: t('Logo, business cards, kadi za harusi, banners na flyers.', 'Logos, business cards, wedding cards, banners and flyers.'), img: asset('images/work-business-cards.jpg'), to: '/design', top: true, from: t('Quote papo hapo', 'Instant quote') },
    { icon: ShoppingBag, title: t('Vifaa vya Shule & Ofisi', 'School & Office Supplies'), sub: t('Calculators za Casio, madaftari, kalamu na zaidi.', 'Casio calculators, exercise books, pens and more.'), img: asset('images/casio-fx991es-plus.jpg'), to: '/duka', top: true, from: t('Casio TSh 35,000', 'Casio TSh 35,000') },
  ]
  return (
    <section className="container-x py-16 sm:py-20">
      <SectionHead title={t('Chagua huduma unayohitaji', 'Find the service you need')} sub={t('Kila kitu cha stationery na huduma za mtandaoni, sehemu moja Kibaha.', 'All your stationery and online services, in one place in Kibaha.')} />
      <Stagger className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {TILES.map((tile) => (
          <motion.a key={tile.to} variants={rise} href={href(tile.to)}
            className="group relative flex flex-col overflow-hidden rounded-[22px] bg-surface ring-1 ring-ink/[.07] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-20px_rgba(6,20,77,.4)] hover:ring-gold-400/70">
            <div className="relative aspect-[16/11] overflow-hidden bg-navy-900">
              <SafeImg src={tile.img} alt="" className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${tile.top ? 'object-top' : ''}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-navy-900">{tile.from}</span>
            </div>
            <div className="relative flex flex-1 flex-col px-5 pb-5 pt-8">
              <span className="absolute -top-6 right-5 grid h-12 w-12 place-items-center rounded-2xl bg-gold-400 text-navy-950 shadow-lg ring-4 ring-surface transition-transform duration-300 group-hover:-rotate-6">
                <tile.icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-extrabold leading-snug text-ink">{tile.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/55">{tile.sub}</p>
              <span className="mt-auto flex items-center justify-between pt-5 text-sm font-bold text-royal-500">
                {t('Jifunze zaidi', 'Learn more')}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-royal-500/10 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-navy-950"><ArrowRight className="h-4 w-4" /></span>
              </span>
            </div>
          </motion.a>
        ))}
      </Stagger>
    </section>
  )
}

/* ---------------- 3. Feature blocks ---------------- */
function Features() {
  const { t } = useApp()
  const F = [
    { icon: Upload, eyebrow: t('Printing mtandaoni', 'Online printing'), title: t('Usipange foleni. Pakia faili kutoka simuni.', 'Skip the queue. Upload from your phone.'),
      text: t('Chagua faili zako, weka ukubwa, rangi, nakala na binding. Bei inahesabiwa papo hapo, kisha unatuma kwa WhatsApp na kupata namba ya oda ya kufuatilia.', 'Choose your files, set size, colour, copies and binding. The price is calculated instantly, then send on WhatsApp and get an order number to track.'),
      points: [t('Kurasa za PDF zinahesabiwa zenyewe', 'PDF pages counted automatically'), t('Punguzo la 10% kwa kurasa 100+', '10% off for 100+ pages')],
      cta: t('Pakia faili sasa', 'Upload a file now'), to: '/printing', img: asset('hero.jpg') },
    { icon: Monitor, eyebrow: t('Kozi ya kompyuta', 'Computer course'), title: t('Jifunze kompyuta, ujiamini kazini.', 'Learn computers, work with confidence.'),
      text: t('Mafunzo ya vitendo ya Word, Excel, PowerPoint, internet na typing — kwa wanafunzi, wanaotafuta kazi na wafanyabiashara.', 'Hands-on Word, Excel, PowerPoint, internet and typing — for students, job seekers and business owners.'),
      points: [t('Unajifunza kwa vitendo kwenye kompyuta', 'Learn hands-on at a computer'), t('Tunakusaidia pia Ajira Portal', 'We also help with Ajira Portal')],
      cta: t('Jisajili kozi', 'Join the course'), to: '/kozi', img: unsplash('photo-1699347914988-c61ec13c99c5', 1100), flip: true },
  ]
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="container-x space-y-16 sm:space-y-24">
        {F.map((f) => (
          <div key={f.to} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <motion.div initial={{ opacity: 0, x: f.flip ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8 }}
              className={`overflow-hidden rounded-[1.75rem] shadow-2xl ${f.flip ? 'md:order-2' : ''}`}>
              <SafeImg src={f.img} alt="" className="aspect-[4/3] w-full object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay: 0.1 }}>
              <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gold-600"><f.icon className="h-4 w-4" /> {f.eyebrow}</span>
              <h2 className="mt-3 font-display text-3xl font-black leading-tight text-ink sm:text-4xl" style={{ textWrap: 'balance' }}>{f.title}</h2>
              <p className="mt-4 text-ink/65 sm:text-lg">{f.text}</p>
              <ul className="mt-5 space-y-2">
                {f.points.map((p) => <li key={p} className="flex items-center gap-2 text-sm font-medium text-ink/80"><span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500/15 text-emerald-600"><Check className="h-3 w-3" /></span>{p}</li>)}
              </ul>
              <a href={href(f.to)} className="mt-7 inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3 font-semibold text-white transition hover:bg-gold-400 hover:text-navy-950 dark:bg-gold-400 dark:text-navy-950">{f.cta} <ArrowRight className="h-4 w-4" /></a>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- 4. Bidhaa (kama gridi ya vifaa ya Yas) ---------------- */
function NewArrivals() {
  const { t } = useApp()
  const list = [...PRODUCTS.filter((p) => p.img.includes('/images/')), ...PRODUCTS.filter((p) => !p.img.includes('/images/'))].slice(0, 6)
  return (
    <section className="container-x py-16 sm:py-20">
      <SectionHead title={t('Bidhaa dukani sasa', 'In store now')} sub={t('Bei halisi, ongeza kwenye cart na agiza kwa WhatsApp.', 'Real prices — add to cart and order on WhatsApp.')}
        link={<a href={href('/duka')} className="inline-flex items-center gap-1 font-semibold text-royal-500 hover:underline">{t('Ona zote', 'See all')} <ArrowRight className="h-4 w-4" /></a>} />
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {list.map((p, i) => <Card key={p.id} p={p} i={i} />)}
      </div>
    </section>
  )
}

/* ---------------- 5. Tuko hapa kukusaidia ---------------- */
function HelpCards() {
  const { t } = useApp()
  const C = [
    { icon: Phone, title: t('Tupigie', 'Call us'), body: <><span className="select-all font-bold text-ink">{BUSINESS.phoneLocal}</span><br /><span className="select-all font-bold text-ink">{BUSINESS.phone2Local}</span></>, tag: t('Jtt–Jmos', 'Mon–Sat') },
    { icon: MessageCircle, title: 'WhatsApp', body: t('Tuma faili, uliza bei, au weka oda.', 'Send files, ask prices or place an order.'), link: waLink(t('Habari Desc Point!', 'Hello Desc Point!')), cta: t('Anza chat', 'Start chat'), tag: t('Haraka', 'Fast'), green: true },
    { icon: Mail, title: 'Email', body: <span className="select-all break-all font-semibold text-ink">{BUSINESS.email}</span>, tag: '24/7' },
    { icon: HelpCircle, title: t('Maswali', 'FAQs'), body: t('Majibu ya maswali yanayoulizwa mara kwa mara.', 'Answers to common questions.'), to: '#faq', cta: t('Soma majibu', 'Read answers') },
  ]
  return (
    <section id="msaada" className="scroll-mt-28 bg-navy-950 py-16 text-white sm:py-20">
      <div className="container-x">
        <h2 className="font-display text-3xl font-black sm:text-4xl">{t('Tuko hapa kukusaidia', 'We’re here to help')}</h2>
        <p className="mt-2 text-white/60">{t('Chagua njia rahisi kwako kuwasiliana nasi.', 'Pick the easiest way for you to reach us.')}</p>
        <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {C.map((c) => (
            <motion.div key={c.title} variants={rise} className="relative flex flex-col rounded-3xl bg-white/[.06] p-6 ring-1 ring-white/10">
              {c.tag && <span className="absolute right-5 top-5 rounded-full bg-gold-400/15 px-2.5 py-1 text-[11px] font-bold text-gold-300">{c.tag}</span>}
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${c.green ? 'bg-[#25D366] text-white' : 'bg-gold-400 text-navy-950'}`}><c.icon className="h-6 w-6" /></span>
              <h3 className="mt-5 text-lg font-bold">{c.title}</h3>
              <div className="mt-1 flex-1 text-sm text-white/70 [&_.text-ink]:text-white">{c.body}</div>
              {c.cta && <a href={c.link || c.to} target={c.link ? '_blank' : undefined} rel="noreferrer"
                onClick={c.to ? (e) => { e.preventDefault(); document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }) } : undefined}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-300 hover:underline">{c.cta} <ArrowRight className="h-4 w-4" /></a>}
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ---------------- 6. Ushuhuda 3 ---------------- */
function Reviews() {
  const { t, x } = useApp()
  return (
    <section id="ushuhuda" className="container-x scroll-mt-28 py-16 sm:py-20">
      <SectionHead title={t('Wateja wetu, kipaumbele chetu', 'Our customers, our priority')} />
      <Stagger className="grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.slice(0, 3).map((r) => (
          <motion.figure key={r.name} variants={rise} className="flex flex-col rounded-3xl bg-surface p-6 ring-1 ring-ink/5 sm:p-7">
            <div className="flex gap-0.5 text-gold-500">{[...Array(5)].map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div>
            <blockquote className="mt-4 flex-1 text-ink/80">“{x(r.text)}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-navy-900 font-display font-black text-gold-300">{r.name[0]}</span>
              <span><b className="block text-ink">{r.name}</b><span className="text-sm text-ink/55">{x(r.role)}</span></span>
            </figcaption>
          </motion.figure>
        ))}
      </Stagger>
    </section>
  )
}

/* ---------------- 7. Pata duka karibu nawe ---------------- */
function StoreFinder() {
  const { t, x } = useApp()
  const status = useOpenStatus()
  return (
    <section className="container-x pb-16 sm:pb-20">
      <div className="grid overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-royal-600 to-navy-900 text-white md:grid-cols-[1fr_.8fr]">
        <div className="p-8 sm:p-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
            <span className={`h-2 w-2 rounded-full ${status.open ? 'bg-emerald-400' : 'bg-rose-400'}`} /> {status.open ? t('Tuko wazi sasa', 'Open now') : t('Tumefunga kwa sasa', 'Closed now')}
          </span>
          <h2 className="mt-4 font-display text-3xl font-black sm:text-4xl">{t('Pata duka karibu nawe', 'Find a store near you')}</h2>
          <p className="mt-2 flex items-center gap-2 text-white/75"><Clock className="h-4 w-4" /> {x(BUSINESS.hours.label)}, {x(BUSINESS.hours.time)}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {BUSINESS.branches.map((b) => (
              <a key={b.map} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.map)}`} target="_blank" rel="noreferrer"
                className="group flex items-center gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 transition hover:bg-white hover:text-navy-950">
                <MapPin className="h-6 w-6 shrink-0 text-gold-300 group-hover:text-gold-600" />
                <span><b className="block">{x(b.name)}</b><span className="text-sm opacity-70">{b.area}</span></span>
              </a>
            ))}
          </div>
        </div>
        <div className="relative min-h-[260px]">
          <SafeImg src={asset('images/shop-open-sign.jpg')} alt={t('Kibao cha Desc Point: Karibu, tuko wazi', 'Desc Point sign: Welcome, we’re open')} className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </section>
  )
}

/* ---------------- 8. Ofa kwa WhatsApp (badala ya newsletter) ---------------- */
function OffersSignup() {
  const { t } = useApp()
  return (
    <section className="border-t border-ink/5 bg-surface py-12">
      <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold-400 text-navy-950"><Bell className="h-6 w-6" /></span>
          <div>
            <h2 className="text-xl font-bold text-ink sm:text-2xl">{t('Usikose ofa za wiki', 'Never miss a weekly deal')}</h2>
            <p className="text-ink/60">{t('Tutakutumia ofa mpya na taarifa za HESLB, NIDA na mitihani moja kwa moja WhatsApp.', 'Get new deals and HESLB, NIDA and exam updates straight on WhatsApp.')}</p>
          </div>
        </div>
        <a href={waLink(t('Habari Desc Point! Naomba mniongeze kwenye orodha ya ofa na taarifa.', 'Hello Desc Point! Please add me to your offers and updates list.'))} target="_blank" rel="noreferrer"
          className="flex shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5">
          <MessageCircle className="h-5 w-5" /> {t('Nijulishe kwa WhatsApp', 'Notify me on WhatsApp')}
        </a>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <OfferBar />
      <HeroSlider />
      <PlanTiles />
      <Features />
      <NewArrivals />
      <HelpCards />
      <Reviews />
      <div id="faq" className="scroll-mt-28"><Faq /></div>
      <StoreFinder />
      <OffersSignup />
    </>
  )
}
