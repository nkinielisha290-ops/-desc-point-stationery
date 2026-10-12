import { ALL_ITEMS, NAV, ONLINE_SERVICES, SERVICE_GROUPS } from '../data/site'

// Orodha ya kila kitu kinachotafutika kwenye website
export function buildIndex() {
  const out = []
  for (const p of ALL_ITEMS) {
    const online = ONLINE_SERVICES.find((o) => o.itemId === p.id)
    out.push({ key: p.id, title: p.name, sub: p.desc, img: p.img, price: p.price,
      to: online ? `/mtandaoni#${online.id}` : p.id.startsWith('p') ? `/duka#${p.id}` : '/huduma' })
  }
  for (const g of SERVICE_GROUPS) for (const it of g.items) out.push({ key: `${g.id}-${it.sw}`, title: it, sub: g.title, to: g.id === 'course' ? '/kozi' : g.id === 'online' ? '/mtandaoni' : `/huduma#${g.id}` })
  for (const n of NAV) for (const c of n.columns || []) for (const [label, to] of c.links) out.push({ key: `nav-${to}-${label.sw}`, title: label, sub: n.label, to, page: true })
  return out
}

export function search(index, q, lang) {
  const n = q.trim().toLowerCase()
  if (n.length < 2) return []
  const val = (v) => (typeof v === 'object' && v ? `${v.sw} ${v.en}` : v || '').toLowerCase()
  return index
    .map((e) => {
      const t = val(e.title), s = val(e.sub)
      const score = (t.startsWith(n) ? 3 : t.includes(n) ? 2 : 0) + (s.includes(n) ? 1 : 0)
      return { e, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 7)
    .map((r) => r.e)
}

export const POPULAR = [
  { sw: 'HESLB', en: 'HESLB' }, { sw: 'Printing', en: 'Printing' }, { sw: 'Kadi za harusi', en: 'Wedding cards' }, { sw: 'Calculator', en: 'Calculator' }, { sw: 'NIDA', en: 'NIDA' },
]
