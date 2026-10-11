import { useState } from 'react'
import { MapPin, Clock, Phone, Mail, MessageCircle, Send } from 'lucide-react'
import { BUSINESS, waLink } from '../data/site'
import { Reveal, SectionTitle } from './ui'
import { useOpenStatus } from './useOpenStatus'

export default function Contact() {
  const [b, setB] = useState(0)
  const [form, setForm] = useState({ name: '', service: 'Printing', msg: '' })
  const status = useOpenStatus()
  const send = (e) => {
    e.preventDefault()
    window.open(waLink(`Habari ${BUSINESS.name}!\nJina: ${form.name}\nHuduma: ${form.service}\n\n${form.msg}`), '_blank')
  }

  return (
    <section id="mawasiliano" className="relative scroll-mt-20 bg-gradient-to-b from-paper to-white py-24 sm:py-32">
      <div className="container-x">
        <SectionTitle eyebrow="Karibu dukani" title="Tutembelee" accent="Kibaha." sub="Tuko Madafu na Zegereni. Fika, piga simu, au tuma ujumbe — tuko tayari kukuhudumia." />

        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="space-y-4 lg:col-span-2">
            <div className="card p-6">
              <div className="mb-4 flex gap-2">
                {BUSINESS.branches.map((br, i) => (
                  <button key={br.name} onClick={() => setB(i)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${b === i ? 'bg-navy-900 text-white' : 'bg-navy-900/5 text-navy-900'}`}>{br.name}</button>
                ))}
              </div>
              <Row I={MapPin} t={BUSINESS.branches[b].name} d={BUSINESS.branches[b].area} />
              <Row I={Clock} t={BUSINESS.hours.label} d={<>{BUSINESS.hours.time}<br /><span className={status.open ? 'text-emerald-600' : 'text-rose-600'}>● {status.label}</span> · Jumapili tumefunga</>} />
              <Row I={Phone} t="Simu & WhatsApp" d={<><a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} className="font-semibold text-navy-900 hover:text-royal-600">{BUSINESS.phoneLocal}</a>{' · '}<a href={waLink('Habari Desc Point!')} target="_blank" rel="noreferrer" className="font-semibold text-emerald-600 hover:underline">Chat WhatsApp</a></>} />
              <Row I={Mail} t="Email" d={<a href={`mailto:${BUSINESS.email}`} className="break-all hover:text-royal-600">{BUSINESS.email}</a>} />
            </div>
            <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-navy-900/10">
              <iframe key={b} title={`Ramani ${BUSINESS.branches[b].name}`} className="h-64 w-full" loading="lazy"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS.branches[b].map)}&z=14&output=embed`} />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-3">
            <form onSubmit={send} className="relative h-full overflow-hidden rounded-[2rem] bg-navy-900 p-8 text-white shadow-2xl sm:p-12">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-400/15 blur-2xl" />
              <p className="font-script text-3xl text-gold-300">Tuandikie</p>
              <h3 className="font-display text-3xl font-black sm:text-4xl">Omba bei au weka oda</h3>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field label="Jina lako"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="inp" placeholder="Mf. Amina Hassan" /></Field>
                <Field label="Huduma">
                  <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="inp">
                    {['Printing', 'Photocopy', 'Graphic Design', 'Kadi za Harusi', 'Banners', 'Vifaa vya Shule', 'Huduma za Mtandaoni', 'Branding (T-shirts, Mugs)', 'Nyingine'].map((s) => <option key={s} className="text-navy-900">{s}</option>)}
                  </select>
                </Field>
                <Field label="Ujumbe" className="sm:col-span-2"><textarea required rows={5} value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} className="inp resize-none" placeholder="Eleza unachohitaji: idadi, ukubwa, tarehe..." /></Field>
              </div>
              <button className="btn-gold mt-8 w-full text-base sm:w-auto"><Send className="h-5 w-5" /> Tuma kwa WhatsApp</button>
              <p className="mt-4 flex items-center gap-2 text-sm text-white/50"><MessageCircle className="h-4 w-4" /> Kwa kawaida tunajibu ndani ya dakika chache.</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Row({ I, t, d }) {
  return (
    <div className="flex gap-4 border-b border-navy-900/5 py-4 last:border-0">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-400/20 text-gold-700"><I className="h-5 w-5" /></span>
      <span><b className="block text-navy-900">{t}</b><span className="text-sm text-navy-900/65">{d}</span></span>
    </div>
  )
}
function Field({ label, children, className = '' }) {
  return <label className={`block ${className}`}><span className="mb-2 block text-sm text-white/70">{label}</span>{children}</label>
}
