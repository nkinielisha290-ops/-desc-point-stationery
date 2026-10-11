import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { UploadCloud, FileText, Image as ImageIcon, File as FileIcon, X, Minus, Plus, ShoppingBag, Send, ShieldCheck, Info, Loader2 } from 'lucide-react'
import { BULK_DISCOUNT, BUSINESS, PRINT_FINISH, PRINT_RATES, waLink } from '../data/site'
import { newOrderId, useApp } from '../lib/store'
import { SectionTitle, tsh } from './ui'
import { asset } from '../lib/asset'

const MAX_MB = 50

// Kuhesabu kurasa za PDF bila library: tunasoma /Count au /Type /Page ndani ya faili
async function countPdfPages(file) {
  try {
    const buf = await file.arrayBuffer()
    const text = new TextDecoder('latin1').decode(new Uint8Array(buf))
    const counts = [...text.matchAll(/\/Type\s*\/Pages[^>]*?\/Count\s+(\d+)/g)].map((m) => +m[1])
    const counts2 = [...text.matchAll(/\/Count\s+(\d+)[^>]*?\/Type\s*\/Pages/g)].map((m) => +m[1])
    const best = Math.max(0, ...counts, ...counts2)
    if (best > 0) return best
    const pages = (text.match(/\/Type\s*\/Page(?![s\w])/g) || []).length
    return pages || null
  } catch {
    return null
  }
}

const kindOf = (f) => (f.type === 'application/pdf' || /\.pdf$/i.test(f.name) ? 'pdf' : f.type.startsWith('image/') ? 'image' : 'doc')
const fmtSize = (b) => (b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`)

function Segmented({ value, onChange, options, name }) {
  return (
    <div role="radiogroup" aria-label={name} className="grid gap-1 rounded-2xl bg-ink/5 p-1" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map((o) => (
        <button key={o.v} type="button" role="radio" aria-checked={value === o.v} onClick={() => onChange(o.v)}
          className={`relative rounded-xl px-2 py-2.5 text-sm font-semibold transition ${value === o.v ? 'text-navy-950' : 'text-ink/60 hover:text-ink'}`}>
          {value === o.v && <motion.span layoutId={`seg-${name}`} className="absolute inset-0 rounded-xl bg-gold-400 shadow" transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }} />}
          <span className="relative">{o.l}</span>
        </button>
      ))}
    </div>
  )
}

export default function PrintUpload() {
  const { t, x, add, notify, rememberOrder } = useApp()
  const input = useRef(null)
  const [files, setFiles] = useState([]) // { id, file, kind, pages, counting }
  const [drag, setDrag] = useState(false)
  const [size, setSize] = useState('A4')
  const [color, setColor] = useState('bw')
  const [sides, setSides] = useState('single')
  const [copies, setCopies] = useState(1)
  const [finish, setFinish] = useState('none')
  const [note, setNote] = useState('')
  const [sentInfo, setSentInfo] = useState(null)

  const addFiles = async (list) => {
    const incoming = [...list].filter((f) => {
      if (f.size > MAX_MB * 1048576) { notify(t(`${f.name}: faili kubwa kuliko ${MAX_MB}MB`, `${f.name}: larger than ${MAX_MB}MB`)); return false }
      return true
    })
    const rows = incoming.map((f) => ({ id: `${f.name}-${f.size}-${Math.random()}`, file: f, kind: kindOf(f), pages: kindOf(f) === 'image' ? 1 : null, counting: kindOf(f) === 'pdf' }))
    setFiles((cur) => [...cur, ...rows])
    for (const r of rows.filter((r) => r.kind === 'pdf')) {
      const n = await countPdfPages(r.file)
      setFiles((cur) => cur.map((c) => (c.id === r.id ? { ...c, pages: n, counting: false } : c)))
    }
  }

  const setPages = (id, v) => setFiles((cur) => cur.map((c) => (c.id === id ? { ...c, pages: Math.max(1, Math.min(2000, +v || 1)) } : c)))
  const remove = (id) => setFiles((cur) => cur.filter((c) => c.id !== id))

  const fin = PRINT_FINISH.find((f) => f.id === finish)
  const calc = useMemo(() => {
    const pages = files.reduce((s, f) => s + (f.pages || 1), 0)
    const rate = PRINT_RATES[size][color]
    const printed = pages * copies
    let printCost = printed * rate * (sides === 'double' ? 0.9 : 1)
    const bulk = printed >= BULK_DISCOUNT.pages ? Math.round(printCost * BULK_DISCOUNT.percent / 100) : 0
    printCost -= bulk
    const finishCost = fin.perPage ? fin.price * printed : fin.price * copies * Math.max(1, files.length)
    const total = Math.round((printCost + finishCost) / 50) * 50
    return { pages, printed, rate, bulk, printCost: Math.round(printCost), finishCost, total }
  }, [files, size, color, sides, copies, fin])

  const unknown = files.some((f) => !f.pages && !f.counting)
  const summary = () => {
    const opts = `${size} · ${color === 'bw' ? t('Nyeusi & nyeupe', 'Black & white') : t('Rangi', 'Colour')} · ${sides === 'double' ? t('Pande mbili', 'Double-sided') : t('Upande mmoja', 'Single-sided')} · ${t('Nakala', 'Copies')} ${copies}${finish !== 'none' ? ` · ${x(fin.label)}` : ''}`
    const list = files.map((f) => `   📄 ${f.file.name} (${f.pages || '?'} ${t('kurasa', 'pages')})`).join('\n')
    return { opts, list }
  }

  const addToCart = () => {
    const { opts } = summary()
    add({
      id: `print-${Date.now()}`, kind: 'print', price: calc.total,
      name: { sw: `Printing: ${files.length} faili, kurasa ${calc.pages}`, en: `Printing: ${files.length} file(s), ${calc.pages} pages` },
      unit: { sw: 'kazi', en: 'job' },
      meta: { sw: `${files.map((f) => f.file.name).join(', ')} — ${opts}`, en: `${files.map((f) => f.file.name).join(', ')} — ${opts}` },
    })
    notify(t('Kazi ya printing imeongezwa kwenye cart', 'Print job added to cart'))
  }

  const sendNow = async () => {
    const id = newOrderId()
    const { opts, list } = summary()
    const text =
      t(`Habari ${BUSINESS.name}! Naomba printing:`, `Hello ${BUSINESS.name}! Please print:`) +
      `\n\n🧾 ${t('Namba ya oda', 'Order no.')}: *${id}*\n${list}\n⚙️ ${opts}\n💰 ${t('Makadirio', 'Estimate')}: *${tsh(calc.total)}*` +
      (note ? `\n📝 ${note}` : '')
    rememberOrder({ id, total: calc.total, date: new Date().toISOString(), count: files.length })
    const shareFiles = files.map((f) => f.file)
    // Simu nyingi: tunashare faili moja kwa moja kwenda WhatsApp
    try {
      if (navigator.canShare?.({ files: shareFiles })) {
        await navigator.share({ files: shareFiles, text, title: `Desc Point – ${id}` })
        setSentInfo({ id, shared: true, link: waLink(text) })
        return
      }
    } catch (e) {
      if (e?.name === 'AbortError') return
    }
    window.open(waLink(text + `\n\n📎 ${t('Faili nitazituma hapa sasa hivi.', 'I’m attaching the files now.')}`), '_blank', 'noopener')
    setSentInfo({ id, shared: false, link: waLink(text) })
  }

  const icon = (k) => (k === 'pdf' ? FileText : k === 'image' ? ImageIcon : FileIcon)

  return (
    <section id="printing" className="paper-grain relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <SectionTitle eyebrow={t('Printing mtandaoni', 'Online printing')} title={t('Pakia faili,', 'Upload your file,')} accent={t('chukua ikiwa tayari.', 'collect it ready.')}
          sub={t('Chagua faili zako, weka chaguo za printing, ona bei papo hapo, kisha tuma kwa WhatsApp. Hakuna foleni, hakuna kusubiri dukani.', 'Pick your files, set your print options, see the price instantly, then send on WhatsApp. No queues, no waiting in the shop.')} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr] [&>*]:min-w-0">
          {/* Upande wa kushoto: faili + chaguo */}
          <div className="card p-5 sm:p-8">
            <motion.div
              onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files) }}
              onClick={() => input.current?.click()}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && input.current?.click()}
              role="button" tabIndex={0} aria-label={t('Chagua faili za kuprint', 'Choose files to print')}
              animate={{ scale: drag ? 1.02 : 1 }}
              className={`group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed px-6 py-10 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400 ${drag ? 'border-gold-400 bg-gold-400/10' : 'border-ink/15 hover:border-gold-400 hover:bg-gold-400/5'}`}>
              <motion.span animate={{ y: drag ? -6 : [0, -6, 0] }} transition={drag ? {} : { duration: 2.4, repeat: Infinity }}
                className="grid h-16 w-16 place-items-center rounded-2xl bg-navy-900 text-gold-300 shadow-lg dark:bg-gold-400 dark:text-navy-950">
                <UploadCloud className="h-8 w-8" />
              </motion.span>
              <p className="mt-4 font-display text-xl font-black">{drag ? t('Achia hapa!', 'Drop it here!') : t('Bonyeza kuchagua faili', 'Tap to choose files')}</p>
              <p className="mt-1 text-sm text-ink/55">{t('au buruta hapa · PDF, Word, picha · hadi', 'or drag here · PDF, Word, images · up to')} {MAX_MB}MB</p>
              <input ref={input} id="print-files" type="file" multiple hidden accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,image/*" onChange={(e) => { addFiles(e.target.files); e.target.value = '' }} />
            </motion.div>

            <AnimatePresence initial={false}>
              {files.length > 0 && (
                <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-5 space-y-2">
                  <AnimatePresence initial={false}>
                    {files.map((f) => {
                      const I = icon(f.kind)
                      return (
                        <motion.li key={f.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                          className="flex items-center gap-3 rounded-2xl bg-ink/[.04] p-3 ring-1 ring-ink/5">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-royal-500/10 text-royal-500"><I className="h-5 w-5" /></span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">{f.file.name}</p>
                            <p className="text-xs text-ink/50">{fmtSize(f.file.size)}</p>
                          </div>
                          <label className="flex items-center gap-1.5 text-xs text-ink/60">
                            {f.counting ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                              <input type="number" min="1" inputMode="numeric" aria-label={`${t('Kurasa za', 'Pages in')} ${f.file.name}`} value={f.pages || ''} placeholder="?"
                                onChange={(e) => setPages(f.id, e.target.value)}
                                className={`w-16 rounded-lg bg-surface px-2 py-1.5 text-center text-sm font-bold text-ink outline-none ring-1 focus:ring-2 focus:ring-gold-400 ${!f.pages ? 'ring-rose-400' : 'ring-ink/10'}`} />
                            )}
                            {t('kurasa', 'pages')}
                          </label>
                          <button onClick={() => remove(f.id)} aria-label={t('Ondoa', 'Remove')} className="grid h-8 w-8 place-items-center rounded-full text-ink/40 hover:bg-rose-500/10 hover:text-rose-500"><X className="h-4 w-4" /></button>
                        </motion.li>
                      )
                    })}
                  </AnimatePresence>
                  {unknown && (
                    <li className="flex items-start gap-2 rounded-xl bg-amber-400/15 p-3 text-xs text-amber-800 dark:text-amber-200">
                      <Info className="mt-0.5 h-4 w-4 shrink-0" /> {t('Hatukuweza kuhesabu kurasa za faili hili. Andika idadi ya kurasa ili bei iwe sahihi.', 'We couldn’t count the pages in this file. Enter the page count for an accurate price.')}
                    </li>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 [&>*]:min-w-0">
              <div>
                <p className="mb-2 text-sm font-semibold text-ink/70">{t('Ukubwa wa karatasi', 'Paper size')}</p>
                <Segmented name="size" value={size} onChange={setSize} options={[{ v: 'A5', l: 'A5' }, { v: 'A4', l: 'A4' }, { v: 'A3', l: 'A3' }]} />
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-ink/70">{t('Rangi', 'Colour')}</p>
                <Segmented name="color" value={color} onChange={setColor} options={[{ v: 'bw', l: t('Nyeusi', 'B/W') }, { v: 'color', l: t('Rangi', 'Colour') }]} />
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-ink/70">{t('Pande', 'Sides')}</p>
                <Segmented name="sides" value={sides} onChange={setSides} options={[{ v: 'single', l: t('Upande 1', '1-sided') }, { v: 'double', l: t('Pande 2 (−10%)', '2-sided (−10%)') }]} />
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-ink/70">{t('Idadi ya nakala', 'Number of copies')}</p>
                <div className="flex items-center gap-2 rounded-2xl bg-ink/5 p-1">
                  <button type="button" onClick={() => setCopies((c) => Math.max(1, c - 1))} aria-label={t('Punguza', 'Decrease')} className="grid h-10 w-12 place-items-center rounded-xl bg-surface shadow-sm"><Minus className="h-4 w-4" /></button>
                  <input id="print-copies" type="number" min="1" inputMode="numeric" value={copies} onChange={(e) => setCopies(Math.max(1, Math.min(5000, +e.target.value || 1)))}
                    aria-label={t('Idadi ya nakala', 'Number of copies')} className="min-w-0 flex-1 bg-transparent text-center font-display text-xl font-black tabular-nums outline-none" />
                  <button type="button" onClick={() => setCopies((c) => c + 1)} aria-label={t('Ongeza', 'Increase')} className="grid h-10 w-12 place-items-center rounded-xl bg-surface shadow-sm"><Plus className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="sm:col-span-2">
                <p className="mb-2 text-sm font-semibold text-ink/70">{t('Finishing', 'Finishing')}</p>
                <div className="flex flex-wrap gap-2">
                  {PRINT_FINISH.map((f) => (
                    <button key={f.id} type="button" onClick={() => setFinish(f.id)} aria-pressed={finish === f.id}
                      className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 transition ${finish === f.id ? 'bg-navy-900 text-white ring-navy-900 dark:bg-gold-400 dark:text-navy-950 dark:ring-gold-400' : 'bg-surface text-ink/70 ring-ink/10 hover:ring-gold-400'}`}>
                      {x(f.label)}{f.price > 0 && <span className="ml-1 opacity-60">+{f.price.toLocaleString()}</span>}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="print-note" className="mb-2 block text-sm font-semibold text-ink/70">{t('Maelekezo ya ziada (si lazima)', 'Extra instructions (optional)')}</label>
                <input id="print-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder={t('Mf. kurasa 3–10 tu, nitachukua kesho saa 4', 'e.g. only pages 3–10, collecting tomorrow at 10')}
                  className="w-full rounded-2xl bg-ink/5 px-4 py-3 text-sm outline-none ring-gold-400 placeholder:text-ink/35 focus:ring-2" />
              </div>
            </div>
          </div>

          {/* Upande wa kulia: risiti ya bei */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative rounded-t-3xl bg-white px-6 pb-8 pt-7 font-mono text-[13px] text-navy-900 shadow-2xl [mask-image:linear-gradient(black,black)] sm:px-8">
              <div className="text-center">
                <img src={asset('logo.png')} alt="" className="mx-auto h-12 w-12 rounded-full" />
                <p className="mt-2 font-display text-lg font-black not-italic">Desc Point Stationery</p>
                <p className="text-[11px] uppercase tracking-[.25em] text-navy-900/50">{t('Makadirio ya printing', 'Print estimate')}</p>
              </div>
              <div className="my-4 border-t-2 border-dashed border-navy-900/15" />
              <Line l={t('Faili', 'Files')} r={files.length} />
              <Line l={t('Kurasa kwa nakala', 'Pages per copy')} r={calc.pages} />
              <Line l={t('Nakala', 'Copies')} r={`× ${copies}`} />
              <Line l={`${size} ${color === 'bw' ? t('nyeusi', 'B/W') : t('rangi', 'colour')}`} r={`${tsh(calc.rate)}/${t('uk', 'pg')}`} />
              {sides === 'double' && <Line l={t('Pande mbili', 'Double-sided')} r="−10%" />}
              <Line l={t('Printing', 'Printing')} r={tsh(calc.printCost + calc.bulk)} />
              {calc.bulk > 0 && <Line l={t(`Punguzo la bulk (${BULK_DISCOUNT.percent}%)`, `Bulk discount (${BULK_DISCOUNT.percent}%)`)} r={`−${tsh(calc.bulk)}`} accent />}
              {calc.finishCost > 0 && <Line l={x(fin.label)} r={tsh(calc.finishCost)} />}
              <div className="my-4 border-t-2 border-dashed border-navy-900/15" />
              <div className="flex items-end justify-between">
                <span className="font-bold uppercase tracking-wider">{t('Jumla', 'Total')}</span>
                <motion.span key={calc.total} initial={{ scale: 1.2, color: '#d99a00' }} animate={{ scale: 1, color: '#06144d' }} className="font-display text-3xl font-black not-italic tabular-nums">
                  {tsh(calc.total)}
                </motion.span>
              </div>
              {calc.printed < BULK_DISCOUNT.pages && calc.printed > 0 && (
                <p className="mt-3 text-[11px] text-navy-900/55">{t(`Ongeza kurasa ${BULK_DISCOUNT.pages - calc.printed} upate punguzo la ${BULK_DISCOUNT.percent}%`, `Add ${BULK_DISCOUNT.pages - calc.printed} more pages for ${BULK_DISCOUNT.percent}% off`)}</p>
              )}
            </div>
            {/* meno ya risiti */}
            <div aria-hidden className="h-4 w-full bg-[radial-gradient(circle_at_10px_0,transparent_9px,#fff_10px)] bg-[length:20px_16px] drop-shadow-xl" />

            <div className="mt-6 grid gap-3">
              <button disabled={!files.length} onClick={sendNow} className="btn-gold w-full text-base disabled:pointer-events-none disabled:opacity-40">
                <Send className="h-5 w-5" /> {t('Tuma faili kwa WhatsApp', 'Send files on WhatsApp')}
              </button>
              <button disabled={!files.length} onClick={addToCart}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-3 font-semibold text-white transition hover:bg-navy-800 disabled:pointer-events-none disabled:opacity-40 dark:bg-surface dark:ring-1 dark:ring-gold-400/40">
                <ShoppingBag className="h-5 w-5" /> {t('Ongeza kwenye cart', 'Add to cart')}
              </button>
              <p className="flex items-start gap-2 text-xs text-ink/55">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {t('Faili zako hazipakiwi kwenye server yoyote. Zinabaki kwenye simu yako mpaka uzitume kwetu WhatsApp.', 'Your files are never uploaded to any server. They stay on your device until you send them to us on WhatsApp.')}
              </p>
            </div>

            <AnimatePresence>
              {sentInfo && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 rounded-2xl bg-emerald-500/10 p-4 text-sm ring-1 ring-emerald-500/30">
                  <p className="font-semibold">{t('Namba ya oda yako:', 'Your order number:')} <span className="select-all font-display font-black">{sentInfo.id}</span></p>
                  {!sentInfo.shared && <p className="mt-1 text-ink/70">{t('WhatsApp imefunguka na ujumbe. Bonyeza 📎 kwenye chat uambatishe faili zako.', 'WhatsApp opened with your message. Tap 📎 in the chat to attach your files.')}</p>}
                  <a href={sentInfo.link} target="_blank" rel="noreferrer" className="mt-2 inline-block font-semibold text-emerald-700 hover:underline dark:text-emerald-300">{t('Fungua WhatsApp tena →', 'Open WhatsApp again →')}</a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function Line({ l, r, accent }) {
  return (
    <div className={`flex justify-between gap-4 py-0.5 ${accent ? 'font-bold text-emerald-600' : ''}`}>
      <span className="truncate">{l}</span><span className="whitespace-nowrap tabular-nums">{r}</span>
    </div>
  )
}
