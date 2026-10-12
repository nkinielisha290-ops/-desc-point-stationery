import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Gem, IdCard, FileImage, RectangleHorizontal, Shirt, ArrowLeft, ArrowRight, Check, ImagePlus, X, Send, ShoppingBag, Sparkles, Clock } from 'lucide-react'
import { BUSINESS, DESIGN_EXTRAS, DESIGN_TYPES, waLink } from '../data/site'
import { newOrderId, useApp } from '../lib/store'
import { SectionTitle, tsh } from './ui'

const ICONS = { Heart, Gem, IdCard, FileImage, RectangleHorizontal, Shirt }
const PALETTES = [
  { id: 'gold', sw: 'Dhahabu & navy', en: 'Gold & navy', c: ['#06144d', '#f5b800', '#ffffff'] },
  { id: 'blush', sw: 'Waridi laini', en: 'Soft blush', c: ['#f6d5d8', '#c9707c', '#fffaf5'] },
  { id: 'green', sw: 'Kijani & krimu', en: 'Green & cream', c: ['#1f4d3a', '#c8b273', '#f6f1e3'] },
  { id: 'bold', sw: 'Rangi kali', en: 'Bold & bright', c: ['#e63946', '#ffb703', '#023047'] },
  { id: 'mono', sw: 'Nyeusi & nyeupe', en: 'Black & white', c: ['#111111', '#7a7a7a', '#ffffff'] },
]

export default function DesignStudio() {
  const { t, x, add, notify, rememberOrder } = useApp()
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [type, setType] = useState(DESIGN_TYPES[0].id)
  const kind = DESIGN_TYPES.find((d) => d.id === type)
  const [qty, setQty] = useState(kind.min)
  const [date, setDate] = useState('')
  const [palette, setPalette] = useState('gold')
  const [text, setText] = useState('')
  const [extras, setExtras] = useState([])
  const [ref, setRef] = useState(null)
  const [name, setName] = useState('')
  const fileRef = useRef(null)

  const chooseType = (id) => {
    const k = DESIGN_TYPES.find((d) => d.id === id)
    setType(id); setQty(k.min)
  }
  const go = (n) => { setDir(n > step ? 1 : -1); setStep(n) }

  const est = useMemo(() => {
    const q = kind.per === 'job' ? 1 : Math.max(kind.min, qty)
    const base = kind.base * q
    const pct = DESIGN_EXTRAS.filter((e) => extras.includes(e.id) && e.pct).reduce((s, e) => s + e.pct, 0)
    const flat = DESIGN_EXTRAS.filter((e) => extras.includes(e.id) && e.flat).reduce((s, e) => s + e.flat, 0)
    const total = Math.round((base * (1 + pct / 100) + flat) / 500) * 500
    return { q, base, pct, flat, total }
  }, [kind, qty, extras])

  const pal = PALETTES.find((p) => p.id === palette)
  const brief = () =>
    `🎨 ${t('Aina', 'Type')}: ${x(kind.label)}\n` +
    (kind.per === 'job' ? '' : `🔢 ${t('Idadi', 'Quantity')}: ${est.q} ${x(kind.unit)}\n`) +
    `🎨 ${t('Rangi', 'Colours')}: ${t(pal.sw, pal.en)}\n` +
    (date ? `📅 ${t('Tarehe ya kuhitaji', 'Needed by')}: ${date}\n` : '') +
    (extras.length ? `➕ ${DESIGN_EXTRAS.filter((e) => extras.includes(e.id)).map((e) => x(e.label)).join(', ')}\n` : '') +
    (text ? `📝 ${t('Maandishi/wazo', 'Text/idea')}: ${text}\n` : '') +
    `💰 ${t('Makadirio', 'Estimate')}: ${t('kuanzia', 'from')} ${tsh(est.total)}`

  const send = async () => {
    const id = newOrderId()
    const msg = t(`Habari ${BUSINESS.name}! Naomba quote ya design.`, `Hello ${BUSINESS.name}! I’d like a design quote.`) +
      `\n\n🧾 ${t('Namba', 'Ref')}: *${id}*\n${name ? `👤 ${name}\n` : ''}` + brief()
    rememberOrder({ id, total: est.total, date: new Date().toISOString(), count: 1 })
    try {
      if (ref && navigator.canShare?.({ files: [ref] })) {
        await navigator.share({ files: [ref], text: msg })
        notify(t('Imetumwa!', 'Sent!'))
        return
      }
    } catch (e) { if (e?.name === 'AbortError') return }
    window.open(waLink(msg + (ref ? `\n\n📎 ${t('Nitatuma picha ya mfano hapa.', 'I’ll attach a reference image here.')}` : '')), '_blank', 'noopener')
  }

  const toCart = () => {
    add({ id: `design-${type}-${Date.now()}`, kind: 'design', price: est.total, name: kind.label, unit: { sw: 'kazi', en: 'job' },
      meta: { sw: brief().replace(/\n/g, ' · '), en: brief().replace(/\n/g, ' · ') } })
    notify(t('Design imeongezwa kwenye cart', 'Design added to cart'))
  }

  const steps = [t('Chagua aina', 'Choose type'), t('Maelezo', 'Details'), t('Thibitisha', 'Confirm')]
  const preview = useMemo(() => (ref ? URL.createObjectURL(ref) : null), [ref])

  return (
    <section id="design" className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 -z-10 h-2/3 bg-gradient-to-b from-gold-400/10 to-transparent" />
      <div className="container-x">
        <SectionTitle eyebrow="Design studio" title={t('Eleza wazo lako,', 'Describe your idea,')} accent={t('tunalichora.', 'we draw it.')}
          sub={t('Hatua 3 tu: chagua unachohitaji, tueleze ladha yako, upate makadirio ya bei papo hapo. Mbunifu wetu atakupigia kuthibitisha.', 'Just 3 steps: choose what you need, tell us your taste, and get an instant estimate. Our designer will call to confirm.')} />

        <div className="mx-auto max-w-5xl overflow-hidden rounded-[36px] bg-surface shadow-[0_40px_80px_-40px_rgba(6,20,77,.45)] ring-1 ring-ink/5">
          {/* Hatua */}
          <ol className="flex border-b border-ink/5">
            {steps.map((s, i) => (
              <li key={s} className="flex-1">
                <button onClick={() => go(i)} aria-current={step === i ? 'step' : undefined}
                  className={`relative flex w-full items-center justify-center gap-2 px-2 py-4 text-sm font-semibold transition ${step >= i ? 'text-ink' : 'text-ink/40'}`}>
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-black transition ${step > i ? 'bg-emerald-500 text-white' : step === i ? 'bg-gold-400 text-navy-950' : 'bg-ink/10'}`}>
                    {step > i ? <Check className="h-4 w-4" /> : i + 1}
                  </span>
                  <span className="hidden sm:inline">{s}</span>
                  {step === i && <motion.span layoutId="step-bar" className="absolute inset-x-0 bottom-0 h-0.5 bg-gold-400" />}
                </button>
              </li>
            ))}
          </ol>

          <div className="relative min-h-[420px] p-5 sm:p-10">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={step} custom={dir}
                initial={{ opacity: 0, x: dir * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -40 }} transition={{ duration: 0.3 }}>

                {step === 0 && (
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
                    {DESIGN_TYPES.map((d, i) => {
                      const I = ICONS[d.icon]
                      const on = type === d.id
                      return (
                        <motion.button key={d.id} onClick={() => chooseType(d.id)} aria-pressed={on}
                          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}
                          className={`relative flex flex-col items-start rounded-2xl p-4 text-left ring-2 transition sm:p-5 ${on ? 'bg-navy-900 text-white ring-gold-400 dark:bg-navy-800' : 'bg-ink/[.03] ring-transparent hover:ring-ink/10'}`}>
                          <span className={`grid h-11 w-11 place-items-center rounded-xl ${on ? 'bg-gold-400 text-navy-950' : 'bg-royal-500/10 text-royal-500'}`}><I className="h-5 w-5" /></span>
                          <b className="mt-3 text-sm leading-snug sm:text-base">{x(d.label)}</b>
                          <span className={`mt-1 text-xs ${on ? 'text-gold-300' : 'text-ink/50'}`}>{t('kuanzia', 'from')} {tsh(d.base)}{d.per === 'unit' ? `/${x(d.unit)}` : ''}</span>
                          <span className={`mt-1 flex items-center gap-1 text-[11px] ${on ? 'text-white/60' : 'text-ink/40'}`}><Clock className="h-3 w-3" /> {x(d.days)}</span>
                          {on && <motion.span layoutId="type-check" className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-gold-400 text-navy-950"><Check className="h-4 w-4" /></motion.span>}
                        </motion.button>
                      )
                    })}
                  </div>
                )}

                {step === 1 && (
                  <div className="grid gap-6 md:grid-cols-2">
                    {kind.per === 'unit' && (
                      <div>
                        <label htmlFor="ds-qty" className="mb-2 block text-sm font-semibold text-ink/70">{t('Idadi', 'Quantity')} ({x(kind.unit)}) · {t('kiwango cha chini', 'minimum')} {kind.min}</label>
                        <input id="ds-qty" type="number" min={kind.min} inputMode="numeric" value={qty} onChange={(e) => setQty(+e.target.value || kind.min)} onBlur={() => setQty((q) => Math.max(kind.min, q))}
                          className="w-full rounded-2xl bg-ink/5 px-4 py-3 font-display text-xl font-black tabular-nums outline-none ring-gold-400 focus:ring-2" />
                      </div>
                    )}
                    <div>
                      <label htmlFor="ds-date" className="mb-2 block text-sm font-semibold text-ink/70">{t('Unaihitaji lini?', 'When do you need it?')}</label>
                      <input id="ds-date" type="date" value={date} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-2xl bg-ink/5 px-4 py-3 outline-none ring-gold-400 focus:ring-2" />
                    </div>
                    <div className="md:col-span-2">
                      <p className="mb-2 text-sm font-semibold text-ink/70">{t('Ladha ya rangi', 'Colour mood')}</p>
                      <div className="flex flex-wrap gap-2">
                        {PALETTES.map((p) => (
                          <button key={p.id} onClick={() => setPalette(p.id)} aria-pressed={palette === p.id}
                            className={`flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-semibold ring-2 transition ${palette === p.id ? 'ring-gold-400' : 'ring-ink/10 hover:ring-ink/20'}`}>
                            <span className="flex -space-x-1.5">{p.c.map((c) => <span key={c} className="h-6 w-6 rounded-full ring-2 ring-surface" style={{ background: c }} />)}</span>
                            {t(p.sw, p.en)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="ds-text" className="mb-2 block text-sm font-semibold text-ink/70">{t('Maandishi au wazo lako', 'Your text or idea')}</label>
                      <textarea id="ds-text" rows={3} value={text} onChange={(e) => setText(e.target.value)}
                        placeholder={t('Mf. "Harusi ya Neema & Daudi, 12 Desemba, Kanisa la KKKT Kibaha" au jina la biashara yako', 'e.g. "Neema & Daudi’s wedding, 12 December, KKKT Kibaha" or your business name')}
                        className="w-full resize-none rounded-2xl bg-ink/5 px-4 py-3 outline-none ring-gold-400 placeholder:text-ink/35 focus:ring-2" />
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-semibold text-ink/70">{t('Picha ya mfano (si lazima)', 'Reference image (optional)')}</p>
                      {ref ? (
                        <div className="relative inline-block">
                          <img src={preview} alt={t('Picha ya mfano', 'Reference')} className="h-28 w-28 rounded-2xl object-cover ring-2 ring-gold-400" />
                          <button onClick={() => setRef(null)} aria-label={t('Ondoa', 'Remove')} className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-rose-500 text-white"><X className="h-4 w-4" /></button>
                        </div>
                      ) : (
                        <button onClick={() => fileRef.current?.click()} className="flex h-28 w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-ink/15 text-sm font-semibold text-ink/50 transition hover:border-gold-400 hover:text-ink">
                          <ImagePlus className="h-5 w-5" /> {t('Ongeza picha', 'Add image')}
                        </button>
                      )}
                      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => setRef(e.target.files?.[0] || null)} />
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-semibold text-ink/70">{t('Ziada', 'Extras')}</p>
                      <div className="space-y-2">
                        {DESIGN_EXTRAS.map((e) => {
                          const on = extras.includes(e.id)
                          return (
                            <button key={e.id} onClick={() => setExtras((v) => (on ? v.filter((i) => i !== e.id) : [...v, e.id]))} aria-pressed={on}
                              className={`flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-sm ring-1 transition ${on ? 'bg-gold-400/15 ring-gold-400' : 'ring-ink/10 hover:ring-ink/20'}`}>
                              <span className="flex items-center gap-3">
                                <span className={`grid h-5 w-5 place-items-center rounded-md ${on ? 'bg-gold-400 text-navy-950' : 'ring-1 ring-ink/25'}`}>{on && <Check className="h-3.5 w-3.5" />}</span>
                                {x(e.label)}
                              </span>
                              <span className="text-xs font-semibold text-ink/50">{e.pct ? `+${e.pct}%` : `+${tsh(e.flat)}`}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
                    {/* Kadi ya mfano inayoonyesha ladha */}
                    <motion.div initial={{ rotate: -4, scale: 0.9 }} animate={{ rotate: -2, scale: 1 }} transition={{ type: 'spring' }}
                      className="relative mx-auto flex aspect-[4/5] w-full max-w-xs flex-col items-center justify-center overflow-hidden rounded-[30px] p-8 text-center shadow-2xl"
                      style={{ background: pal.c[2], color: pal.c[0] }}>
                      <div className="absolute inset-3 rounded-2xl border-2" style={{ borderColor: pal.c[1] }} />
                      <Sparkles className="h-8 w-8" style={{ color: pal.c[1] }} />
                      <p className="mt-3 text-xs font-bold uppercase tracking-[.18em] sm:text-sm" style={{ color: pal.c[1] }}>{x(kind.label)}</p>
                      <p className="mt-2 line-clamp-4 font-display text-2xl font-black leading-tight">{text || t('Maandishi yako yatakaa hapa', 'Your text goes here')}</p>
                      {date && <p className="mt-3 text-sm font-semibold opacity-70">{new Date(date).toLocaleDateString(t('sw-TZ', 'en-GB'), { day: 'numeric', month: 'long', year: 'numeric' })}</p>}
                      <span className="absolute bottom-4 text-[10px] font-semibold uppercase tracking-[.3em] opacity-50">{t('Mfano tu', 'Mock-up only')}</span>
                    </motion.div>

                    <div>
                      <h3 className="font-display text-2xl font-black">{t('Muhtasari wa oda', 'Order summary')}</h3>
                      <dl className="mt-4 divide-y divide-ink/5 text-sm">
                        <Row k={t('Aina', 'Type')} v={x(kind.label)} />
                        {kind.per === 'unit' && <Row k={t('Idadi', 'Quantity')} v={`${est.q} ${x(kind.unit)}`} />}
                        <Row k={t('Rangi', 'Colours')} v={t(pal.sw, pal.en)} />
                        <Row k={t('Muda wa kazi', 'Turnaround')} v={x(kind.days)} />
                        {date && <Row k={t('Unaihitaji', 'Needed by')} v={date} />}
                        <Row k={t('Gharama ya msingi', 'Base cost')} v={tsh(est.base)} />
                        {est.pct > 0 && <Row k={t('Ziada', 'Extras')} v={`+${est.pct}%`} />}
                        {est.flat > 0 && <Row k="Delivery" v={tsh(est.flat)} />}
                      </dl>
                      <div className="mt-4 flex items-end justify-between rounded-2xl bg-navy-900 p-5 text-white dark:ring-1 dark:ring-gold-400/30">
                        <span className="text-sm text-white/70">{t('Makadirio, kuanzia', 'Estimate, from')}</span>
                        <motion.span key={est.total} initial={{ scale: 1.15 }} animate={{ scale: 1 }} className="gold-text font-display text-3xl font-black tabular-nums">{tsh(est.total)}</motion.span>
                      </div>
                      <p className="mt-2 text-xs text-ink/50">{t('Bei ya mwisho inathibitishwa baada ya kuongea na mbunifu.', 'Final price is confirmed after talking with the designer.')}</p>
                      <label htmlFor="ds-name" className="sr-only">{t('Jina lako', 'Your name')}</label>
                      <input id="ds-name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('Jina lako', 'Your name')}
                        className="mt-4 w-full rounded-2xl bg-ink/5 px-4 py-3 outline-none ring-gold-400 placeholder:text-ink/35 focus:ring-2" />
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <button onClick={send} className="btn-gold"><Send className="h-4 w-4" /> {t('Tuma ombi', 'Send request')}</button>
                        <button onClick={toCart} className="flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold ring-1 ring-ink/15 transition hover:ring-gold-400"><ShoppingBag className="h-4 w-4" /> {t('Weka kwenye cart', 'Add to cart')}</button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-ink/5 bg-ink/[.02] px-5 py-4 sm:px-10">
            <button onClick={() => go(Math.max(0, step - 1))} disabled={step === 0} className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-ink/70 transition hover:text-ink disabled:invisible">
              <ArrowLeft className="h-4 w-4" /> {t('Nyuma', 'Back')}
            </button>
            <span className="text-sm text-ink/60">{t('Makadirio', 'Estimate')}: <b className="tabular-nums text-ink">{tsh(est.total)}</b></span>
            {step < 2 ? (
              <button onClick={() => go(step + 1)} className="flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gold-400 hover:text-navy-950 dark:bg-gold-400 dark:text-navy-950">
                {t('Endelea', 'Next')} <ArrowRight className="h-4 w-4" />
              </button>
            ) : <span className="w-[92px]" />}
          </div>
        </div>
      </div>
    </section>
  )
}

function Row({ k, v }) {
  return <div className="flex justify-between gap-4 py-2.5"><dt className="text-ink/55">{k}</dt><dd className="text-right font-semibold">{v}</dd></div>
}
