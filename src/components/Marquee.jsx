import { Sparkle } from 'lucide-react'
const ITEMS = ['Printing', 'Photocopy', 'Lamination', 'Binding', 'Logo Design', 'Business Cards', 'Kadi za Harusi', 'Banners', 'T-shirt Printing', 'Mihuri', 'NIDA · TRA · HESLB', 'Vifaa vya Shule', 'Passport Photos']
export default function Marquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="relative -rotate-1 overflow-hidden border-y-4 border-navy-950 bg-gold-400 py-4">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-2xl font-black italic text-navy-950">
            {t} <Sparkle className="h-5 w-5 fill-navy-950" />
          </span>
        ))}
      </div>
    </div>
  )
}
