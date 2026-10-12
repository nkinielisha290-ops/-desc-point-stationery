import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, Inbox, PenTool, Printer, PackageCheck, BadgeCheck, History, MessageCircle, AlertCircle, Loader2 } from 'lucide-react'
import { ORDER_STEPS, waLink } from '../data/site'
import { useApp } from '../lib/store'
import { SectionTitle, tsh } from './ui'
import { asset } from '../lib/asset'

const ICONS = { Inbox, PenTool, Printer, PackageCheck, BadgeCheck }

export default function OrderTracker() {
  const { t, x, myOrders } = useApp()
  const [code, setCode] = useState('')
  const [state, setState] = useState({ phase: 'idle' }) // idle | loading | found | missing | error

  const lookup = async (raw) => {
    const id = (raw ?? code).trim().toUpperCase()
    if (!id) return
    setCode(id)
    setState({ phase: 'loading' })
    try {
      const res = await fetch(`${asset('orders.json')}?ts=${Date.now()}`, { cache: 'no-store' })
      if (!res.ok) throw new Error(String(res.status))
      const data = await res.json()
      const o = data[id]
      setState(o ? { phase: 'found', id, o } : { phase: 'missing', id })
    } catch {
      setState({ phase: 'error', id })
    }
  }

  const idx = state.phase === 'found' ? Math.max(0, ORDER_STEPS.findIndex((s) => s.id === state.o.status)) : -1

  return (
    <section id="fuatilia" className="relative scroll-mt-20 py-24 sm:py-28">
      <div className="container-x max-w-4xl">
        <SectionTitle eyebrow={t('Ufuatiliaji wa oda', 'Order tracking')} title={t('Oda yako', 'Where is')} accent={t('imefika wapi?', 'my order?')}
          sub={t('Ingiza namba ya oda uliyopata ulipotuma oda (mf. DPS-261011-AB3).', 'Enter the order number you got when you sent your order (e.g. DPS-261011-AB3).')} />

        <form onSubmit={(e) => { e.preventDefault(); lookup() }} className="mx-auto flex max-w-xl items-center gap-2 rounded-full bg-surface p-2 shadow-xl ring-1 ring-ink/10 focus-within:ring-2 focus-within:ring-gold-400">
          <Search className="ml-3 h-5 w-5 shrink-0 text-ink/40" />
          <label htmlFor="track-code" className="sr-only">{t('Namba ya oda', 'Order number')}</label>
          <input id="track-code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="DPS-261011-AB3" autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-2 font-mono text-base outline-none placeholder:normal-case placeholder:tracking-normal placeholder:text-ink/35" />
          <button className="btn-gold !px-5 !py-2.5 text-sm">{state.phase === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : t('Fuatilia', 'Track')}</button>
        </form>
        <p className="mt-3 text-center text-xs text-ink/50">
          {t('Jaribu mfano:', 'Try a sample:')}{' '}
          {['DPS-DEMO-001', 'DPS-DEMO-002'].map((d) => <button key={d} onClick={() => lookup(d)} className="mx-1 font-mono font-semibold text-royal-500 hover:underline">{d}</button>)}
        </p>

        <AnimatePresence mode="wait">
          {state.phase === 'found' && (
            <motion.div key={state.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="card mt-10 p-6 sm:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-sm font-bold tracking-wider text-royal-500">{state.id}</p>
                  <h3 className="mt-1 font-display text-2xl font-black">{state.o.item || t('Oda yako', 'Your order')}</h3>
                </div>
                <span className={`rounded-full px-4 py-1.5 text-sm font-bold ${idx >= 3 ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'bg-gold-400/20 text-gold-700 dark:text-gold-300'}`}>
                  {x(ORDER_STEPS[idx].label)}
                </span>
              </div>

              <ol className="relative mt-10 grid gap-6 sm:grid-cols-5 sm:gap-2">
                <div className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-1 rounded bg-ink/10 sm:left-[10%] sm:right-[10%] sm:h-1 sm:w-auto" />
                {/* mstari wa maendeleo: wima kwenye simu, mlalo kwenye kompyuta */}
                <motion.div className="absolute left-5 top-5 w-1 rounded bg-gradient-to-b from-emerald-500 to-gold-400 sm:hidden"
                  initial={{ height: 0 }} animate={{ height: `calc((100% - 2.5rem) * ${idx / (ORDER_STEPS.length - 1)})` }} transition={{ duration: 1, ease: 'easeOut' }} />
                <motion.div className="absolute left-[10%] top-5 hidden h-1 rounded bg-gradient-to-r from-emerald-500 to-gold-400 sm:block"
                  initial={{ width: 0 }} animate={{ width: `${80 * idx / (ORDER_STEPS.length - 1)}%` }} transition={{ duration: 1, ease: 'easeOut' }} />
                {ORDER_STEPS.map((s, i) => {
                  const I = ICONS[s.icon]
                  const done = i <= idx
                  return (
                    <motion.li key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * i }}
                      className="relative flex items-center gap-4 sm:flex-col sm:text-center">
                      <span className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full ring-4 ring-surface transition ${done ? (i === idx ? 'bg-gold-400 text-navy-950' : 'bg-emerald-500 text-white') : 'bg-ink/10 text-ink/40'}`}>
                        {i === idx && <span className="absolute inset-0 animate-ping rounded-full bg-gold-400/50" />}
                        <I className="relative h-5 w-5" />
                      </span>
                      <span className={`text-sm font-semibold ${done ? 'text-ink' : 'text-ink/40'}`}>{x(s.label)}</span>
                    </motion.li>
                  )
                })}
              </ol>

              {state.o.note && <p className="mt-8 rounded-2xl bg-ink/[.04] p-4 text-sm text-ink/75">💬 {state.o.note}</p>}
              {state.o.updated && <p className="mt-3 text-xs text-ink/45">{t('Imesasishwa', 'Updated')}: {state.o.updated}</p>}
            </motion.div>
          )}

          {(state.phase === 'missing' || state.phase === 'error') && (
            <motion.div key="nf" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-auto mt-10 flex max-w-xl gap-4 rounded-[30px] bg-amber-400/10 p-6 ring-1 ring-amber-400/30">
              <AlertCircle className="h-6 w-6 shrink-0 text-amber-500" />
              <div className="text-sm">
                <p className="font-semibold">
                  {state.phase === 'error' ? t('Hatukuweza kuangalia hali ya oda sasa hivi.', 'We couldn’t check the order status right now.')
                    : t('Bado hatujaweka taarifa za oda hii.', 'No update for this order yet.')}
                </p>
                <p className="mt-1 text-ink/65">{t('Kama umetuma oda leo, tunaishughulikia. Tuulize moja kwa moja kwa WhatsApp.', 'If you sent it today, we’re on it. Ask us directly on WhatsApp.')}</p>
                <a href={waLink(t(`Habari Desc Point! Naomba hali ya oda yangu: ${state.id}`, `Hello Desc Point! What’s the status of my order: ${state.id}`))} target="_blank" rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 font-semibold text-emerald-600 hover:underline dark:text-emerald-400"><MessageCircle className="h-4 w-4" /> {t('Uliza kwa WhatsApp', 'Ask on WhatsApp')}</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {myOrders.length > 0 && (
          <div className="mx-auto mt-12 max-w-xl">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink/60"><History className="h-4 w-4" /> {t('Oda zako za karibuni (kwenye simu hii)', 'Your recent orders (on this device)')}</p>
            <ul className="divide-y divide-ink/5 overflow-hidden rounded-2xl bg-surface ring-1 ring-ink/5">
              {myOrders.slice(0, 5).map((o) => (
                <li key={o.id}>
                  <button onClick={() => lookup(o.id)} className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition hover:bg-ink/[.03]">
                    <span>
                      <span className="block font-mono text-sm font-bold">{o.id}</span>
                      <span className="text-xs text-ink/50">{new Date(o.date).toLocaleDateString(t('sw-TZ', 'en-GB'), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                    </span>
                    <span className="text-sm font-semibold tabular-nums text-ink/70">{tsh(o.total)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
