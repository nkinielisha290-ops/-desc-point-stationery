import { createContext, useContext, useEffect, useState } from 'react'

// Router rahisi wa hash: #/printing, #/duka/Shule, #/mtandaoni#heslb
// Links za zamani (#printing, #bidhaa...) zinaelekezwa kwenye kurasa mpya.
const LEGACY = {
  printing: '/printing', bei: '/printing', design: '/design', portfolio: '/kazi-zetu',
  ofa: '/ofa', bidhaa: '/duka', shule: '/duka#shule', gundua: '/duka#gundua',
  fuatilia: '/fuatilia', mawasiliano: '/kuhusu#mawasiliano', kuhusu: '/kuhusu', huduma: '/huduma',
  ushuhuda: '/#ushuhuda',
}

export function parseHash(hash = window.location.hash) {
  let h = hash.replace(/^#/, '')
  if (!h.startsWith('/')) h = LEGACY[h] || (h ? `/#${h}` : '/')
  const [pathPart, anchor = ''] = h.split('#')
  const parts = pathPart.split('/').filter(Boolean)
  return { page: parts[0] || 'home', param: parts[1] ? decodeURIComponent(parts[1]) : null, anchor }
}

export const href = (path) => `#${path}`

const Ctx = createContext({ page: 'home', param: null, anchor: '' })

export function RouterProvider({ children }) {
  const [route, setRoute] = useState(() => parseHash())
  useEffect(() => {
    const f = () => {
      const r = parseHash()
      setRoute((prev) => {
        // ukurasa mpya: anza juu; anchor: shuka kwenye sehemu husika
        const samePage = prev.page === r.page && prev.param === r.param
        requestAnimationFrame(() => setTimeout(() => {
          const el = r.anchor && document.getElementById(r.anchor)
          if (el) el.scrollIntoView({ behavior: samePage ? 'smooth' : 'auto', block: 'start' })
          else if (!samePage) window.scrollTo({ top: 0, behavior: 'instant' })
        }, samePage ? 0 : 60))
        return r
      })
    }
    window.addEventListener('hashchange', f)
    // anchor wakati wa kufungua mara ya kwanza
    if (route.anchor) setTimeout(() => document.getElementById(route.anchor)?.scrollIntoView(), 400)
    return () => window.removeEventListener('hashchange', f)
  }, [])
  return <Ctx.Provider value={route}>{children}</Ctx.Provider>
}

export const useRoute = () => useContext(Ctx)
