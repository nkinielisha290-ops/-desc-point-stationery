import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarCheck, CalendarPlus, MessageCircle, Printer, Plus, Trash2, Check, Copy, RotateCcw, School, MapPin, Clock, Sparkles } from 'lucide-react'
import { BUSINESS, ONLINE_SERVICES, waLink } from '../data/site'
import { useApp } from '../lib/store'
import { icsFile, isPast, slots, swTime, workDays, ymd } from '../lib/eat'
import { tsh } from '../components/ui'
import { PageHero } from './Pages'

// Hifadhi ya rasimu (inabaki hata ukifunga ukurasa)
function useDraft(key, initial) {
  const [v, setV] = useState(() => { try { return JSON.parse(localStorage.getItem(key)) ?? initial } catch { return initial } })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)) } catch { /* hifadhi imezuiwa */ } }, [key, v])
  return [v, setV]
}
const code = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
const Field = ({ id, label, children, hint }) => (
  <div>
    <label htmlFor={id} className="text-sm font-semibold text-ink/70">{label}</label>
    <div className="mt-1.5">{children}</div>
    {hint && <p className="mt-1 text-xs text-ink/45">{hint}</p>}
  </div>
)
const inp = 'w-full rounded-2xl bg-canvas px-4 py-3 text-ink outline-none ring-1 ring-ink/10 transition focus:ring-2 focus:ring-gold-400'

/* =====================================================================
   1. WEKA MIADI
   ===================================================================== */
export function BookingPage() {
  const { t, x, notify } = useApp()
  const SERVICES = [
    ...ONLINE_SERVICES.map((s) => ({ id: s.id, label: s.name, minutes: 45 })),
    { id: 'design', label: { sw: 'Kuongea na mbunifu (design)', en: 'Meet a designer' }, minutes: 30 },
    { id: 'print', label: { sw: 'Printing kubwa / bulk', en: 'Large / bulk printing' }, minutes: 30 },
    { id: 'kozi', label: { sw: 'Kujisajili kozi ya kompyuta', en: 'Computer course registration' }, minutes: 30 },
  ]
  const days = useMemo(() => workDays(12, BUSINESS.hours.closedDay), [])
  const [branch, setBranch] = useState(0)
  const [service, setService] = useState('heslb')
  const [day, setDay] = useState(ymd(days[0]))
  const [time, setTime] = useState(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [done, setDone] = useState(null)
  const [mine, setMine] = useDraft('dps-bookings', [])

  const svc = SERVICES.find((s) => s.id === service)
  const times = slots(BUSINESS.hours.open, BUSINESS.hours.close)
  const dayLabel = (d) => d.toLocaleDateString(t('sw-TZ', 'en-GB'), { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' })
  const longDay = (s) => new Date(s + 'T00:00:00Z').toLocaleDateString(t('sw-TZ', 'en-GB'), { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' })
  useEffect(() => { if (time && isPast(day, time)) setTime(null) }, [day, time])

  const ready = time && name.trim().length > 1 && phone.replace(/\D/g, '').length >= 9
  const book = () => {
    const b = { id: code('MIADI'), branch: x(BUSINESS.branches[branch].name), area: BUSINESS.branches[branch].area, service: x(svc.label), day, time, name, phone, minutes: svc.minutes }
    setMine((m) => [b, ...m].slice(0, 10))
    setDone(b)
    window.open(waLink(t(
      `Habari Desc Point! Naomba kuthibitisha miadi:\n\n🗓️ Namba: *${b.id}*\n📍 ${b.branch}\n🧾 ${b.service}\n📅 ${longDay(day)}\n⏰ ${swTime(time)} (${time})\n👤 ${name}, ${phone}`,
      `Hello Desc Point! Please confirm my appointment:\n\n🗓️ Ref: *${b.id}*\n📍 ${b.branch}\n🧾 ${b.service}\n📅 ${longDay(day)}\n⏰ ${time}\n👤 ${name}, ${phone}`,
    )), '_blank', 'noopener')
  }
  const calendarHref = (b) => {
    const ics = icsFile({ title: `Desc Point: ${b.service}`, description: `${t('Namba ya miadi', 'Appointment ref')}: ${b.id}. ${t('Simu', 'Phone')}: ${BUSINESS.phoneLocal}`, location: `Desc Point Stationery, ${b.area}`, dateStr: b.day, hhmm: b.time, minutes: b.minutes })
    return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics)
  }

  return <>
    <PageHero crumb={t('Weka miadi', 'Book a visit')} title={t('Weka miadi, usipange foleni', 'Book a time, skip the queue')}
      sub={t('Chagua tawi, huduma na saa inayokufaa. Tutakuwa tayari ukifika, na viambata vyako vitaangaliwa haraka.', 'Choose a branch, service and time. We’ll be ready when you arrive.')} />
    <section className="container-x grid grid-cols-1 gap-8 py-12 sm:py-16 [&>*]:min-w-0 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-extrabold text-ink">{t('Tawi', 'Branch')}</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {BUSINESS.branches.map((b, i) => (
              <button key={b.map} onClick={() => setBranch(i)} aria-pressed={branch === i}
                className={`flex items-center gap-3 rounded-[24px] p-4 text-left ring-2 transition-colors ${branch === i ? 'bg-navy-900 text-white ring-navy-900 dark:bg-royal-600 dark:ring-royal-600' : 'bg-surface ring-ink/10'}`}>
                <MapPin className={`h-6 w-6 shrink-0 ${branch === i ? 'text-gold-300' : 'text-royal-500'}`} />
                <span><b className="block">{x(b.name)}</b><span className={`text-sm ${branch === i ? 'text-white/70' : 'text-ink/55'}`}>{b.area}</span></span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-ink">{t('Huduma', 'Service')}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <button key={s.id} onClick={() => setService(s.id)} aria-pressed={service === s.id}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${service === s.id ? 'bg-gold-400 text-navy-950' : 'bg-surface text-ink/70 ring-1 ring-ink/10 hover:text-ink'}`}>
                {x(s.label).split('—')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-ink">{t('Tarehe', 'Date')}</h2>
          <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
            {days.map((d) => {
              const k = ymd(d)
              return (
                <button key={k} onClick={() => setDay(k)} aria-pressed={day === k}
                  className={`w-[76px] shrink-0 rounded-[20px] py-3 text-center transition-colors ${day === k ? 'bg-navy-900 text-white dark:bg-royal-600' : 'bg-surface text-ink ring-1 ring-ink/10'}`}>
                  <span className="block text-xs opacity-70">{dayLabel(d).split(' ')[0].replace(',', '')}</span>
                  <span className="block text-2xl font-extrabold">{d.getUTCDate()}</span>
                  <span className="block text-xs opacity-70">{d.toLocaleDateString(t('sw-TZ', 'en-GB'), { month: 'short', timeZone: 'UTC' })}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-ink">{t('Saa', 'Time')}</h2>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
            {times.map((tm) => {
              const past = isPast(day, tm)
              return (
                <button key={tm} disabled={past} onClick={() => setTime(tm)} aria-pressed={time === tm}
                  className={`rounded-2xl py-2.5 text-sm font-semibold tabular-nums transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${time === tm ? 'bg-gold-400 text-navy-950' : 'bg-surface text-ink ring-1 ring-ink/10 hover:ring-gold-400'}`}>
                  {tm}
                </button>
              )
            })}
          </div>
          {time && <p className="mt-2 text-sm text-ink/55">{t('Kwa Kiswahili:', 'In Swahili time:')} {swTime(time)}</p>}
        </div>
      </div>

      {/* Muhtasari */}
      <aside className="h-fit space-y-4 lg:sticky lg:top-28">
        <div className="rounded-[32px] bg-surface p-6 ring-1 ring-ink/[.07] sm:p-7">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-ink"><CalendarCheck className="h-6 w-6 text-royal-500" /> {t('Miadi yako', 'Your appointment')}</h2>
          <dl className="mt-5 space-y-3 text-[15px]">
            <div className="flex justify-between gap-4"><dt className="text-ink/55">{t('Tawi', 'Branch')}</dt><dd className="text-right font-semibold">{x(BUSINESS.branches[branch].name)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-ink/55">{t('Huduma', 'Service')}</dt><dd className="text-right font-semibold">{x(svc.label)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-ink/55">{t('Tarehe', 'Date')}</dt><dd className="text-right font-semibold">{longDay(day)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-ink/55">{t('Saa', 'Time')}</dt><dd className="text-right font-semibold">{time ? `${time} (${swTime(time)})` : t('Chagua saa', 'Pick a time')}</dd></div>
          </dl>
          <div className="mt-6 grid gap-3">
            <Field id="bk-name" label={t('Jina lako', 'Your name')}><input id="bk-name" value={name} onChange={(e) => setName(e.target.value)} className={inp} autoComplete="name" /></Field>
            <Field id="bk-phone" label={t('Namba ya simu', 'Phone number')}><input id="bk-phone" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" placeholder="07xx xxx xxx" className={inp} autoComplete="tel" /></Field>
          </div>
          <button disabled={!ready} onClick={book} className="btn-gold mt-6 w-full disabled:pointer-events-none disabled:opacity-40">
            <MessageCircle className="h-5 w-5" /> {t('Thibitisha kwa WhatsApp', 'Confirm on WhatsApp')}
          </button>
          {!ready && <p className="mt-2 text-center text-xs text-ink/45">{t('Chagua saa, kisha andika jina na namba ya simu.', 'Pick a time, then add your name and phone.')}</p>}
        </div>

        <AnimatePresence>
          {done && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-[28px] bg-emerald-500/10 p-5 ring-1 ring-emerald-500/30">
              <p className="font-bold text-ink">{t('Miadi imeandaliwa', 'Appointment prepared')}: <span className="select-all">{done.id}</span></p>
              <p className="mt-1 text-sm text-ink/65">{t('Tutakuthibitishia kwa WhatsApp. Ongeza kwenye kalenda upate ukumbusho saa 1 kabla.', 'We’ll confirm on WhatsApp. Add it to your calendar for a reminder an hour before.')}</p>
              <a href={calendarHref(done)} download={`desc-point-${done.id}.ics`} onClick={() => notify(t('Faili la kalenda limepakuliwa', 'Calendar file downloaded'))}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-gold-400 dark:text-navy-950"><CalendarPlus className="h-4 w-4" /> {t('Ongeza kwenye kalenda', 'Add to calendar')}</a>
            </motion.div>
          )}
        </AnimatePresence>

        {mine.length > 0 && (
          <div className="rounded-[28px] bg-surface p-5 ring-1 ring-ink/[.07]">
            <p className="text-sm font-semibold text-ink/60">{t('Miadi zako za karibuni (kwenye simu hii)', 'Your recent bookings (this device)')}</p>
            <ul className="mt-3 divide-y divide-ink/5">
              {mine.slice(0, 4).map((b) => (
                <li key={b.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <span><b className="block text-ink">{b.service}</b><span className="text-ink/55">{b.day} · {b.time} · {b.branch}</span></span>
                  <a href={calendarHref(b)} download={`desc-point-${b.id}.ics`} aria-label={t('Ongeza kwenye kalenda', 'Add to calendar')} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-canvas text-royal-500"><CalendarPlus className="h-4 w-4" /></a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </section>
  </>
}

/* =====================================================================
   2. TENGENEZA CV
   ===================================================================== */
const CV0 = {
  name: '', title: '', phone: '', email: '', location: 'Kibaha, Pwani', summary: '',
  education: [{ school: '', course: '', years: '' }],
  experience: [{ role: '', org: '', years: '', notes: '' }],
  skills: 'Microsoft Word, Excel, Huduma kwa wateja', languages: 'Kiswahili, English',
  referees: [{ name: '', role: '', phone: '' }],
}
export function CvPage() {
  const { t } = useApp()
  const [cv, setCv] = useDraft('dps-cv', CV0)
  const set = (k, v) => setCv((c) => ({ ...c, [k]: v }))
  const setRow = (k, i, f, v) => setCv((c) => ({ ...c, [k]: c[k].map((r, j) => (j === i ? { ...r, [f]: v } : r)) }))
  const addRow = (k) => setCv((c) => ({ ...c, [k]: [...c[k], Object.fromEntries(Object.keys(CV0[k][0]).map((f) => [f, '']))] }))
  const delRow = (k, i) => setCv((c) => ({ ...c, [k]: c[k].filter((_, j) => j !== i) }))
  const list = (s) => s.split(',').map((v) => v.trim()).filter(Boolean)

  const Rows = ({ k, fields, title }) => (
    <fieldset className="rounded-[24px] bg-surface p-4 ring-1 ring-ink/[.07] sm:p-5">
      <legend className="sr-only">{title}</legend>
      <div className="flex items-center justify-between"><h3 className="font-bold text-ink">{title}</h3>
        <button type="button" onClick={() => addRow(k)} className="inline-flex items-center gap-1 rounded-full bg-canvas px-3 py-1.5 text-sm font-semibold text-royal-500"><Plus className="h-4 w-4" /> {t('Ongeza', 'Add')}</button></div>
      <div className="mt-3 space-y-4">
        {cv[k].map((r, i) => (
          <div key={i} className="grid gap-2 sm:grid-cols-2">
            {fields.map(([f, label, wide]) => (
              <input key={f} aria-label={`${title} ${i + 1}: ${label}`} placeholder={label} value={r[f]} onChange={(e) => setRow(k, i, f, e.target.value)} className={`${inp} ${wide ? 'sm:col-span-2' : ''}`} />
            ))}
            {cv[k].length > 1 && <button type="button" onClick={() => delRow(k, i)} className="inline-flex w-fit items-center gap-1 text-sm text-rose-600"><Trash2 className="h-4 w-4" /> {t('Ondoa', 'Remove')}</button>}
          </div>
        ))}
      </div>
    </fieldset>
  )

  return <>
    <PageHero crumb="CV" title={t('Tengeneza CV yako bure', 'Make your CV for free')}
      sub={t('Jaza taarifa zako, CV inajitengeneza upande wa pili. Ihifadhi kama PDF au tuletee tuiprinte kwenye karatasi nzuri.', 'Fill in your details and your CV builds itself. Save it as a PDF or bring it to us to print on quality paper.')} />
    <section className="container-x grid grid-cols-1 gap-8 py-12 sm:py-16 [&>*]:min-w-0 xl:grid-cols-[1fr_1.05fr]">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 print:hidden">
        <div className="grid gap-3 rounded-[24px] bg-surface p-4 ring-1 ring-ink/[.07] sm:grid-cols-2 sm:p-5">
          <Field id="cv-name" label={t('Jina kamili', 'Full name')}><input id="cv-name" value={cv.name} onChange={(e) => set('name', e.target.value)} className={inp} /></Field>
          <Field id="cv-title" label={t('Cheo / taaluma', 'Job title')}><input id="cv-title" value={cv.title} onChange={(e) => set('title', e.target.value)} placeholder={t('Mf. Mhasibu', 'e.g. Accountant')} className={inp} /></Field>
          <Field id="cv-phone" label={t('Simu', 'Phone')}><input id="cv-phone" value={cv.phone} onChange={(e) => set('phone', e.target.value)} inputMode="tel" className={inp} /></Field>
          <Field id="cv-email" label="Email"><input id="cv-email" value={cv.email} onChange={(e) => set('email', e.target.value)} inputMode="email" className={inp} /></Field>
          <div className="sm:col-span-2"><Field id="cv-loc" label={t('Mahali', 'Location')}><input id="cv-loc" value={cv.location} onChange={(e) => set('location', e.target.value)} className={inp} /></Field></div>
          <div className="sm:col-span-2"><Field id="cv-sum" label={t('Kuhusu wewe (sentensi 2–3)', 'About you (2–3 sentences)')}><textarea id="cv-sum" rows={3} value={cv.summary} onChange={(e) => set('summary', e.target.value)} className={`${inp} resize-none`} /></Field></div>
        </div>
        <Rows k="education" title={t('Elimu', 'Education')} fields={[['school', t('Shule / chuo', 'School / college')], ['course', t('Kozi / kiwango', 'Course / level')], ['years', t('Miaka (mf. 2019–2022)', 'Years (e.g. 2019–2022)'), true]]} />
        <Rows k="experience" title={t('Uzoefu wa kazi', 'Work experience')} fields={[['role', t('Cheo', 'Role')], ['org', t('Kampuni / taasisi', 'Organisation')], ['years', t('Miaka', 'Years')], ['notes', t('Ulichofanya', 'What you did')]]} />
        <div className="grid gap-3 rounded-[24px] bg-surface p-4 ring-1 ring-ink/[.07] sm:grid-cols-2 sm:p-5">
          <Field id="cv-skills" label={t('Ujuzi (tenganisha kwa koma)', 'Skills (comma separated)')}><input id="cv-skills" value={cv.skills} onChange={(e) => set('skills', e.target.value)} className={inp} /></Field>
          <Field id="cv-lang" label={t('Lugha', 'Languages')}><input id="cv-lang" value={cv.languages} onChange={(e) => set('languages', e.target.value)} className={inp} /></Field>
        </div>
        <Rows k="referees" title={t('Wadhamini (referees)', 'Referees')} fields={[['name', t('Jina', 'Name')], ['role', t('Cheo / mahali', 'Role / place')], ['phone', t('Simu', 'Phone'), true]]} />
        <button type="button" onClick={() => setCv(CV0)} className="inline-flex items-center gap-2 text-sm font-semibold text-ink/50 hover:text-rose-600"><RotateCcw className="h-4 w-4" /> {t('Anza upya', 'Start over')}</button>
      </form>

      <div className="space-y-4 xl:sticky xl:top-28 xl:self-start">
        <div className="flex flex-wrap gap-2 print:hidden">
          <button onClick={() => window.print()} className="btn-gold"><Printer className="h-4 w-4" /> {t('Hifadhi PDF / Print', 'Save PDF / Print')}</button>
          <a href={waLink(t(`Habari Desc Point! Nimetengeneza CV yangu (${cv.name || 'jina'}). Naomba kuiprint nakala ___ kwenye karatasi nzuri.`, `Hello Desc Point! I made my CV (${cv.name || 'name'}). Please print ___ copies on quality paper.`))} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white"><MessageCircle className="h-4 w-4" /> {t('Agiza printing', 'Order printing')}</a>
        </div>
        <p className="text-xs text-ink/45 print:hidden">{t('Rasimu yako inahifadhiwa kwenye simu hii tu. Bonyeza "Hifadhi PDF", chagua "Save as PDF", kisha tutumie faili.', 'Your draft is saved on this device only. Tap "Save PDF", choose "Save as PDF", then send us the file.')}</p>

        {/* A4 preview */}
        <article id="print-area" className="mx-auto aspect-[1/1.414] w-full max-w-[640px] overflow-hidden rounded-[18px] bg-white text-[#0a1a5c] shadow-[0_30px_60px_-30px_rgba(10,26,92,.5)] ring-1 ring-black/5 print:aspect-auto print:max-w-none print:rounded-none print:shadow-none print:ring-0">
          <div className="grid h-full grid-cols-[34%_1fr] text-[11px] leading-relaxed sm:text-[12.5px]">
            <div className="bg-[#0a1a5c] p-5 text-white sm:p-7">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-[#f5b800] text-2xl font-extrabold text-[#0a1a5c]">{(cv.name || '?').trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase()}</div>
              <p className="mt-5 font-bold text-[#ffd23f]">{t('Mawasiliano', 'Contact')}</p>
              <p className="mt-1 break-words opacity-90">{cv.phone || '—'}<br />{cv.email || '—'}<br />{cv.location}</p>
              <p className="mt-5 font-bold text-[#ffd23f]">{t('Ujuzi', 'Skills')}</p>
              <ul className="mt-1 space-y-0.5 opacity-90">{list(cv.skills).map((s) => <li key={s}>• {s}</li>)}</ul>
              <p className="mt-5 font-bold text-[#ffd23f]">{t('Lugha', 'Languages')}</p>
              <p className="mt-1 opacity-90">{list(cv.languages).join(', ')}</p>
            </div>
            <div className="p-5 sm:p-7">
              <h2 className="text-[22px] font-extrabold leading-tight sm:text-[28px]">{cv.name || t('Jina lako', 'Your name')}</h2>
              <p className="font-semibold text-[#1440d6]">{cv.title || t('Cheo chako', 'Your title')}</p>
              {cv.summary && <p className="mt-3 text-[#334]">{cv.summary}</p>}
              <h3 className="mt-5 border-b-2 border-[#f5b800] pb-1 font-extrabold">{t('Elimu', 'Education')}</h3>
              {cv.education.filter((e) => e.school || e.course).map((e, i) => <p key={i} className="mt-2"><b>{e.course}</b>{e.course && e.school ? ', ' : ''}{e.school}<br /><span className="text-[#667]">{e.years}</span></p>)}
              <h3 className="mt-5 border-b-2 border-[#f5b800] pb-1 font-extrabold">{t('Uzoefu wa kazi', 'Experience')}</h3>
              {cv.experience.filter((e) => e.role || e.org).map((e, i) => <p key={i} className="mt-2"><b>{e.role}</b>{e.role && e.org ? ', ' : ''}{e.org} <span className="text-[#667]">{e.years}</span>{e.notes && <><br />{e.notes}</>}</p>)}
              <h3 className="mt-5 border-b-2 border-[#f5b800] pb-1 font-extrabold">{t('Wadhamini', 'Referees')}</h3>
              {cv.referees.filter((r) => r.name).map((r, i) => <p key={i} className="mt-2"><b>{r.name}</b>{r.role ? `, ${r.role}` : ''}<br /><span className="text-[#667]">{r.phone}</span></p>)}
            </div>
          </div>
        </article>
      </div>
    </section>
  </>
}

/* =====================================================================
   3. TENGENEZA KADI YA MWALIKO
   ===================================================================== */
const INVITE_TYPES = [
  { id: 'harusi', sw: 'Harusi', en: 'Wedding', intro: { sw: 'Familia zinayo furaha kukualika kwenye harusi ya', en: 'Our families joyfully invite you to the wedding of' } },
  { id: 'sendoff', sw: 'Send-off', en: 'Send-off', intro: { sw: 'Unakaribishwa kwenye sherehe ya send-off ya', en: 'You are invited to the send-off of' } },
  { id: 'birthday', sw: 'Birthday', en: 'Birthday', intro: { sw: 'Karibu tusherehekee siku ya kuzaliwa ya', en: 'Join us to celebrate the birthday of' } },
  { id: 'mahafali', sw: 'Mahafali', en: 'Graduation', intro: { sw: 'Unakaribishwa kwenye mahafali ya', en: 'You are invited to the graduation of' } },
]
const INVITE_THEMES = [
  { id: 'gold', bg: '#0a1a5c', fg: '#ffffff', ac: '#f5b800', sw: 'Navy na dhahabu', en: 'Navy and gold' },
  { id: 'blush', bg: '#fbeef0', fg: '#5b2333', ac: '#c9707c', sw: 'Waridi', en: 'Blush' },
  { id: 'sage', bg: '#eef3ec', fg: '#1f4d3a', ac: '#b49a5a', sw: 'Kijani laini', en: 'Sage' },
  { id: 'ivory', bg: '#ffffff', fg: '#1a1a1a', ac: '#b8860b', sw: 'Nyeupe', en: 'Ivory' },
]
export function InvitePage() {
  const { t, x } = useApp()
  const [d, setD] = useDraft('dps-invite', { type: 'harusi', theme: 'gold', names: '', date: '', time: '14:00', venue: '', rsvp: '', qty: 100 })
  const set = (k, v) => setD((c) => ({ ...c, [k]: v }))
  const type = INVITE_TYPES.find((i) => i.id === d.type)
  const th = INVITE_THEMES.find((i) => i.id === d.theme)
  const price = 2500 // TSh kwa kadi (DESIGN_TYPES: harusi)
  const qty = Math.max(50, +d.qty || 50)
  const dateText = d.date ? new Date(d.date + 'T00:00:00Z').toLocaleDateString(t('sw-TZ', 'en-GB'), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : t('Tarehe', 'Date')

  return <>
    <PageHero crumb={t('Kadi ya mwaliko', 'Invitation card')} title={t('Tengeneza kadi yako ya mwaliko', 'Design your invitation card')}
      sub={t('Andika majina, tarehe na ukumbi, uone kadi ikitengenezwa. Ukiridhika, agiza tukuchapishie kwenye karatasi ya kifahari.', 'Type the names, date and venue to see your card. When you’re happy, order it printed on premium paper.')} />
    <section className="container-x grid grid-cols-1 gap-8 py-12 sm:py-16 [&>*]:min-w-0 lg:grid-cols-[1fr_1fr]">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5 print:hidden">
        <div>
          <p className="text-sm font-semibold text-ink/70">{t('Aina ya sherehe', 'Occasion')}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {INVITE_TYPES.map((i) => <button type="button" key={i.id} onClick={() => set('type', i.id)} aria-pressed={d.type === i.id} className={`rounded-full px-4 py-2.5 text-sm font-semibold ${d.type === i.id ? 'bg-navy-900 text-white dark:bg-gold-400 dark:text-navy-950' : 'bg-surface text-ink/70 ring-1 ring-ink/10'}`}>{t(i.sw, i.en)}</button>)}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink/70">{t('Rangi', 'Colours')}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {INVITE_THEMES.map((i) => (
              <button type="button" key={i.id} onClick={() => set('theme', i.id)} aria-pressed={d.theme === i.id} className={`flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-semibold ring-2 ${d.theme === i.id ? 'ring-gold-400' : 'ring-ink/10'}`}>
                <span className="h-7 w-7 rounded-full ring-1 ring-black/10" style={{ background: `linear-gradient(135deg, ${i.bg} 50%, ${i.ac} 50%)` }} /> {t(i.sw, i.en)}
              </button>
            ))}
          </div>
        </div>
        <Field id="iv-names" label={t('Majina', 'Names')} hint={t('Mf. Neema & Daudi', 'e.g. Neema & Daudi')}><input id="iv-names" value={d.names} onChange={(e) => set('names', e.target.value)} className={inp} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field id="iv-date" label={t('Tarehe', 'Date')}><input id="iv-date" type="date" value={d.date} onChange={(e) => set('date', e.target.value)} className={inp} /></Field>
          <Field id="iv-time" label={t('Saa', 'Time')}><input id="iv-time" type="time" value={d.time} onChange={(e) => set('time', e.target.value)} className={inp} /></Field>
        </div>
        <Field id="iv-venue" label={t('Ukumbi / mahali', 'Venue')}><input id="iv-venue" value={d.venue} onChange={(e) => set('venue', e.target.value)} className={inp} /></Field>
        <Field id="iv-rsvp" label={t('Mawasiliano (RSVP)', 'RSVP contact')}><input id="iv-rsvp" value={d.rsvp} onChange={(e) => set('rsvp', e.target.value)} inputMode="tel" className={inp} /></Field>
        <div className="rounded-[24px] bg-surface p-5 ring-1 ring-ink/[.07]">
          <Field id="iv-qty" label={t('Idadi ya kadi (kuanzia 50)', 'Number of cards (from 50)')}><input id="iv-qty" type="number" min="50" inputMode="numeric" value={d.qty} onChange={(e) => set('qty', e.target.value)} className={inp} /></Field>
          <div className="mt-4 flex items-end justify-between"><span className="text-ink/60">{t('Makadirio', 'Estimate')} ({qty} × {tsh(price)})</span><span className="text-2xl font-extrabold tabular-nums text-ink">{tsh(qty * price)}</span></div>
          <a href={waLink(t(`Habari Desc Point! Naomba kuagiza kadi za ${t(type.sw, type.en)}:\n\n👰 ${d.names}\n📅 ${dateText}, saa ${d.time}\n📍 ${d.venue}\n📞 RSVP: ${d.rsvp}\n🎨 ${t(th.sw, th.en)}\n🔢 Kadi ${qty}\n💰 Makadirio: ${tsh(qty * price)}`, `Hello Desc Point! I'd like to order ${type.en} cards:\n\n👰 ${d.names}\n📅 ${dateText}, ${d.time}\n📍 ${d.venue}\n📞 RSVP: ${d.rsvp}\n🎨 ${th.en}\n🔢 ${qty} cards\n💰 Estimate: ${tsh(qty * price)}`))}
            target="_blank" rel="noreferrer" className="btn-gold mt-4 w-full"><MessageCircle className="h-5 w-5" /> {t('Agiza kadi hizi', 'Order these cards')}</a>
          <p className="mt-2 text-xs text-ink/45">{t('Mbunifu wetu ataiboresha zaidi na kukutumia sampuli kabla ya kuchapa.', 'Our designer will refine it and send you a proof before printing.')}</p>
        </div>
      </form>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <motion.div key={d.theme + d.type} initial={{ opacity: 0.6, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
          id="print-area" className="relative mx-auto flex aspect-[1/1.414] w-full max-w-[460px] flex-col items-center justify-center overflow-hidden rounded-[22px] p-8 text-center shadow-[0_30px_60px_-30px_rgba(10,26,92,.55)] sm:p-12"
          style={{ background: th.bg, color: th.fg }}>
          <div className="pointer-events-none absolute inset-4 rounded-[14px] border-2" style={{ borderColor: th.ac }} />
          <div className="pointer-events-none absolute inset-6 rounded-[10px] border" style={{ borderColor: th.ac, opacity: 0.5 }} />
          <Sparkles className="h-7 w-7" style={{ color: th.ac }} />
          <p className="mt-4 max-w-[80%] text-sm opacity-80">{x(type.intro)}</p>
          <h2 className="mt-4 text-[clamp(1.8rem,6vw,2.6rem)] font-extrabold leading-tight" style={{ color: th.ac }}>{d.names || t('Majina yenu', 'Your names')}</h2>
          <div className="my-5 h-px w-24" style={{ background: th.ac }} />
          <p className="font-bold">{dateText}</p>
          <p className="mt-1 opacity-80">{t('Saa', 'At')} {d.time}</p>
          <p className="mt-4 max-w-[80%] font-semibold">{d.venue || t('Ukumbi', 'Venue')}</p>
          {d.rsvp && <p className="mt-6 text-sm opacity-80">RSVP: {d.rsvp}</p>}
          <p className="absolute bottom-7 text-[10px] opacity-50">Desc Point Stationery</p>
        </motion.div>
      </div>
    </section>
  </>
}

/* =====================================================================
   4. NUKUU YA SHULE (quotation)
   ===================================================================== */
export function QuotePage() {
  const { t, notify } = useApp()
  const [q, setQ] = useDraft('dps-quote', { school: '', contact: '', classes: [{ name: 'Darasa la 4', students: 60, subjects: 7, pages: 2 }], color: 'bw', staple: true })
  const [ref] = useState(() => code('NUKUU'))
  const set = (k, v) => setQ((c) => ({ ...c, [k]: v }))
  const setRow = (i, f, v) => setQ((c) => ({ ...c, classes: c.classes.map((r, j) => (j === i ? { ...r, [f]: f === 'name' ? v : Math.max(0, +v || 0) } : r)) }))
  const rate = q.color === 'bw' ? 100 : 400 // photocopy ya mitihani kwa ukurasa
  const rows = q.classes.map((c) => { const pages = c.students * c.subjects * c.pages; return { ...c, total: pages, cost: pages * rate + (q.staple ? c.students * c.subjects * 50 : 0) } })
  const pages = rows.reduce((s, r) => s + r.total, 0)
  const sub = rows.reduce((s, r) => s + r.cost, 0)
  const disc = pages >= 5000 ? 0.15 : pages >= 1000 ? 0.1 : 0
  const total = Math.round((sub * (1 - disc)) / 100) * 100
  const today = new Date().toLocaleDateString(t('sw-TZ', 'en-GB'), { day: 'numeric', month: 'long', year: 'numeric' })
  const valid = new Date(Date.now() + 14 * 864e5).toLocaleDateString(t('sw-TZ', 'en-GB'), { day: 'numeric', month: 'long', year: 'numeric' })
  const msg = t(`Habari Desc Point! Naomba kuthibitisha nukuu *${ref}*\nShule: ${q.school}\nMawasiliano: ${q.contact}\n` + rows.map((r) => `• ${r.name}: wanafunzi ${r.students}, masomo ${r.subjects}, kurasa ${r.pages} = kurasa ${r.total}`).join('\n') + `\nJumla ya kurasa: ${pages}\nJumla: ${tsh(total)}`,
    `Hello Desc Point! Please confirm quote *${ref}*\nSchool: ${q.school}\nContact: ${q.contact}\n` + rows.map((r) => `• ${r.name}: ${r.students} students, ${r.subjects} subjects, ${r.pages} pages = ${r.total} pages`).join('\n') + `\nTotal pages: ${pages}\nTotal: ${tsh(total)}`)

  return <>
    <PageHero crumb={t('Nukuu ya shule', 'School quote')} title={t('Nukuu ya mitihani ya shule, papo hapo', 'Instant exam printing quote for schools')}
      sub={t('Ingiza madarasa, idadi ya wanafunzi na kurasa za mitihani. Unapata nukuu rasmi yenye namba, tayari kuprint au kumpelekea mkuu wa shule.', 'Enter classes, students and exam pages. You get an official numbered quote, ready to print or share with the head teacher.')} />
    <section className="container-x grid grid-cols-1 gap-8 py-12 sm:py-16 [&>*]:min-w-0 xl:grid-cols-[1fr_1.1fr]">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 print:hidden">
        <div className="grid gap-3 rounded-[24px] bg-surface p-5 ring-1 ring-ink/[.07] sm:grid-cols-2">
          <Field id="q-school" label={t('Jina la shule', 'School name')}><input id="q-school" value={q.school} onChange={(e) => set('school', e.target.value)} className={inp} /></Field>
          <Field id="q-contact" label={t('Mwalimu / simu', 'Teacher / phone')}><input id="q-contact" value={q.contact} onChange={(e) => set('contact', e.target.value)} className={inp} /></Field>
        </div>
        <div className="rounded-[24px] bg-surface p-5 ring-1 ring-ink/[.07]">
          <div className="flex items-center justify-between"><h3 className="font-bold text-ink">{t('Madarasa', 'Classes')}</h3>
            <button type="button" onClick={() => set('classes', [...q.classes, { name: `${t('Darasa', 'Class')} ${q.classes.length + 1}`, students: 40, subjects: 7, pages: 2 }])} className="inline-flex items-center gap-1 rounded-full bg-canvas px-3 py-1.5 text-sm font-semibold text-royal-500"><Plus className="h-4 w-4" /> {t('Ongeza darasa', 'Add class')}</button></div>
          <div className="mt-3 space-y-3">
            {q.classes.map((c, i) => (
              <div key={i} className="grid grid-cols-2 gap-2 rounded-2xl bg-canvas p-3 sm:grid-cols-[1.4fr_repeat(3,1fr)_auto] sm:items-end">
                <Field id={`q-n${i}`} label={t('Darasa', 'Class')}><input id={`q-n${i}`} value={c.name} onChange={(e) => setRow(i, 'name', e.target.value)} className={`${inp} bg-surface`} /></Field>
                <Field id={`q-s${i}`} label={t('Wanafunzi', 'Students')}><input id={`q-s${i}`} type="number" inputMode="numeric" value={c.students} onChange={(e) => setRow(i, 'students', e.target.value)} className={`${inp} bg-surface`} /></Field>
                <Field id={`q-m${i}`} label={t('Masomo', 'Subjects')}><input id={`q-m${i}`} type="number" inputMode="numeric" value={c.subjects} onChange={(e) => setRow(i, 'subjects', e.target.value)} className={`${inp} bg-surface`} /></Field>
                <Field id={`q-p${i}`} label={t('Kurasa/mtihani', 'Pages/exam')}><input id={`q-p${i}`} type="number" inputMode="numeric" value={c.pages} onChange={(e) => setRow(i, 'pages', e.target.value)} className={`${inp} bg-surface`} /></Field>
                {q.classes.length > 1 && <button type="button" onClick={() => set('classes', q.classes.filter((_, j) => j !== i))} aria-label={t('Ondoa darasa', 'Remove class')} className="grid h-12 w-12 place-items-center rounded-2xl text-rose-600 hover:bg-rose-500/10"><Trash2 className="h-4 w-4" /></button>}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[['bw', t('Nyeusi (TSh 100/uk)', 'B/W (TSh 100/pg)')], ['color', t('Rangi (TSh 400/uk)', 'Colour (TSh 400/pg)')]].map(([v, l]) => (
            <button type="button" key={v} onClick={() => set('color', v)} aria-pressed={q.color === v} className={`rounded-full px-4 py-2.5 text-sm font-semibold ${q.color === v ? 'bg-navy-900 text-white dark:bg-gold-400 dark:text-navy-950' : 'bg-surface text-ink/70 ring-1 ring-ink/10'}`}>{l}</button>
          ))}
          <button type="button" onClick={() => set('staple', !q.staple)} aria-pressed={q.staple} className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold ${q.staple ? 'bg-gold-400 text-navy-950' : 'bg-surface text-ink/70 ring-1 ring-ink/10'}`}>{q.staple && <Check className="h-4 w-4" />} {t('Kubana (TSh 50/mtihani)', 'Stapling (TSh 50/exam)')}</button>
        </div>
        <p className="text-sm text-ink/55">{t('Punguzo: 10% kwa kurasa 1,000+, 15% kwa kurasa 5,000+.', 'Discount: 10% for 1,000+ pages, 15% for 5,000+ pages.')}</p>
      </form>

      <div className="space-y-4 xl:sticky xl:top-28 xl:self-start">
        <div className="flex flex-wrap gap-2 print:hidden">
          <button onClick={() => window.print()} className="btn-gold"><Printer className="h-4 w-4" /> {t('Print / Hifadhi PDF', 'Print / Save PDF')}</button>
          <a href={waLink(msg)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white"><MessageCircle className="h-4 w-4" /> {t('Thibitisha kwa WhatsApp', 'Confirm on WhatsApp')}</a>
          <button onClick={async () => { try { await navigator.clipboard.writeText(msg.replace(/\*/g, '')); notify(t('Nukuu imenakiliwa', 'Quote copied')) } catch { /* nakili kwa mkono */ } }} className="inline-flex items-center gap-2 rounded-full bg-surface px-5 py-3 font-semibold text-ink ring-1 ring-ink/10"><Copy className="h-4 w-4" /> {t('Nakili', 'Copy')}</button>
        </div>
        <article id="print-area" className="overflow-hidden rounded-[22px] bg-white p-6 text-[#0a1a5c] shadow-[0_30px_60px_-30px_rgba(10,26,92,.5)] ring-1 ring-black/5 sm:p-9 print:rounded-none print:shadow-none print:ring-0">
          <div className="flex items-start justify-between gap-4 border-b-2 border-[#f5b800] pb-4">
            <div><p className="text-xl font-extrabold">Desc Point Stationery</p><p className="text-sm text-[#556]">Madafu & Zegereni, Kibaha · {BUSINESS.phoneLocal} · {BUSINESS.email}</p></div>
            <School className="h-9 w-9 shrink-0 text-[#1440d6]" />
          </div>
          <div className="mt-4 flex flex-wrap justify-between gap-2 text-sm">
            <p><b>{t('NUKUU', 'QUOTATION')}</b> {ref}<br />{t('Tarehe', 'Date')}: {today}<br />{t('Inadumu hadi', 'Valid until')}: {valid}</p>
            <p className="text-right"><b>{q.school || t('Jina la shule', 'School name')}</b><br />{q.contact}</p>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[440px] text-left text-sm">
              <thead><tr className="border-b border-[#dde] text-[#556]"><th className="py-2 font-semibold">{t('Darasa', 'Class')}</th><th className="py-2 text-right font-semibold">{t('Wanafunzi', 'Students')}</th><th className="py-2 text-right font-semibold">{t('Masomo', 'Subjects')}</th><th className="py-2 text-right font-semibold">{t('Kurasa', 'Pages')}</th><th className="py-2 text-right font-semibold">{t('Gharama', 'Cost')}</th></tr></thead>
              <tbody className="tabular-nums">
                {rows.map((r, i) => <tr key={i} className="border-b border-[#eef]"><td className="py-2">{r.name}</td><td className="py-2 text-right">{r.students}</td><td className="py-2 text-right">{r.subjects}</td><td className="py-2 text-right">{r.total.toLocaleString()}</td><td className="py-2 text-right">{tsh(r.cost)}</td></tr>)}
              </tbody>
            </table>
          </div>
          <dl className="ml-auto mt-4 max-w-xs space-y-1 text-sm tabular-nums">
            <div className="flex justify-between"><dt>{t('Jumla ya kurasa', 'Total pages')}</dt><dd>{pages.toLocaleString()}</dd></div>
            <div className="flex justify-between"><dt>{t('Kabla ya punguzo', 'Before discount')}</dt><dd>{tsh(sub)}</dd></div>
            {disc > 0 && <div className="flex justify-between text-emerald-700"><dt>{t('Punguzo', 'Discount')} ({disc * 100}%)</dt><dd>−{tsh(Math.round(sub * disc))}</dd></div>}
            <div className="flex justify-between border-t-2 border-[#0a1a5c] pt-2 text-lg font-extrabold"><dt>{t('Jumla', 'Total')}</dt><dd>{tsh(total)}</dd></div>
          </dl>
          <p className="mt-6 text-xs text-[#667]">{t('Bei ni za mitihani ya A4. Malipo: taslimu, M-Pesa, Mixx by Yas, Airtel Money au benki. Delivery ya Kibaha inapatikana.', 'Prices are for A4 exams. Payment: cash, M-Pesa, Mixx by Yas, Airtel Money or bank. Kibaha delivery available.')}</p>
        </article>
      </div>
    </section>
  </>
}

/* Kadi ya ukurasa wa mwanzo inayoorodhesha zana mpya */
export const TOOLS = [
  { to: '/miadi', icon: CalendarCheck, sw: 'Weka miadi', en: 'Book a visit', d: { sw: 'Chagua saa, usipange foleni', en: 'Pick a time, skip the queue' } },
  { to: '/cv', icon: Printer, sw: 'Tengeneza CV', en: 'Make a CV', d: { sw: 'Bure, tayari kwa PDF', en: 'Free, PDF-ready' } },
  { to: '/mwaliko', icon: Sparkles, sw: 'Kadi ya mwaliko', en: 'Invitation card', d: { sw: 'Ona kadi kabla ya kuagiza', en: 'See it before you order' } },
  { to: '/nukuu', icon: School, sw: 'Nukuu ya shule', en: 'School quote', d: { sw: 'Bei ya mitihani papo hapo', en: 'Instant exam pricing' } },
]
export { Clock }
