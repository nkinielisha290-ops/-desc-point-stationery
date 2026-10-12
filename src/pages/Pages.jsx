import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, MessageCircle, FileCheck2, Info, Monitor, Clock, Users, Briefcase, GraduationCap, Send, Check } from 'lucide-react'
import { ALL_ITEMS, ONLINE_SERVICES, SERVICE_GROUPS, waLink } from '../data/site'
import { useApp } from '../lib/store'
import { href } from '../lib/router'
import { SafeImg, Stagger, rise } from '../components/ui'
import PrintUpload from '../components/PrintUpload'
import Prices from '../components/Prices'
import DesignStudio from '../components/DesignStudio'
import Portfolio from '../components/Portfolio'
import Products from '../components/Products'
import Showcase from '../components/Showcase'
import School from '../components/School'
import Offers from '../components/Offers'
import OrderTracker from '../components/OrderTracker'
import Services from '../components/Services'
import WhyUs from '../components/WhyUs'
import Process from '../components/Process'
import Contact from '../components/Contact'

/* Kichwa cha kila ukurasa wa ndani: bluu iliyokolea, chini imepinda */
export function PageHero({ crumb, title, sub, children }) {
  const { t } = useApp()
  return (
    <section className="rounded-b-[40px] bg-navy-950 text-white sm:rounded-b-[56px]">
      <div className="container-x pb-10 pt-6 sm:pb-16 sm:pt-10">
        <nav aria-label={t('Ulipo', 'Breadcrumb')} className="flex items-center gap-1 text-sm text-white/55">
          <a href={href('/')} className="hover:text-white">{t('Mwanzo', 'Home')}</a> <ChevronRight className="h-4 w-4" /> <span className="font-semibold text-gold-300">{crumb}</span>
        </nav>
        <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-4xl font-display text-[clamp(1.85rem,6.6vw,3.6rem)] font-bold leading-[1.05]" style={{ textWrap: 'balance' }}>{title}</motion.h1>
        {sub && <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/65 sm:text-[17px]">{sub}</p>}
        {children}
      </div>
    </section>
  )
}

export function PrintingPage() {
  const { t } = useApp()
  return <>
    <PageHero crumb={t('Printing', 'Printing')} title={t('Printing & photocopy', 'Printing & photocopy')} sub={t('Pakia faili, chagua chaguo zako, ona bei papo hapo na tuma kwa WhatsApp.', 'Upload, pick your options, see the price and send on WhatsApp.')} />
    <PrintUpload />
    <Prices />
  </>
}

export function DesignPage() {
  const { t } = useApp()
  return <>
    <PageHero crumb="Design" title={t('Design studio', 'Design studio')} sub={t('Kadi za harusi, logo, business cards, banners na T-shirts. Quality arts and designing.', 'Wedding cards, logos, business cards, banners and T-shirts. Quality arts and designing.')} />
    <DesignStudio />
    <Process />
  </>
}

export function PortfolioPage() {
  const { t } = useApp()
  return <>
    <PageHero crumb={t('Kazi zetu', 'Our work')} title={t('Kazi tulizowafanyia wateja', 'Work we’ve done for customers')} />
    <Portfolio />
  </>
}

export function ShopPage({ cat }) {
  const { t } = useApp()
  return <>
    <PageHero crumb={t('Duka', 'Shop')} title={t('Duka la Desc Point', 'The Desc Point shop')} sub={t('Vifaa vya shule, ofisi na sanaa kwa bei halisi. Agiza kwa WhatsApp, chukua dukani au tukuletee.', 'School, office and art supplies at real prices. Order on WhatsApp, collect or get it delivered.')} />
    <Products initialCat={cat} />
    <School />
    <Showcase />
  </>
}

export function OffersPage() {
  const { t } = useApp()
  return <>
    <PageHero crumb={t('Ofa', 'Offers')} title={t('Ofa za wiki', 'Weekly offers')} />
    <Offers />
  </>
}

export function TrackPage() {
  const { t } = useApp()
  return <>
    <PageHero crumb={t('Fuatilia oda', 'Track order')} title={t('Fuatilia oda yako', 'Track your order')} />
    <OrderTracker />
  </>
}

export function ServicesPage() {
  const { t } = useApp()
  return <>
    <PageHero crumb={t('Huduma zote', 'All services')} title={t('Huduma zetu zote', 'All our services')} />
    <Services />
    <Prices />
  </>
}

export function AboutPage() {
  const { t } = useApp()
  return <>
    <PageHero crumb={t('Kuhusu sisi', 'About us')} title={t('Kuhusu Desc Point Stationery', 'About Desc Point Stationery')} sub={t('Quality arts and designing. Maduka mawili: Madafu na Zegereni, Kibaha.', 'Quality arts and designing. Two shops: Madafu and Zegereni, Kibaha.')} />
    <WhyUs />
    <div id="maduka" className="scroll-mt-28"><Contact /></div>
  </>
}

/* ---------------- Huduma za mtandaoni ---------------- */
export function OnlinePage() {
  const { t, x } = useApp()
  return <>
    <PageHero crumb={t('Huduma za mtandaoni', 'Online services')} title={t('Huduma za mtandaoni, bila foleni', 'Online services, without the queue')}
      sub={t('Tunajaza, tunascan, tunapakia na kutuma maombi yako. Unaondoka na nakala ya kila ulichotuma.', 'We fill in, scan, upload and submit your application. You leave with a copy of everything.')}>
      <div className="mt-7 flex flex-wrap gap-2">
        {ONLINE_SERVICES.map((s) => <a key={s.id} href={href(`/mtandaoni#${s.id}`)} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gold-400 hover:text-navy-950">{x(s.name).split('—')[0].trim()}</a>)}
      </div>
    </PageHero>
    <section className="container-x space-y-6 py-14 sm:py-20">
      {ONLINE_SERVICES.map((s, i) => {
        const item = ALL_ITEMS.find((it) => it.id === s.itemId)
        return (
          <motion.article key={s.id} id={s.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}
            className="grid scroll-mt-28 overflow-hidden rounded-[32px] bg-surface ring-1 ring-ink/[.07] md:grid-cols-[320px_1fr]">
            <div className="relative min-h-[220px] bg-navy-900">
              <SafeImg src={item?.img} alt={x(s.name)} className={`relative h-full w-full ${item?.fit === 'contain' ? 'object-contain p-4' : 'object-cover'}`} />
            </div>
            <div className="p-6 sm:p-9">
              <span className="text-xs font-bold text-gold-600">{t('Huduma ya mtandaoni', 'Online service')}</span>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">{x(s.name)}</h2>
              <p className="mt-3 text-ink/65">{x(item?.desc)}</p>
              <div className="mt-6 rounded-2xl bg-ink/[.035] p-5">
                <p className="flex items-center gap-2 font-semibold text-ink"><FileCheck2 className="h-5 w-5 text-royal-500" /> {t('Viambata unavyohitaji', 'What to bring')}</p>
                {s.requirements ? (
                  <>
                    {s.note && <p className="mt-2 text-sm font-medium text-ink/70">{x(s.note)}</p>}
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {s.requirements.map((r) => <li key={r.sw} className="flex gap-2 text-sm text-ink/75"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />{x(r)}</li>)}
                    </ul>
                  </>
                ) : (
                  <p className="mt-2 flex items-start gap-2 text-sm text-ink/65"><Info className="mt-0.5 h-4 w-4 shrink-0" /> {t('Tuandikie WhatsApp tukutumie orodha kamili ya viambata kabla hujaja dukani.', 'Message us on WhatsApp and we’ll send the full document list before you come in.')}</p>
                )}
              </div>
              <a href={waLink(t(`Habari Desc Point! Nataka huduma ya ${x(s.name)}. Naomba maelekezo na bei.`, `Hello Desc Point! I need help with ${x(s.name)}. Please send the requirements and price.`))} target="_blank" rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5">
                <MessageCircle className="h-5 w-5" /> {t('Anza maombi kwa WhatsApp', 'Start on WhatsApp')}
              </a>
            </div>
          </motion.article>
        )
      })}
    </section>
  </>
}

/* ---------------- Kozi ya kompyuta ---------------- */
export function CoursePage() {
  const { t, x } = useApp()
  const course = SERVICE_GROUPS.find((g) => g.id === 'course')
  const [form, setForm] = useState({ name: '', time: 0, modules: [] })
  const TIMES = [t('Asubuhi', 'Morning'), t('Mchana', 'Afternoon'), t('Jioni', 'Evening'), t('Jumamosi', 'Saturday')]
  const WHO = [
    [GraduationCap, t('Wanafunzi', 'Students'), t('Waliomaliza kidato cha 4 au 6 wanaojiandaa na chuo', 'Form 4 or 6 leavers getting ready for college')],
    [Briefcase, t('Wanaotafuta kazi', 'Job seekers'), t('Ujuzi unaoombwa kwenye kazi nyingi, pamoja na Ajira Portal', 'Skills most jobs ask for, plus Ajira Portal')],
    [Users, t('Wafanyabiashara', 'Business owners'), t('Hesabu kwa Excel, barua, na matangazo kwa PowerPoint', 'Accounts in Excel, letters, and adverts in PowerPoint')],
  ]
  const toggle = (m) => setForm((f) => ({ ...f, modules: f.modules.includes(m) ? f.modules.filter((v) => v !== m) : [...f.modules, m] }))
  const send = (e) => {
    e.preventDefault()
    const mods = form.modules.length ? form.modules.map((i) => x(course.items[i])).join(', ') : t('Bado sijaamua', 'Not sure yet')
    window.open(waLink(t(
      `Habari Desc Point! Nataka kujisajili kozi ya kompyuta.\nJina: ${form.name}\nMasomo: ${mods}\nMuda: ${TIMES[form.time]}\n\nNaomba ratiba na ada.`,
      `Hello Desc Point! I want to join the computer course.\nName: ${form.name}\nModules: ${mods}\nTime: ${TIMES[form.time]}\n\nPlease send the schedule and fees.`,
    )), '_blank', 'noopener')
  }
  return <>
    <PageHero crumb={t('Kozi ya kompyuta', 'Computer course')} title={x(course.title)} sub={x(course.blurb)} />
    <section className="container-x grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{t('Utajifunza nini?', 'What you’ll learn')}</h2>
        <Stagger className="mt-6 grid gap-3 sm:grid-cols-2">
          {course.items.map((it, i) => (
            <motion.div key={it.sw} variants={rise} className="flex items-center gap-3 rounded-2xl bg-surface p-4 ring-1 ring-ink/5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-royal-500/10 font-display font-bold text-royal-500">{i + 1}</span>
              <span className="font-semibold text-ink">{x(it)}</span>
            </motion.div>
          ))}
        </Stagger>
        <h2 className="mt-12 font-display text-2xl font-bold text-ink sm:text-3xl">{t('Kozi hii ni kwa nani?', 'Who is it for?')}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {WHO.map(([I, title, d]) => (
            <div key={title} className="rounded-2xl bg-navy-900 p-5 text-white">
              <I className="h-7 w-7 text-gold-400" />
              <b className="mt-3 block">{title}</b>
              <p className="mt-1 text-sm text-white/65">{d}</p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={send} className="h-fit rounded-[36px] bg-surface p-6 shadow-2xl ring-1 ring-ink/5 sm:p-8 lg:sticky lg:top-28">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-400 text-navy-950"><Monitor className="h-6 w-6" /></span>
        <h2 className="mt-4 font-display text-2xl font-bold text-ink">{t('Jisajili sasa', 'Register now')}</h2>
        <p className="mt-1 text-sm text-ink/60">{t('Tutakutumia ratiba ya madarasa na ada kwa WhatsApp.', 'We’ll send the class schedule and fees on WhatsApp.')}</p>
        <label htmlFor="course-name" className="mt-6 block text-sm font-semibold text-ink/70">{t('Jina lako', 'Your name')}</label>
        <input id="course-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-xl bg-ink/5 px-4 py-3 outline-none ring-gold-400 focus:ring-2" />
        <p className="mt-5 text-sm font-semibold text-ink/70">{t('Masomo unayotaka', 'Modules you want')}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {course.items.map((it, i) => (
            <button type="button" key={it.sw} onClick={() => toggle(i)} aria-pressed={form.modules.includes(i)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition ${form.modules.includes(i) ? 'bg-gold-400 text-navy-950 ring-gold-400' : 'text-ink/70 ring-ink/15 hover:ring-gold-400'}`}>{x(it)}</button>
          ))}
        </div>
        <p className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-ink/70"><Clock className="h-4 w-4" /> {t('Muda unaokufaa', 'Preferred time')}</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {TIMES.map((tm, i) => (
            <button type="button" key={tm} onClick={() => setForm({ ...form, time: i })} aria-pressed={form.time === i}
              className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition ${form.time === i ? 'bg-navy-900 text-white dark:bg-gold-400 dark:text-navy-950' : 'bg-ink/5 text-ink/70'}`}>{tm}</button>
          ))}
        </div>
        <button className="btn-gold mt-7 w-full"><Send className="h-4 w-4" /> {t('Tuma usajili kwa WhatsApp', 'Register on WhatsApp')}</button>
      </form>
    </section>
  </>
}
