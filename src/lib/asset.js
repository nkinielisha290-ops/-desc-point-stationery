// Njia za faili za public/ zinazofanya kazi popote website ilipo
// (Vercel kwenye "/", GitHub Pages kwenye "/-desc-point-stationery/").
export const asset = (path) => {
  const p = path.replace(/^\//, '')
  const override = typeof window !== 'undefined' && window.__DPS_ASSETS__?.[p]
  return override || import.meta.env.BASE_URL + p
}
