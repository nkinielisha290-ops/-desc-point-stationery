import { useState } from 'react'
import { MapPin, Clock, Phone, Mail, MessageCircle, Send, ExternalLink } from 'lucide-react'
import { BUSINESS, waLink } from '../data/site'
import { useApp } from '../lib/store'
import { Reveal, SectionTitle } from './ui'
import { useOpenStatus } from './useOpenStatus'

export default function Contact() {
  const { t, x } = useApp()
  const [b, setB] = useState(0)
  const [form, setForm] = useState({ name: '', service: 0, msg: '' })
  const status = useOpenStatus()
  const SERVICES = t(
    ['Printing', 'Photocopy', 'Graphic Design', 'Kadi za Harusi', 'Banners', 'Vifaa vya Shule', 'NIDA / RITA / Passport', 'HESLB / Ajira Portal', 'BRELA', 'Kozi ya Kompyuta', 'Branding (T-shirts, Mugs)', 'Nyingine'],
    ['Printing', 'Photocopy', 'Graphic Design', 'Wedding Cards', 'Banners', 'School Supplies', 'NIDA / RITA / Passport', 'HESLB / Ajira Portal', 'BRELA', 'Computer Course', 'Branding (T-shirts, Mugs)', 'Other'],
  )
  const branch = BUSINESS.branches[b]
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.map)}`
  const send = (e) => {
    e.preventDefault()
    window.open(waLink(t(
      `Habari ${BUSINESS.name}!\nJina: ${form.name}\nHuduma: ${SERVICES[form.service]}\n\n${form.msg}`,
      `Hello ${BUSINESS.name}!\nName: ${form.name}\nService: ${SERVICES[form.service]}\n\n${form.msg}`,
    )), '_blank', 'noopener')
  }

  return (
    <section id="mawasiliano" className="relative scroll-mt-20 bg-gradient-to-b from-canvas to-surface py-24 sm:py-32">
      <div className="container-x">
        <SectionTitle eyebrow={t('Karibu dukani', 'Visit the shop')} title={t('Tutembelee', 'Find us in')} accent="Kibaha."
          sub={t('Tuko Madafu na Zegereni. Fika, piga simu, au tuma ujumbe — tuko tayari kukuhudumia.', 'We’re in Madafu and Zegereni. Visit, call or message — we’re ready to help.')} />

        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="space-y-4 lg:col-span-2">
            <div className="card p-6">
              <div className="mb-4 flex flex-wrap gap-2">
                {BUSINESS.branches.map((br, i) => (
                  <button key={br.map} onClick={() => setB(i)} aria-pressed={b === i} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${b === i ? 'bg-navy-900 text-white dark:bg-gold-400 dark:text-navy-950' : 'bg-ink/5 text-ink'}`}>{x(br.name)}</button>
                ))}
              </div>
              <Row I={MapPin} title={x(branch.name)} d={<>{branch.area}<br /><a href={mapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-royal-500 hover:underline">{t('Fungua ramani', 'Open in Maps')} <ExternalLink className="h-3 w-3" /></a></>} />
              <Row I={Clock} title={x(BUSINESS.hours.label)} d={<>{x(BUSINESS.hours.time)}<br /><span className={status.open ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>● {status.open ? t('Tuko wazi sasa', 'Open now') : t('Tumefunga kwa sasa', 'Closed now')}</span> · {t('Jumapili tumefunga', 'Closed on Sundays')}</>} />
              <Row I={Phone} title={t('Simu & WhatsApp', 'Phone & WhatsApp')} d={<><span className="select-all font-semibold text-ink">{BUSINESS.phoneLocal}</span>{' · '}<span className="select-all font-semibold text-ink">{BUSINESS.phone2Local}</span><br /><a href={waLink(t('Habari Desc Point!', 'Hello Desc Point!'))} target="_blank" rel="noreferrer" className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400">{t('Chat WhatsApp', 'Chat on WhatsApp')}</a></>} />
              <Row I={Mail} title="Email" d={<span className="select-all break-all">{BUSINESS.email}</span>} />
            </div>
            <div className="overflow-hidden rounded-[30px] shadow-xl ring-1 ring-ink/10">
              <iframe key={b} title={`${t('Ramani', 'Map')} ${x(branch.name)}`} className="h-64 w-full" loading="lazy"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(branch.map)}&z=14&output=embed`} />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-3">
            <form onSubmit={send} className="relative h-full overflow-hidden rounded-[36px] bg-navy-900 p-8 text-white shadow-2xl ring-1 ring-white/5 sm:p-12">
              <p className="text-xs font-bold uppercase tracking-[.18em] sm:text-sm text-gold-300">{t('Tuandikie', 'Write to us')}</p>
              <h3 className="font-display text-3xl font-black sm:text-4xl">{t('Omba bei au weka oda', 'Get a price or place an order')}</h3>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field id="c-name" label={t('Jina lako', 'Your name')}><input id="c-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="inp" placeholder={t('Mf. Amina Hassan', 'e.g. Amina Hassan')} /></Field>
                <Field id="c-service" label={t('Huduma', 'Service')}>
                  <select id="c-service" value={form.service} onChange={(e) => setForm({ ...form, service: +e.target.value })} className="inp">
                    {SERVICES.map((s, i) => <option key={s} value={i} className="text-navy-900">{s}</option>)}
                  </select>
                </Field>
                <Field id="c-msg" label={t('Ujumbe', 'Message')} className="sm:col-span-2"><textarea id="c-msg" required rows={5} value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} className="inp resize-none" placeholder={t('Eleza unachohitaji: idadi, ukubwa, tarehe...', 'Describe what you need: quantity, size, date…')} /></Field>
              </div>
              <button className="btn-gold mt-8 w-full text-base sm:w-auto"><Send className="h-5 w-5" /> {t('Tuma kwa WhatsApp', 'Send on WhatsApp')}</button>
              <p className="mt-4 flex items-center gap-2 text-sm text-white/50"><MessageCircle className="h-4 w-4" /> {t('Kwa kawaida tunajibu ndani ya dakika chache.', 'We usually reply within minutes.')}</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Row({ I, title, d }) {
  return (
    <div className="flex gap-4 border-b border-ink/5 py-4 last:border-0">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-400/20 text-gold-700 dark:text-gold-300"><I className="h-5 w-5" /></span>
      <span className="min-w-0"><b className="block text-ink">{title}</b><span className="text-sm text-ink/65">{d}</span></span>
    </div>
  )
}
function Field({ id, label, children, className = '' }) {
  return <div className={className}><label htmlFor={id} className="mb-2 block text-sm text-white/70">{label}</label>{children}</div>
}
