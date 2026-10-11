import { Sparkle } from 'lucide-react'
import { useApp } from '../lib/store'

export default function Marquee() {
  const { t } = useApp()
  const ITEMS = t(
    ['Printing', 'Photocopy', 'Lamination', 'Binding', 'Logo Design', 'Business Cards', 'Kadi za Harusi', 'Banners', 'T-shirt Printing', 'Mihuri', 'NIDA · RITA · HESLB', 'Passport', 'BRELA', 'Kozi ya Kompyuta', 'Vifaa vya Shule', 'Passport Photos'],
    ['Printing', 'Photocopy', 'Lamination', 'Binding', 'Logo Design', 'Business Cards', 'Wedding Cards', 'Banners', 'T-shirt Printing', 'Rubber Stamps', 'NIDA · RITA · HESLB', 'Passport', 'BRELA', 'Computer Course', 'School Supplies', 'Passport Photos'],
  )
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="relative -rotate-1 overflow-hidden border-y-4 border-navy-950 bg-gold-400 py-4">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} aria-hidden={i >= ITEMS.length} className="flex items-center gap-8 font-display text-2xl font-black italic text-navy-950">
            {w} <Sparkle className="h-5 w-5 fill-navy-950" />
          </span>
        ))}
      </div>
    </div>
  )
}
