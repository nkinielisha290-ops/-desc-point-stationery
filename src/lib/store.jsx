import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

// ---------- Hifadhi ya kivinjari (salama hata ikizuiwa) ----------
const read = (k, fallback) => {
  try {
    const v = localStorage.getItem(k)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}
const write = (k, v) => {
  try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* imezuiwa: endelea bila kuhifadhi */ }
}
function usePersisted(key, initial) {
  const [v, setV] = useState(() => read(key, initial))
  useEffect(() => write(key, v), [key, v])
  return [v, setV]
}

// ---------- Namba ya oda: DPS-YYMMDD-XXX ----------
export function newOrderId() {
  const d = new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Dar_es_Salaam' }))
  const p = (n) => String(n).padStart(2, '0')
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase()
  return `DPS-${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${rand}`
}

const Ctx = createContext(null)

export function AppProvider({ children }) {
  // Lugha: 'sw' au 'en'
  const [lang, setLang] = usePersisted('dps-lang', 'sw')
  // Mandhari: 'light' | 'dark' — mwanzo inafuata simu ya mteja
  const [theme, setTheme] = usePersisted(
    'dps-theme',
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  )
  const [cart, setCart] = usePersisted('dps-cart', {})
  const [wishlist, setWishlist] = usePersisted('dps-wishlist', [])
  const [myOrders, setMyOrders] = usePersisted('dps-orders', [])
  const [cartOpen, setCartOpen] = useState(false)
  const [installEvt, setInstallEvt] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.lang = lang
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#040b2b' : '#06144d')
  }, [theme, lang])

  // PWA: kukamata ombi la "Install"
  useEffect(() => {
    const f = (e) => { e.preventDefault(); setInstallEvt(e) }
    window.addEventListener('beforeinstallprompt', f)
    window.addEventListener('appinstalled', () => setInstallEvt(null))
    return () => window.removeEventListener('beforeinstallprompt', f)
  }, [])

  // t('Kiswahili', 'English') — tafsiri ya papo hapo
  const t = useCallback((sw, en) => (lang === 'en' && en != null ? en : sw), [lang])
  // x(value) — kwa data: string au { sw, en }
  const x = useCallback((v) => (v && typeof v === 'object' && 'sw' in v ? (lang === 'en' ? v.en ?? v.sw : v.sw) : v), [lang])

  const notify = useCallback((msg) => {
    setToast({ msg, id: Date.now() })
    setTimeout(() => setToast((cur) => (cur && Date.now() - cur.id >= 2400 ? null : cur)), 2600)
  }, [])

  const add = useCallback((p, n = 1) => {
    // tunahifadhi tu taarifa za lazima ili cart isiharibike bei zikibadilika
    setCart((c) => ({ ...c, [p.id]: { id: p.id, name: p.name, price: p.price, unit: p.unit, img: p.img, kind: p.kind || (String(p.id).startsWith('s') ? 'service' : 'product'), meta: p.meta, qty: (c[p.id]?.qty || 0) + n } }))
  }, [setCart])
  const setQty = useCallback((id, qty) => setCart((c) => {
    const n = { ...c }
    if (qty <= 0) delete n[id]
    else n[id] = { ...n[id], qty }
    return n
  }), [setCart])
  const clear = useCallback(() => setCart({}), [setCart])

  const toggleWish = useCallback((id) => setWishlist((w) => (w.includes(id) ? w.filter((i) => i !== id) : [...w, id])), [setWishlist])

  const rememberOrder = useCallback((o) => setMyOrders((list) => [o, ...list.filter((i) => i.id !== o.id)].slice(0, 20)), [setMyOrders])

  const install = useCallback(async () => {
    if (!installEvt) return false
    installEvt.prompt()
    const r = await installEvt.userChoice.catch(() => null)
    setInstallEvt(null)
    return r?.outcome === 'accepted'
  }, [installEvt])

  const value = useMemo(() => {
    const items = Object.values(cart)
    return {
      lang, setLang, t, x,
      theme, toggleTheme: () => setTheme((v) => (v === 'dark' ? 'light' : 'dark')),
      cart, items, count: items.reduce((s, i) => s + i.qty, 0), total: items.reduce((s, i) => s + i.qty * i.price, 0),
      add, setQty, clear, cartOpen, setCartOpen,
      wishlist, toggleWish,
      myOrders, rememberOrder,
      canInstall: !!installEvt, install,
      toast, notify,
    }
  }, [lang, setLang, t, x, theme, setTheme, cart, add, setQty, clear, cartOpen, wishlist, toggleWish, myOrders, rememberOrder, installEvt, install, toast, notify])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useApp = () => useContext(Ctx)
